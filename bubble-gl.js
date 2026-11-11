/* Small, dependency-free thin-film renderer. CSS remains the no-WebGL fallback. */
window.BubbleGlass=(()=>{
  const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment=`precision mediump float;
    varying vec2 uv;uniform float time;uniform vec2 light;
    void main(){
      vec2 p=(uv-.5)*2.;float r=length(p);
      if(r>1.)discard;
      float z=sqrt(max(0.,1.-r*r));vec3 n=normalize(vec3(p,z));
      // Wavelength-dependent interference changes with film thickness and view angle.
      float a=atan(p.y,p.x);
      float thickness=410.+85.*sin(a*2.3+time*.38)+38.*sin(a*5.-time*.23)+60.*p.y;
      vec3 phase=12.56637*1.33*thickness*max(.18,z)/vec3(650.,510.,440.);
      vec3 spectrum=pow(.5+.5*cos(phase),vec3(1.6));
      float fresnel=pow(1.-z,2.1);
      float band=smoothstep(.62,.97,r);
      float edge=exp(-pow((r-.982)/.011,2.));
      vec3 l=normalize(vec3(-.5+light.x*.3,.65+light.y*.3,1.1));
      float spec=pow(max(0.,dot(n,normalize(l+vec3(0.,0.,1.)))),100.);
      // Long curved studio reflections stay in world space as the film flows.
      float arc=exp(-pow((r-.88)/.018,2.))*pow(max(0.,dot(normalize(p),normalize(vec2(-.6,.8)))),9.);
      float lower=exp(-pow((r-.91)/.012,2.))*pow(max(0.,dot(normalize(p),normalize(vec2(.6,-.8)))),16.);
      float alpha=band*(.14+fresnel*.50)+edge*.65+spec*.60+arc*.65+lower*.50;
      vec3 color=mix(spectrum*1.2,vec3(.88,.97,1.),clamp(edge*.65+spec+arc+lower,0.,1.));
      alpha*=1.-smoothstep(.991,1.,r);
      gl_FragColor=vec4(color,clamp(alpha,0.,.92));
    }`;
  // A radial displacement field refracts the live DOM backdrop in Chromium.
  // Other engines keep CSS glass rather than risking an opaque SVG backdrop.
  let refractionReady=false;
  function prepareRefraction(){
    if(refractionReady)return true;
    if(!/Chrome|Chromium|Edg\//.test(navigator.userAgent))return false;
    const map=document.createElement('canvas');map.width=map.height=128;
    const ctx=map.getContext('2d');if(!ctx)return false;
    const pixels=ctx.createImageData(128,128);
    for(let y=0;y<128;y++)for(let x=0;x<128;x++){
      const nx=(x-63.5)/64,ny=(y-63.5)/64,r=Math.hypot(nx,ny);
      const strength=r<1?Math.pow(r,4)*Math.sqrt(Math.max(0,1-r*r))*2.5:0;
      const i=(y*128+x)*4;
      pixels.data[i]=128+nx*strength*120;pixels.data[i+1]=128+ny*strength*120;
      pixels.data[i+2]=128;pixels.data[i+3]=255;
    }
    ctx.putImageData(pixels,0,0);
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width','0');svg.setAttribute('height','0');svg.setAttribute('aria-hidden','true');svg.style.position='absolute';
    svg.innerHTML=`<defs><filter id="bubble-refraction" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage href="${map.toDataURL()}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lens"/><feDisplacementMap in="SourceGraphic" in2="lens" scale="24" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="0.25"/></filter></defs>`;
    document.getElementById('image-dialog').append(svg);refractionReady=true;return true;
  }
  let items=[],frame=0,last=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function draw(t){
    frame=0;if(document.hidden)return;
    if(t-last>32||reduced.matches){
      last=t;
      for(const item of items){
        const {gl,canvas,clock,pointer}=item;
        if(!canvas.isConnected)continue;
        gl.uniform1f(clock,reduced.matches?0:t*.001+item.phase);
        gl.uniform2f(pointer,item.x,item.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      }
    }
    if(items.length&&!reduced.matches)frame=requestAnimationFrame(draw);
  }
  function start(){if(!frame&&items.length)frame=requestAnimationFrame(draw)}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
  reduced.addEventListener('change',start);
  function clear(){
    cancelAnimationFrame(frame);frame=0;
    for(const i of items){i.button.removeEventListener('pointermove',i.move);i.button.removeEventListener('pointerleave',i.leave);i.gl.getExtension('WEBGL_lose_context')?.loseContext()}
    items=[];
  }
  function mount(button,phase){
    const body=button.querySelector('.bubble-body');
    if(prepareRefraction())body.classList.add('has-refraction');
    const canvas=document.createElement('canvas');canvas.className='bubble-optics';canvas.setAttribute('aria-hidden','true');
    const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:true,depth:false});
    if(!gl)return;
    const shaders=[];
    try{
      function compile(type,source){const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader unavailable');return s}
      const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader unavailable');
      gl.useProgram(program);
      const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      // Fixed small backing store bounds GPU work even on high-density phones.
      canvas.width=canvas.height=256;gl.viewport(0,0,256,256);
      const item={button,canvas,gl,clock:gl.getUniformLocation(program,'time'),pointer:gl.getUniformLocation(program,'light'),phase,x:0,y:0};
      item.move=e=>{const r=button.getBoundingClientRect();item.x=(e.clientX-r.left)/r.width*2-1;item.y=1-(e.clientY-r.top)/r.height*2;body.style.setProperty('--light-x',`${(item.x+1)*50}%`);body.style.setProperty('--light-y',`${(1-item.y)*50}%`);start()};
      item.leave=()=>{item.x=item.y=0;start()};
      button.addEventListener('pointermove',item.move,{passive:true});button.addEventListener('pointerleave',item.leave);
      canvas.addEventListener('webglcontextlost',()=>body.classList.remove('has-optics'));
      body.append(canvas);body.classList.add('has-optics');items.push(item);start();
    }catch{gl.getExtension('WEBGL_lose_context')?.loseContext()}
    finally{for(const s of shaders)gl.deleteShader(s)}
  }
  return{mount,clear};
})();
