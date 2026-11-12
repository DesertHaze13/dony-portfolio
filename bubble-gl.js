/* Small, dependency-free thin-film renderer. CSS remains the no-WebGL fallback. */
window.BubbleGlass=(()=>{
  const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment=`precision mediump float;
    varying vec2 uv;uniform float time;uniform vec2 light;uniform sampler2D scene;uniform float sceneReady;
    void main(){
      vec2 p=(uv-.5)*2.;float r=length(p);
      if(r>1.)discard;
      float z=sqrt(max(0.,1.-r*r));vec3 n=normalize(vec3(p,z));
      // Wavelength-dependent interference changes with film thickness and view angle.
      // Smooth Cartesian waves avoid the -PI/PI seam of angle-based patterns.
      float thickness=410.+72.*sin(p.x*2.1+time*.47)*cos(p.y*1.8-time*.21)
        +34.*sin(p.x*4.4+p.y*2.6-time*.31)+29.*sin(p.y*3.1-time*.17)+58.*p.y;
      vec3 phase=12.56637*1.33*thickness*max(.18,z)/vec3(650.,510.,440.);
      vec3 spectrum=pow(.5+.5*cos(phase),vec3(1.25));
      float fresnel=pow(1.-z,1.65);
      // The lower film gathers a wider rainbow as liquid drains downward.
      float band=smoothstep(.58+.10*p.y,.87,r);
      float edge=exp(-pow((r-.982)/.011,2.));
      vec3 l=normalize(vec3(-.48+light.x*.95,.55+light.y*.95,1.05));
      float spec=pow(max(0.,dot(n,normalize(l+vec3(0.,0.,1.)))),65.);
      vec3 fill=normalize(vec3(.62-light.x*.32,-.48-light.y*.32,1.15));
      float softSpec=pow(max(0.,dot(n,normalize(fill+vec3(0.,0.,1.)))),155.);
      // Long curved studio reflections stay in world space as the film flows.
      float arc=exp(-pow((r-.88)/.018,2.))*pow(max(0.,dot(normalize(p),normalize(vec2(-.6,.8)))),9.);
      float lower=exp(-pow((r-.91)/.012,2.))*pow(max(0.,dot(normalize(p),normalize(vec2(.6,-.8)))),16.);
      float alpha=band*(.24+fresnel*.55)+edge*.55+spec*.78+softSpec*.26+arc*.65+lower*.50;
      vec3 color=mix(spectrum*1.5,vec3(.88,.97,1.),clamp(edge*.55+spec+softSpec*.65+arc+lower,0.,1.));
      // A sphere reflects the current screenshot as a curved environment map.
      vec3 reflected=reflect(vec3(0.,0.,-1.),n);
      vec2 sceneUV=clamp(vec2(.5+reflected.x*.28,.5+reflected.y*.28),.01,.99);
      vec3 surroundings=texture2D(scene,sceneUV).rgb;
      color=mix(color,surroundings,sceneReady*mix(.43,.18,fresnel));
      alpha+=sceneReady*(.36+fresnel*.16);
      alpha*=1.-smoothstep(.991,1.,r);
      gl_FragColor=vec4(color,clamp(alpha,0.,.92));
    }`;
  let items=[],frame=0,last=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function draw(t){
    frame=0;if(document.hidden)return;
    if(t-last>32||reduced.matches){
      last=t;
      for(const item of items){
        const {gl,canvas,clock,pointer}=item;
        if(!canvas.isConnected)continue;
        item.x+=(item.tx-item.x)*.18;item.y+=(item.ty-item.y)*.18;
        gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,item.texture);
        gl.uniform1f(item.sceneReady,item.loaded?1:0);
        gl.uniform1f(clock,reduced.matches?0:t*.001+item.phase);
        gl.uniform2f(pointer,item.x,item.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      }
    }
    if(items.length&&!reduced.matches)frame=requestAnimationFrame(draw);
  }
  function start(){if(!frame&&items.length)frame=requestAnimationFrame(draw)}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
  document.addEventListener('pointermove',e=>{
    if(!items.length||reduced.matches)return;
    for(const item of items){
      const r=item.button.getBoundingClientRect();
      item.tx=Math.max(-1,Math.min(1,(e.clientX-r.left-r.width/2)/(r.width*1.5)));
      item.ty=Math.max(-1,Math.min(1,(r.top+r.height/2-e.clientY)/(r.height*1.5)));
    }
    start();
  },{passive:true});
  reduced.addEventListener('change',start);
  function clear(){
    cancelAnimationFrame(frame);frame=0;
    for(const i of items){i.button.removeEventListener('pointermove',i.move);i.button.removeEventListener('pointerleave',i.leave);i.gl.getExtension('WEBGL_lose_context')?.loseContext()}
    items=[];
  }
  function mount(button,phase,sceneSrc){
    const body=button.querySelector('.bubble-body');
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
      const texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([36,49,50,255]));
      gl.uniform1i(gl.getUniformLocation(program,'scene'),0);
      // Fixed small backing store bounds GPU work even on high-density phones.
      canvas.width=canvas.height=256;gl.viewport(0,0,256,256);
      const item={button,canvas,gl,clock:gl.getUniformLocation(program,'time'),pointer:gl.getUniformLocation(program,'light'),sceneReady:gl.getUniformLocation(program,'sceneReady'),texture,loaded:false,phase,x:0,y:0,tx:0,ty:0};
      const sceneImage=new Image();
      sceneImage.onload=()=>{
        if(!canvas.isConnected)return;
        const surface=document.createElement('canvas');surface.width=512;surface.height=512;
        const ctx=surface.getContext('2d');if(!ctx)return;
        const scale=Math.max(512/sceneImage.naturalWidth,512/sceneImage.naturalHeight);
        const w=sceneImage.naturalWidth*scale,h=sceneImage.naturalHeight*scale;
        ctx.drawImage(sceneImage,(512-w)/2,(512-h)/2,w,h);
        gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,surface);
        item.loaded=true;start();
      };
      sceneImage.src=sceneSrc;
      item.move=e=>{const r=button.getBoundingClientRect();body.style.setProperty('--light-x',`${(e.clientX-r.left)/r.width*100}%`);body.style.setProperty('--light-y',`${(e.clientY-r.top)/r.height*100}%`);start()};
      item.leave=()=>{body.style.removeProperty('--light-x');body.style.removeProperty('--light-y');start()};
      button.addEventListener('pointermove',item.move,{passive:true});button.addEventListener('pointerleave',item.leave);
      canvas.addEventListener('webglcontextlost',()=>body.classList.remove('has-optics'));
      body.append(canvas);body.classList.add('has-optics');items.push(item);start();
    }catch{gl.getExtension('WEBGL_lose_context')?.loseContext()}
    finally{for(const s of shaders)gl.deleteShader(s)}
  }
  return{mount,clear};
})();
