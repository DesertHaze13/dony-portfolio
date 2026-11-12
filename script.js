const A='assets/images/';
const personal=[
  {number:'01',name:'Current',category:'Personal finance',tagline:'Make room for life.',description:'A spending journal that can turn supported transaction alerts into entries through an iOS Shortcuts automation.',tech:['SwiftUI','App Intents','Firebase','iPhone · iPad · Mac · Watch'],visual:'current',image:A+'personal/current-demo.jpg',full:A+'personal/current-demo.png',imageAlt:'Illustrative Current spending dashboard using demo data',label:'Illustrative demo',overview:'A personal finance journal for tracking what comes in, what goes out, and what moves between accounts.',features:['Shortcuts action accepts notification text from user-configured automations','Clear completed transactions are parsed and logged; ambiguous alerts are skipped','Monthly flow, transfer separation, review flags, and cross-device sync'],development:'An App Intent receives text routed by Shortcuts, then a conservative parser checks for a single monetary movement before saving it locally and syncing through Firebase. Current does not read other apps’ notification inbox directly. SwiftUI spans iPhone, iPad, Mac, and a read-only Watch companion.',codeLabel:'Shortcuts intake · CurrentApp.swift',code:'guard let parsed = AlertParser.parseNotification(\n    notificationText, source: source.sourceName\n) else {\n    return .result(dialog: "Skipped: ambiguous alert.")\n}',codeAdapted:true},
  {number:'02',name:'Plate',category:'Food & nutrition',tagline:'Eat good. Feel good.',description:'A native nutrition journal that brings food photos, editable AI estimates, and daily energy goals into one playful Apple experience.',tech:['SwiftUI','Vision · HealthKit','Firebase','iPhone · iPad · Mac'],visual:'plate',image:A+'personal/plate-display.jpg',full:A+'personal/plate-screen.png',imageAlt:'Plate iPhone app with animated food characters, day history selection, a calorie ring, and a floating glass navigation bar',label:'Real app screen',overview:'A food and nutrition tracker designed for the meals people actually eat, including Indonesian dishes. Built as a personal product across iPhone, iPad, and native Mac.',features:['Photo + description capture, nutrition-label OCR, and manual entry','Review AI estimates and correct individual foods before saving','Browse past meals and compare calories, protein, carbs, and fat with daily goals'],development:'Shared Swift domain models with adaptive SwiftUI interfaces, Vision OCR, optional HealthKit integration, and Firebase Authentication/Firestore sync. A persisted photo outbox retries interrupted uploads. An external-chat handoff lets users share a prepared prompt and photo, then validate and review the returned nutrition JSON before applying it.',codeLabel:'Offline photo queue · PhotoOutbox.swift',code:'guard !flushing, let uid = sync.userID else { return }\nfor row in pending.filter({ $0.uid == uid }) {\n    guard sync.userID == uid else { break }\n    // Upload completes before local originals are removed.\n}',codeAdapted:true,source:'https://github.com/DesertHaze13/Plate/blob/main/Sources/Shared/Services/PhotoOutbox.swift#L23-L40',repo:'https://github.com/DesertHaze13/Plate'},
  {number:'03',name:'Bioenial',category:'Biology learning',tagline:'Curiosity, switched on.',description:'An interactive learning space for biology lessons, activities, and classroom progress.',tech:['Laravel','MySQL','Vue'],visual:'bio',image:A+'personal/bioenial-home.png',full:A+'personal/bioenial-home.png',imageAlt:'Bioenial public homepage with a learning activity preview',label:'Live website',overview:'A biology learning platform for students, teachers, and administrators.',features:['Classes and activities','Assignments and discussion','Progress and assessment'],development:'Laravel, MySQL, Blade, Vue, and role-based access. Feature tests cover main learning flows.',site:'https://bioenial.com/'},
  {number:'04',name:'Run Detective',category:'Running intelligence',tagline:'Every run reveals more.',description:'A running journal that turns Apple Health workouts into useful context and comparisons.',tech:['SwiftUI','HealthKit'],visual:'run',image:A+'personal/run-detective-display.webp',full:A+'personal/run-detective-screen.png',imageAlt:'Run Detective app showing Apple Health sync and the latest run',label:'Real app screen',overview:'A personal running journal that makes workout data easier to understand.',features:['Run-to-run comparisons','Weekly trends','Workout insights'],development:'SwiftUI and HealthKit. Heart-rate summaries weigh available sample coverage so gaps in data do not become invented readings.',code:'let weight = min(max(interval, 1), 30)\nweightedSum += sorted[index].value * weight\ncoverage += weight',source:'https://github.com/DesertHaze13/RunDetective/blob/main/Sources/iOS/Domain/RunModels.swift#L76-L87',repo:'https://github.com/DesertHaze13/RunDetective'},
  {number:'05',name:"Dony's Lifts",category:'Training journal',tagline:'Progress, set by set.',description:'A training companion for planning workouts, recording sets, and seeing progress build.',tech:['SwiftUI','Firebase'],visual:'lifts',image:A+'personal/dony-lifts-display.webp',full:A+'personal/dony-lifts-screen.png',imageAlt:"Dony's Lifts app showing a workout journal and weekly progress",label:'Real app screen',overview:'A workout planner and training journal built around everyday use.',features:['Workout planning','Weekly progress','Cross-device sync'],development:'SwiftUI and Firebase. Shared workout state uses optimistic concurrency: each write requires the previously seen Firestore update time and increments a revision. Conflicts are surfaced instead of silently overwriting another device.',codeLabel:'Optimistic concurrency · SharedCloud.swift',code:'components.queryItems = [URLQueryItem(\n    name: "currentDocument.updateTime", value: previous.updateTime\n)]\nlet fields: [String: Any] = ["fields": [\n    "revision": ["integerValue": String(previous.revision + 1)]\n]]',codeAdapted:true,source:'https://github.com/DesertHaze13/setlog-ios/blob/main/Sources/iOS/Services/SharedCloud.swift#L126-L141',repo:'https://github.com/DesertHaze13/setlog-ios'}
];
const client=[
  {name:'Wings for Life',category:'Live experience',tagline:'A world in motion.',image:A+'client/wings-for-life-display.webp',full:A+'client/wings-for-life.png',alt:'Wings for Life global running experience with maps and live video',overview:'A global running event experience with continent views and live event media.',features:['Region-based views','Live content panels','Event navigation'],development:'Responsive interactive front end, coordinated content states, and timezone-aware scheduling for global participants.',codeLabel:'Timezone scheduling · class-setup.php',code:'$server_gmt = $this->_get_timezone_gmt($server_timezone);\n$player_gmt = $this->_get_timezone_gmt($timezone);\n$time += $server_gmt - $player_gmt;\nif ($time >= 24) $time -= 24;\nif ($time < 0) $time += 24;',codeAdapted:true},
  {name:'Rabobank IT Game',category:'Learning game',tagline:'Learning, with lift-off.',image:A+'client/rabobank-it-display.webp',full:A+'client/rabobank-it.png',alt:'Rabobank IT game showing a space mission interface',overview:'A space-themed experience that presents IT concepts as missions.',features:['Mission selection','Progress and rewards','Interactive challenge flow'],development:'Game state, UI transitions, and balanced scoring across planets.',codeLabel:'Balanced score generation · class-planet-randomizer.php',code:'$d_lo = max(self::MIN_SCORE - $scores[$i], $scores[$j] - $max);\n$d_hi = min($max - $scores[$i], $scores[$j] - self::MIN_SCORE);\n$scores[$i] += $delta;\n$scores[$j] -= $delta;',codeAdapted:true},
  {name:'NN Sustainability',category:'Interactive learning',tagline:'Progress you can explore.',image:A+'client/nn-sustainability-display.webp',full:A+'client/nn-sustainability.png',alt:'NN Sustainability illustrated journey with milestones',overview:'An illustrated journey through sustainability topics.',features:['Interactive map','Milestone progression','Character profiles'],development:'Content-driven interface with character scoring based on selected traits.',codeLabel:'Character scoring · class-game-character.php',code:'$score = self::calculate_score($trait_ids, $traits);\n$character["score"] = $total > 0\n    ? round(($score / $total) * 100, 2)\n    : 0;',codeAdapted:true},
  {name:'ArboTechniek',category:'Mobile learning',tagline:'Safer work, made simple.',image:A+'client/arbo-techniek.png',full:A+'client/arbo-techniek.png',alt:'ArboTechniek mobile app with safety topics and certificate actions',overview:'A mobile experience for practical workplace safety learning.',features:['Safety topics','Search and FAQ','Certificate actions'],development:'Mobile-first learning content and certificate recovery with ownership checks.',codeLabel:'Certificate ownership · class-certificate-recovery.php',code:'if (get_post_type($post_id) !== "bd-certificate") return false;\n$owner = (int) get_post_meta($post_id, "certificate_user_id", true);\nif ($owner) return $owner === (int) $user_id;',codeAdapted:true,phone:true},
  {name:'ASML Onboarding',category:'Digital onboarding',tagline:'First days, made easier.',symbol:'↗',color:'#8b7ac8',overview:'An interactive employee onboarding experience.',features:['Guided journey','Interactive content','Learning moments'],development:'WordPress theme development, interactive front-end work, and persisted journey progress.',codeLabel:'Progress lookup · class-game-progress.php',code:'$game_progress_id = (int) $game_progress_id;\nif (!$game_progress_id) return false;\n$progress = $wpdb->get_row($wpdb->prepare(\n    "SELECT * FROM {$game_progress_table} WHERE ID = %d LIMIT 1",\n    $game_progress_id\n));',codeAdapted:true},
  {name:'Mission Tomorrow 2.0',category:'Learning experience',tagline:'Tomorrow starts here.',symbol:'✦',color:'#ed9978',overview:'A game-like experience about future choices and collaboration.',features:['Interactive journey','Choice-based content','Progress feedback'],development:'Interactive components and realtime team progress synchronized into a local view.',codeLabel:'Realtime team status · class-realtime-team-progress.php',code:'$teams = Firebase::get("teams");\nforeach ($teams as $team_code => $team) {\n    $attributes = $team["attributes"] ?? [];\n    if (!empty($attributes["isStarting"])) {\n        $startedTeams[] = $team_code;\n    }\n}',codeAdapted:true},
  {name:'Narrative Game',category:'Experience system',tagline:'Stories that respond.',symbol:'◌',color:'#70aaa2',overview:'A foundation for story-led digital experiences.',features:['Story flow','Interactive scenes','Reusable patterns'],development:'Modular front end and CMS-managed branching sequences.',codeLabel:'Branching story · class-game-sequence.php',code:'if (is_string($answer_data)\n    && isset($config_next[$answer_data])\n    && $config_next[$answer_data]) {\n    $next_sequence = $config_next[$answer_data];\n}',codeAdapted:true},
  {name:'Escape Room',category:'Reusable framework',tagline:'Built to break out.',symbol:'✳',color:'#b493bb',overview:'A foundation for digital escape-room experiences.',features:['Shared play','Interactive puzzles','Results'],development:'Reusable web components with shared, realtime room state.',codeLabel:'Room status sync · firebase-actions.js',code:'export const maybeUpdateRoomStatus = (roomId, roomStatus) => {\n    return fb.update(`${fb.roomsPath}/${roomId}`, {\n        status: roomStatus,\n    });\n};',codeAdapted:false}
];
const archive=[
  ['ASML Campus Cards','Conversation cards','Prompts and shareable cards for workplace conversations.'],
  ['ASML Psychological Safety','Team reflection','Guided prompts for conversations about psychological safety.'],
  ['Clever Republic','Shared puzzle rooms','A multiplayer puzzle experience built around shared rooms.'],
  ['Draw the Line','Timed decisions','Choices that become group discussion.'],
  ['KPN Challenge','Phone-led play','A second-screen team challenge designed for mobile participation.'],
  ['Nictiz Escape Room','Puzzle learning','An escape-room format for collaborative learning.'],
  ['Omring Escape Room','Team escape','A collaborative puzzle experience and guided debrief.'],
  ['Rituals Foam','Play to learn','Short challenges and friendly competition.'],
  ['Team Connector','Team reflection','Questions, feedback, and team views.'],
  ['VodafoneZiggo Calibration','Group assessment','A guided calibration experience.'],
  ['MKB Stresstest','Scenario game','Narrative decisions about business resilience.'],
  ['MDT','Personal development','A journey with roles, goals, and feedback.'],
  ['Iandi','Learning hub','Articles, video, and quizzes in one place.'],
  ['Casa Fresca','Hospitality','Places and experiences presented online.'],
  ['Frisse Blikken','Studio website','Stories, projects, and teams.'],
  ['Safety Knowledge Base','Searchable library','Workplace safety information made easier to find.']
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function detailBlock(item,isClient=false){
  const grid=isClient?'client-detail-grid':'detail-grid';
  return `<details class="${isClient?'client-details':'project-details'}"><summary>Explore project <span class="plus" aria-hidden="true">+</span></summary><div class="${grid}"><div><h4>Overview</h4><p>${esc(item.overview)}</p></div><div><h4>App features</h4><ul>${item.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div><div><h4>Development</h4><p>${esc(item.development)}</p></div>${item.code?`<div class="code-snapshot"><small>${esc(item.codeLabel||'Code snapshot')}${item.source?` · <a href="${item.source}" target="_blank" rel="noopener noreferrer">View source ↗</a>`:''}</small><pre><code>${esc(item.code)}</code></pre>${item.codeAdapted?'<span class="code-note">Abridged from project source; names and formatting simplified.</span>':''}</div>`:''}</div></details>`;
}
function personalCard(p){
  const visual=p.visual==='current'?`<div class="visual-copy"><small>Current / personal finance</small><strong>Money,<br>in motion.</strong></div><img src="${p.image}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async">`: `<img src="${p.image}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async">`;
  return `<article ${p.visual==='plate'?'id="plate"':''} class="project-card reveal ${p.visual==='current'?'featured':''}"><a class="project-visual visual-${p.visual} is-loading" href="${p.full}" data-lightbox data-lightbox-title="${esc(p.name)}" aria-label="View ${esc(p.name)} screen">${visual}<span class="visual-label">${esc(p.label)}</span></a><div class="project-meta"><span>${p.number} / ${esc(p.category)}</span><span>Personal product</span></div><h3>${esc(p.name)}</h3><p class="project-tagline">${esc(p.tagline)}</p><p class="project-description">${esc(p.description)}</p><div class="tech-list">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>${detailBlock(p)}<div class="project-links"><a href="${p.full}" data-lightbox data-lightbox-title="${esc(p.name)}">View screen ↗</a>${p.site?`<a href="${p.site}" target="_blank" rel="noopener noreferrer">Visit site ↗</a>`:''}${p.repo?`<a href="${p.repo}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`:''}</div></article>`;
}
function clientCard(p,i){
  const visual=p.image?`<img src="${p.image}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`:`<span aria-hidden="true">${p.symbol}</span>`;
  const style=p.color?` style="background:${p.color}"`:'';
  const visualClass=`client-visual ${p.phone?'phone':''} ${p.image?'is-loading':'illustration'}`;
  const visualMarkup=p.full?`<a class="${visualClass}" href="${p.full}" data-lightbox data-lightbox-title="${esc(p.name)}" aria-label="View ${esc(p.name)} screen"${style}>${visual}<span class="visual-label">Project screen</span></a>`:`<div class="${visualClass}"${style}>${visual}</div>`;
  return `<article class="client-card reveal">${visualMarkup}<div class="client-content"><div class="project-meta"><span>${String(i+personal.length+1).padStart(2,'0')} / ${esc(p.category)}</span><span>Team project</span></div><h3>${esc(p.name)}</h3><p class="project-tagline">${esc(p.tagline)}</p>${detailBlock(p,true)}${p.full?`<a class="client-screen" href="${p.full}" data-lightbox data-lightbox-title="${esc(p.name)}">View screen ↗</a>`:''}</div></article>`;
}
document.getElementById('personal-projects').innerHTML=personal.map(personalCard).join('');
document.getElementById('client-projects').innerHTML=client.map(clientCard).join('');
document.getElementById('archive-projects').innerHTML=archive.map(([name,type,description],i)=>`<article class="archive-item"><small>${String(i+1).padStart(2,'0')} / ${esc(type)}</small><h3>${esc(name)}</h3><p>${esc(description)}</p></article>`).join('');
document.querySelectorAll('.project-visual.is-loading img,.client-visual.is-loading img').forEach(img=>{
  const finish=()=>img.parentElement.classList.remove('is-loading');
  if(img.complete)finish();
  else{img.addEventListener('load',finish,{once:true});img.addEventListener('error',finish,{once:true})}
});
document.getElementById('year').textContent=new Date().getFullYear();

function setTheme(){const theme=new Date().getHours()>=7&&new Date().getHours()<18?'light':'dark';document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]').content=theme==='light'?'#f4f2eb':'#101b1b'}
setTheme();document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTheme()});setInterval(setTheme,60000);
const progress=document.getElementById('progress');let scrollPending=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';scrollPending=false}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}},{rootMargin:'0px 0px -55px 0px',threshold:.06});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

const imageDialog=document.getElementById('image-dialog');
const dialogImage=imageDialog.querySelector('img');
const dialogCaption=document.getElementById('image-dialog-caption');
const dialogGallery=imageDialog.querySelector('.image-dialog-gallery');
const dialogAnnotations=imageDialog.querySelector('.image-annotations');
const dialogNotes=imageDialog.querySelector('.image-dialog-notes');
const dialogStage=imageDialog.querySelector('.image-dialog-stage');
let imageOpener;
let activeScreens=[];
let activeScreen=0;
let activeProject='';
const personalScreens=Object.fromEntries(personal.map(project=>[project.name,project.screens||[{src:project.full,label:'Overview',alt:project.imageAlt}]]));
personalScreens.Current=[
  {src:A+'personal/current-demo.png',label:'Overview',alt:'Current demo dashboard with spending summary'},
  {src:A+'personal/current-spending.png',label:'Spending',alt:'Current spending screen with category exploration and on-device AI review'},
  {src:A+'personal/current-shortcuts.png',label:'Automatic logging',alt:'iOS Shortcuts automation passing selected app notification text to Current for transaction review'}
];
personalScreens.Bioenial=[
  {src:A+'personal/bioenial-home.png',label:'Home',alt:'Bioenial public home page'},
  {src:A+'personal/bioenial-guide.png',label:'Learning guide',alt:'Bioenial public guide explaining learning roles and class activities'}
];
personalScreens.Plate=[
  {src:A+'personal/plate-screen.png',label:'Daily view',alt:'Plate daily nutrition journal screenshot'},
  {src:A+'personal/plate-log-meal.jpg',label:'Log a meal',alt:'Plate meal capture options for AI description, camera, photos and image import'}
];
personalScreens["Dony's Lifts"]=[
  {src:A+'personal/dony-lifts-screen.png',label:'Workout',alt:"Dony's Lifts workout journal and weekly progress"},
  {src:A+'personal/dony-lifts-workout-detail.png',label:'Sets & reps',alt:"Dony's Lifts workout detail with editable sets, loads and rep targets"},
  {src:A+'personal/dony-lifts-sync-demo.png',label:'Sync demo',alt:"Illustrative Dony's Lifts sync and local backup screen with a demo email address"}
];
personalScreens['Run Detective']=[
  {src:A+'personal/run-detective-screen.png',label:'Latest run',alt:'Run Detective latest run and workout context'},
  {src:A+'personal/run-detective-trends.png',label:'Trends',alt:'Run Detective iPad trends charts for distance, pace and heart rate'}
];
const screenHighlights={
  'current-demo.png':[
    {x:72,y:23,title:'Cash, clearly defined',why:'The balance separates money owned from credit, so the headline stays honest.'},
    {x:28,y:60,title:'Monthly flow',why:'Income, purchases, and bills sit together; transfers are called out separately.'}
  ],
  'current-spending.png':[
    {x:53,y:39,title:'Review before applying',why:'On-device AI proposes cleaner transaction details with an undo path.'},
    {x:51,y:91,title:'Explore each slice',why:'A category ring invites a closer look at the purchases behind a total.'}
  ],
  'current-shortcuts.png':[
    {x:47,y:26,title:'User-chosen alerts',why:'An iOS Shortcuts trigger watches only the selected apps.'},
    {x:47,y:55,title:'Structured handoff',why:'The shortcut passes notification text into Current for transaction review.'}
  ],
  'plate-screen.png':[
    {x:58,y:54,title:'Look back by day',why:'The date rail makes earlier meals and goals easy to revisit.'},
    {x:52,y:84,title:'Energy at a glance',why:'The daily ring turns nutrition progress into an immediate visual cue.'}
  ],
  'plate-log-meal.jpg':[
    {x:52,y:67,title:'Describe a meal',why:'A familiar dish can start with plain language instead of a long form.'},
    {x:52,y:80,title:'Capture it your way',why:'Camera and photo import give people more than one path to log food.'}
  ],
  'bioenial-home.png':[
    {x:74,y:55,title:'Learning preview',why:'The public page shows a sample activity and visible progress before sign-in.'},
    {x:15,y:76,title:'Clear first step',why:'A direct start button and guide help new learners enter the experience.'}
  ],
  'bioenial-guide.png':[
    {x:29,y:63,title:'Choose a path',why:'Role and topic links make the guide useful to students and teachers.'},
    {x:23,y:86,title:'Guided onboarding',why:'The page explains what becomes available after selecting a class.'}
  ],
  'dony-lifts-screen.png':[
    {x:78,y:25,title:'Sets logged',why:'A workout card makes completion visible while training is in progress.'},
    {x:48,y:55,title:'The whole week',why:'Daily status and a weekly summary make consistency easy to scan.'}
  ],
  'dony-lifts-workout-detail.png':[
    {x:50,y:47,title:'Every set counts',why:'Load, reps, and completion live together for fast logging mid-workout.'},
    {x:49,y:63,title:'Plans stay flexible',why:'An extra set can be added without leaving the exercise.'}
  ],
  'dony-lifts-sync-demo.png':[
    {x:49,y:24,title:'Shared workout data',why:'The demo screen shows the signed-in state for cross-device records.'},
    {x:46,y:40,title:'A local way out',why:'Import and backup controls keep a portable copy within reach.'}
  ],
  'run-detective-screen.png':[
    {x:29,y:24,title:'Health synced',why:'The visible sync state tells runners when the app last received workout data.'},
    {x:44,y:55,title:'The latest case',why:'Distance, pace, and heart rate turn one run into a useful starting point.'}
  ],
  'run-detective-trends.png':[
    {x:48,y:31,title:'Change the window',why:'Time ranges let runners inspect short and long patterns.'},
    {x:52,y:57,title:'Weekly evidence',why:'Interactive charts show the exact week behind a distance trend.'}
  ],
  'wings-for-life.png':[
    {x:52,y:36,title:'Across time zones',why:'Regional panels organize a worldwide event into readable local views.'},
    {x:84,y:34,title:'Live from the course',why:'Video feeds bring activity from multiple locations into one screen.'}
  ],
  'rabobank-it.png':[
    {x:24,y:18,title:'Mission stakes',why:'Requirements and rewards make the next decision immediately clear.'},
    {x:52,y:62,title:'Choose a dock',why:'A spatial mission board turns progress into a place to explore.'}
  ],
  'nn-sustainability.png':[
    {x:46,y:43,title:'A visible journey',why:'Illustrated milestones make learning progress feel tangible.'},
    {x:5,y:62,title:'Character paths',why:'Profiles at the side suggest different ways through the experience.'}
  ],
  'arbo-techniek.png':[
    {x:46,y:24,title:'Find a safety topic',why:'Large illustrated rows make specialist subjects easier to recognize.'},
    {x:43,y:87,title:'Certificate actions',why:'The main actions put certificates and account connection within reach.'}
  ]
};
function positionAnnotations(){
  if(!imageDialog.open||!dialogImage.naturalWidth)return;
  const image=dialogImage.getBoundingClientRect(),stage=dialogStage.getBoundingClientRect();
  Object.assign(dialogAnnotations.style,{left:`${image.left-stage.left}px`,top:`${image.top-stage.top}px`,width:`${image.width}px`,height:`${image.height}px`});
}
function renderAnnotations(screen){
  const key=screen.src.split('/').pop();
  const highlights=screenHighlights[key]||[];
  dialogAnnotations.replaceChildren();dialogNotes.replaceChildren();
  for(const [index,note] of highlights.entries()){
    const marker=document.createElement('span');marker.className='annotation-spot';
    marker.style.left=`${note.x}%`;marker.style.top=`${note.y}%`;
    marker.innerHTML=`<span class="annotation-index">${String(index+1).padStart(2,'0')}</span><span class="annotation-arrow" aria-hidden="true">↘</span>`;
    dialogAnnotations.append(marker);
    const card=document.createElement('div');card.className='image-note';
    card.innerHTML=`<span class="image-note-number">${String(index+1).padStart(2,'0')} ↘</span><strong></strong><p></p>`;
    card.querySelector('strong').textContent=note.title;card.querySelector('p').textContent=note.why;
    dialogNotes.append(card);
  }
  dialogNotes.hidden=highlights.length===0;
  requestAnimationFrame(positionAnnotations);
}
window.addEventListener('resize',positionAnnotations);
if('ResizeObserver' in window)new ResizeObserver(positionAnnotations).observe(dialogImage);
function showGalleryScreen(index,animateBubbleEntry=false){
  activeScreen=(index+activeScreens.length)%activeScreens.length;
  const screen=activeScreens[activeScreen];
  const request=++galleryRequest;
  imageDialog.classList.add('is-loading');
  dialogImage.onload=dialogImage.onerror=()=>{
    if(request!==galleryRequest)return;
    if(dialogImage.naturalWidth&&dialogImage.naturalHeight){
      const ratio=dialogImage.naturalWidth/dialogImage.naturalHeight;
      const portrait=ratio<.8;
      imageDialog.classList.toggle('is-portrait',portrait);
      const visibleHeight=Math.min(dialogImage.naturalHeight,Math.max(260,window.innerHeight*.9-(portrait?95:280)));
      const sidebar=portrait&&window.innerWidth>700?240:0;
      const fittedWidth=Math.min(1100,Math.max(280,Math.round(visibleHeight*ratio+44+sidebar)));
      imageDialog.style.setProperty('--viewer-width',`${fittedWidth}px`);
    }
    window.setTimeout(()=>{if(request===galleryRequest){imageDialog.classList.remove('is-loading');requestAnimationFrame(positionAnnotations)}},240);
  };
  dialogImage.src=screen.src;
  dialogImage.alt=screen.alt||`${activeProject} ${screen.label} screenshot`;
  dialogCaption.textContent=`${activeProject} · ${screen.label}`;
  renderAnnotations(screen);
  renderGalleryBubbles(animateBubbleEntry);
  if(dialogImage.complete&&dialogImage.naturalWidth)dialogImage.onload();
}
let galleryRequest=0;
let gallerySwitching=false;
const reduceGalleryMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
async function popBubble(button,event){
  if(reduceGalleryMotion.matches)return;
  const rect=button.getBoundingClientRect();
  const x=event.detail?Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100)):50;
  const y=event.detail?Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100)):50;
  button.style.setProperty('--pop-x',`${x}%`);
  button.style.setProperty('--pop-y',`${y}%`);
  button.classList.add('is-popping');
  // Film retracts in milliseconds; tiny rim droplets carry on with gravity.
  const animations=[];
  for(let i=0;i<22;i++){
    const angle=i/22*Math.PI*2+(Math.random()-.5)*.16;
    const radius=rect.width*.48;
    const speed=12+Math.random()*23;
    const drop=document.createElement('i');
    drop.className='bubble-drop';
    const size=.8+Math.random()*1.7;
    drop.style.cssText=`left:${50+Math.cos(angle)*48}%;top:${50+Math.sin(angle)*48}%;width:${size}px;height:${size}px`;
    button.append(drop);
    const dx=Math.cos(angle)*speed,dy=Math.sin(angle)*speed;
    const delay=Math.hypot(radius*Math.cos(angle)-(x/100-.5)*rect.width,radius*Math.sin(angle)-(y/100-.5)*rect.height)/rect.width*65;
    const animation=drop.animate([
      {transform:'translate(-50%,-50%)',opacity:0,offset:0},
      {transform:'translate(-50%,-50%)',opacity:.8,offset:.06},
      {transform:`translate(${dx*.65}px,${dy*.65+3}px)`,opacity:.5,offset:.65},
      {transform:`translate(${dx}px,${dy+14}px) scale(.3)`,opacity:0}
    ],{duration:180+Math.random()*90,delay,fill:'both',easing:'ease-out'});
    animations.push(animation.finished.catch(()=>{}).finally(()=>drop.remove()));
  }
  await Promise.all(animations);
}
function renderGalleryBubbles(animateEntry=false){
  window.BubbleGlass?.clear();
  dialogGallery.replaceChildren();
  const others=activeScreens.map((screen,index)=>({screen,index})).filter(item=>item.index!==activeScreen);
  others.forEach(({screen,index},position)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className=`gallery-bubble ${position%2?'bubble-right':'bubble-left'}${animateEntry?' bubble-enter':''}`;
    button.style.setProperty('--bubble-order',String(position));
    button.innerHTML='<span class="bubble-body" aria-hidden="true"><span class="bubble-film"></span><span class="bubble-shine"></span></span><span class="bubble-label"></span>';
    button.querySelector('.bubble-label').textContent=screen.label;

    button.setAttribute('aria-label',`Show ${activeProject} ${screen.label} screenshot`);
    button.addEventListener('click',async event=>{
      if(gallerySwitching)return;
      gallerySwitching=true;
      const request=galleryRequest;
      await popBubble(button,event);
      // Closing the viewer or using arrow keys cancels a pending selection.
      if(request!==galleryRequest||!imageDialog.open){gallerySwitching=false;return}
      showGalleryScreen(index,true);
      gallerySwitching=false;
      dialogGallery.querySelector('button')?.focus({preventScroll:true});
    });
    dialogGallery.append(button);
    window.BubbleGlass?.mount(button,position*3.7);
  });
  if(others.length)['d1','d2','d3'].forEach(name=>{
    const deco=document.createElement('span');
    deco.className=`bubble-deco ${name}`;
    deco.setAttribute('aria-hidden','true');
    deco.innerHTML='<span class="bubble-body"><span class="bubble-film"></span><span class="bubble-shine"></span></span>';
    dialogGallery.append(deco);
  });
  dialogGallery.hidden=others.length===0;
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-lightbox]');
  if(!link)return;
  event.preventDefault();
  imageOpener=link;
  imageDialog.style.setProperty('--viewer-width','620px');
  activeProject=link.dataset.lightboxTitle||'Project screen';
  activeScreens=personalScreens[activeProject]||[{src:link.href,label:'Overview',alt:link.querySelector('img')?.alt}];
  imageDialog.classList.toggle('has-gallery',activeScreens.length>1);
  showGalleryScreen(0);
  imageDialog.showModal();
});
imageDialog.querySelector('.image-dialog-close').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close()});
imageDialog.addEventListener('keydown',event=>{
  if(activeScreens.length<2)return;
  if(event.key==='ArrowRight'){event.preventDefault();showGalleryScreen(activeScreen+1)}
  if(event.key==='ArrowLeft'){event.preventDefault();showGalleryScreen(activeScreen-1)}
});
imageDialog.addEventListener('close',()=>{window.BubbleGlass?.clear();galleryRequest++;gallerySwitching=false;dialogImage.removeAttribute('src');imageOpener?.focus()});
