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
const dialogConnectors=imageDialog.querySelector('.annotation-connectors');
const connectorPaths=dialogConnectors.querySelector('.annotation-paths');
const dialogStage=imageDialog.querySelector('.image-dialog-stage');
let activeNoteIndex=null;
function highlightAnnotation(index){
  activeNoteIndex=index;
  [...dialogNotes.children].forEach((card,i)=>card.classList.toggle('is-active',i===index));
  [...dialogAnnotations.children].forEach((spot,i)=>spot.classList.toggle('is-active',i===index));
  [...connectorPaths.children].forEach((path,i)=>path.classList.toggle('is-active',i===index));
}
let imageOpener;
let activeScreens=[];
let activeScreen=0;
let activeProject='';
const personalScreens=Object.fromEntries(personal.map(project=>[project.name,project.screens||[{src:project.full,label:'Overview',alt:project.imageAlt}]]));
personalScreens.Current=[
  {src:A+'personal/current-demo.png',label:'Overview',alt:'Current demo dashboard with spending summary'},
  {src:A+'personal/current-spending.png',label:'Spending',alt:'Current spending screen with category exploration and on-device AI review'},
  {src:A+'personal/current-spending-live.png',label:'AI review',alt:'Current on-device AI review controls and spending categories'},
  {src:A+'personal/current-activity-demo.png',label:'Activity',alt:'Current activity timeline with fictional demo transactions'},
  {src:A+'personal/current-profile-demo.png',label:'Account sync',alt:'Current account and Firebase sync with demo identity'},
  {src:A+'personal/current-shortcuts.png',label:'Automatic logging',alt:'iOS Shortcuts automation passing selected app notification text to Current for transaction review'}
];
personalScreens.Bioenial=[
  {src:A+'personal/bioenial-home.png',label:'Home',alt:'Bioenial public home page'},
  {src:A+'personal/bioenial-guide.png',label:'Learning guide',alt:'Bioenial public guide explaining learning roles and class activities'},
  {src:A+'personal/bioenial-teacher-home.webp',label:'Teacher home',alt:'Bioenial teacher dashboard and class list'},
  {src:A+'personal/bioenial-teacher-class.webp',label:'Class hub',alt:'Bioenial class hub with learning resources and activity summary'},
  {src:A+'personal/bioenial-teacher-experience.webp',label:'Experiences',alt:'Bioenial teacher learning experience planner'},
  {src:A+'personal/bioenial-teacher-materials.webp',label:'Materials',alt:'Bioenial class material cards and science process indicators'},
  {src:A+'personal/bioenial-teacher-chat.webp',label:'Class chat',alt:'Bioenial class chat with fictional demo messages'},
  {src:A+'personal/bioenial-teacher-discussion.webp',label:'Discussion',alt:'Bioenial classroom discussion with fictional demo question'},
  {src:A+'personal/bioenial-teacher-quiz.webp',label:'Quizzes',alt:'Bioenial teacher quiz overview'},
  {src:A+'personal/bioenial-teacher-assignments.webp',label:'Assignments',alt:'Bioenial assignments and submission overview'},
  {src:A+'personal/bioenial-teacher-groups.webp',label:'Group work',alt:'Bioenial collaborative assignment overview'},
  {src:A+'personal/bioenial-teacher-scores.webp',label:'KPS assessment',alt:'Bioenial science process skills assessment with fictional student names'},
  {src:A+'personal/bioenial-student-wide-home.webp',label:'Student · Home',alt:'Bioenial student dashboard in wide view with demo identity'},
  {src:A+'personal/bioenial-student-wide-class.webp',label:'Student · Class',alt:'Bioenial class hub with class code and score hidden'},
  {src:A+'personal/bioenial-student-wide-experience.webp',label:'Student · Activities',alt:'Bioenial activity library in wide view'},
  {src:A+'personal/bioenial-student-wide-experience-detail.webp',label:'Student · Activity',alt:'Bioenial learning activity steps and submission status'},
  {src:A+'personal/bioenial-student-wide-materials.webp',label:'Student · Materials',alt:'Bioenial material library with unlockable lessons'},
  {src:A+'personal/bioenial-student-wide-chat.webp',label:'Student · Discussion',alt:'Bioenial class discussion with a fictional example topic'},
  {src:A+'personal/bioenial-student-wide-discussion.webp',label:'Student · Chat',alt:'Bioenial live class chat with fictional demo messages'},
  {src:A+'personal/bioenial-student-wide-quiz.webp',label:'Student · Practice',alt:'Bioenial practice quiz card with demo score'},
  {src:A+'personal/bioenial-student-wide-quiz-review.webp',label:'Student · Review',alt:'Bioenial answer review and explanation with demo content'},
  {src:A+'personal/bioenial-student-wide-assignments.webp',label:'Student · Tasks',alt:'Bioenial individual assignment list with demo content'},
  {src:A+'personal/bioenial-student-wide-assignment-detail.webp',label:'Student · Submission',alt:'Bioenial assignment deadline, submission status and demo score'},
  {src:A+'personal/bioenial-student-wide-groups.webp',label:'Student · Groups',alt:'Bioenial group assignment list'},
  {src:A+'personal/bioenial-student-wide-group-detail.webp',label:'Student · Teamwork',alt:'Bioenial group assignment detail and collaboration guidance'},
  {src:A+'personal/bioenial-student-wide-results.webp',label:'Student · Progress',alt:'Bioenial science process skills with demo assessment values'},
  {src:A+'personal/bioenial-admin-wide-dashboard.webp',label:'Admin · Overview',alt:'Bioenial admin dashboard with aggregate activity charts'},
  {src:A+'personal/bioenial-admin-wide-students.webp',label:'Admin · Students',alt:'Bioenial student account management with fictional demo rows'},
  {src:A+'personal/bioenial-admin-wide-teachers.webp',label:'Admin · Teachers',alt:'Bioenial teacher management with fictional demo names'},
  {src:A+'personal/bioenial-admin-wide-classes.webp',label:'Admin · Classes',alt:'Bioenial class list with fictional demo class names'},
  {src:A+'personal/bioenial-admin-wide-landing.webp',label:'Admin · Landing',alt:'Bioenial landing page content editor'},
  {src:A+'personal/bioenial-admin-wide-about.webp',label:'Admin · About',alt:'Bioenial about page content editor'},
  {src:A+'personal/bioenial-admin-wide-contact.webp',label:'Admin · Contact',alt:'Bioenial contact page editor for public site details'}
];
personalScreens.Plate=[
  {src:A+'personal/plate-screen.png',label:'Daily view',alt:'Plate daily nutrition journal screenshot'},
  {src:A+'personal/plate-history-demo.png',label:'History',alt:'Plate food history with fictional demo nutrition data'},
  {src:A+'personal/plate-foods-demo.png',label:'My Foods',alt:'Plate saved foods and repeat meal controls with fictional demo foods'},
  {src:A+'personal/plate-progress-demo.png',label:'Progress',alt:'Plate iPad nutrition progress charts with fictional demo measurements'},
  {src:A+'personal/plate-settings-demo.png',label:'Settings',alt:'Plate appearance, account sync and goals with fictional demo profile'},
  {src:A+'personal/plate-log-meal.jpg',label:'Log a meal',alt:'Plate meal capture options for AI description, camera, photos and image import'}
];
personalScreens["Dony's Lifts"]=[
  {src:A+'personal/dony-lifts-screen.png',label:'Workout',alt:"Dony's Lifts workout journal and weekly progress"},
  {src:A+'personal/dony-lifts-workout-live.png',label:'Week planner',alt:"Dony's Lifts workout week, selected training day and future-week planning"},
  {src:A+'personal/dony-lifts-workout-detail.png',label:'Sets & reps',alt:"Dony's Lifts workout detail with editable sets, loads and rep targets"},
  {src:A+'personal/dony-lifts-profile-demo.png',label:'Profile',alt:"Dony's Lifts profile and Apple Fitness connection with demo identity"},
  {src:A+'personal/dony-lifts-sync-demo.png',label:'Sync',alt:"Illustrative Dony's Lifts sync and local backup screen with a demo email address"},
  {src:A+'personal/dony-lifts-analysis-demo.png',label:'Analysis',alt:"Dony's Lifts training analysis and sample health metrics marked as demo data"}
];
personalScreens['Run Detective']=[
  {src:A+'personal/run-detective-screen.png',label:'Latest run',alt:'Run Detective latest run and workout context'},
  {src:A+'personal/run-detective-history-demo.png',label:'History',alt:'Run Detective running history with fictional demo workouts'},
  {src:A+'personal/run-detective-trends.png',label:'Trends',alt:'Run Detective iPad trends charts for distance, pace and heart rate'}
];
const screenHighlights={
  'current-demo.png':[
    {x:72,y:23,title:'Cash, clearly defined',why:'The balance separates money owned from credit, so the headline stays honest.'},
    {x:28,y:60,title:'Monthly flow',why:'Income, purchases, and bills sit together; transfers are called out separately.'},
    {x:74,y:57,title:'A reason to explore',why:'The leading spending category opens a path from summary to individual purchases.'}
  ],
  'current-spending.png':[
    {x:53,y:39,title:'Review before applying',why:'On-device AI proposes cleaner transaction details with an undo path.'},
    {x:51,y:91,title:'Explore each slice',why:'A category ring invites a closer look at the purchases behind a total.'},
    {x:49,y:57,title:'Month by month',why:'The period control keeps category review grounded in a specific month.'}
  ],
  'current-shortcuts.png':[
    {x:47,y:26,title:'User-chosen alerts',why:'An iOS Shortcuts trigger watches only the selected apps.'},
    {x:47,y:55,title:'Structured handoff',why:'The shortcut passes notification text into Current for transaction review.'},
    {x:50,y:65,title:'No interruption',why:'The disabled Show When Run switch keeps the configured handoff unobtrusive.'}
  ],
  'current-spending-live.png':[
    {x:52,y:45,title:'Review on device',why:'AI and merchant checks propose cleaner titles and categories before applying changes.'},
    {x:42,y:58,title:'Undo stays close',why:'The last AI update can be reversed, including individual changes.'},
    {x:50,y:86,title:'Explore the ring',why:'Each category slice leads to the purchases behind its total.'}
  ],
  'current-activity-demo.png':[
    {x:50,y:46,title:'Find any moment',why:'Search and filters narrow the timeline by merchant, source, amount, or type.'},
    {x:52,y:65,title:'Review what matters',why:'A dedicated switch surfaces records that need another look.'},
    {x:52,y:78,title:'Recovery built in',why:'Deleted and recovered records remain accessible beside the activity history.'}
  ],
  'current-profile-demo.png':[
    {x:50,y:42,title:'One identity',why:'A connected Google profile keeps the same account across devices.'},
    {x:51,y:80,title:'Synced records',why:'Firebase keeps financial records available on signed-in devices.'}
  ],
  'plate-screen.png':[
    {x:58,y:54,title:'Look back by day',why:'The date rail makes earlier meals and goals easy to revisit.'},
    {x:52,y:84,title:'Energy at a glance',why:'The daily ring turns nutrition progress into an immediate visual cue.'},
    {x:50,y:94,title:'One-tap paths',why:'History, progress, and meal capture stay close in the bottom navigation.'}
  ],
  'plate-log-meal.jpg':[
    {x:52,y:67,title:'Describe a meal',why:'A familiar dish can start with plain language instead of a long form.'},
    {x:52,y:80,title:'Capture it your way',why:'Camera and photo import give people more than one path to log food.'},
    {x:53,y:58,title:'Review first',why:'The screen makes clear that each detected item is checked before it is logged.'}
  ],
  'plate-history-demo.png':[
    {x:68,y:44,title:'Day by day',why:'A compact date rail shows how each day compares at a glance.'},
    {x:50,y:64,title:'A clear target',why:'Logged calories sit next to the daily goal and remaining room.'},
    {x:48,y:88,title:'Pattern over time',why:'The chart turns individual entries into a readable trend.'}
  ],
  'plate-foods-demo.png':[
    {x:48,y:49,title:'Personal pantry',why:'Saved foods keep frequent meals one tap away.'},
    {x:49,y:83,title:'Repeat a meal',why:'Recent meals can be logged again without re-entering ingredients.'}
  ],
  'plate-progress-demo.png':[
    {x:31,y:26,title:'Change the horizon',why:'Week and month views reveal short and longer patterns.'},
    {x:65,y:46,title:'Nutrition in context',why:'Calories and protein charts show each day against its target.'},
    {x:54,y:78,title:'More than a calorie count',why:'Macro balance and weight trends add context to progress.'}
  ],
  'plate-settings-demo.png':[
    {x:48,y:34,title:'Your appearance',why:'System, light, and dark modes let the app match the device or a personal choice.'},
    {x:52,y:55,title:'Across devices',why:'Meals, targets, and weight history sync through the connected account.'},
    {x:49,y:80,title:'Goals that fit',why:'Training goal and measurement units stay adjustable.'}
  ],
  'bioenial-home.png':[
    {x:74,y:55,title:'Learning preview',why:'The public page shows a sample activity and visible progress before sign-in.'},
    {x:15,y:76,title:'Clear first step',why:'A direct start button and guide help new learners enter the experience.'}
  ],
  'bioenial-guide.png':[
    {x:29,y:63,title:'Choose a path',why:'Role and topic links make the guide useful to students and teachers.'},
    {x:23,y:86,title:'Guided onboarding',why:'The page explains what becomes available after selecting a class.'}
  ],
  'bioenial-teacher-home.webp':[
    {x:50,y:26,title:'Teaching starts here',why:'The dashboard puts class creation and the next teaching steps in view.'},
    {x:52,y:70,title:'Classes in reach',why:'Teachers can search and reopen the classes they manage.'}
  ],
  'bioenial-teacher-class.webp':[
    {x:52,y:24,title:'One class hub',why:'Materials, exercises, and discussion share a clear starting point.'},
    {x:50,y:69,title:'Learning tools',why:'Goals, glossary, and references help teachers prepare a structured lesson.'}
  ],
  'bioenial-teacher-experience.webp':[
    {x:49,y:26,title:'Activity design',why:'A teacher can create learning experiences and tie them to science process skills.'},
    {x:50,y:64,title:'Deadline clarity',why:'Each activity keeps its instructions and submission window together.'}
  ],
  'bioenial-teacher-materials.webp':[
    {x:49,y:30,title:'Build a lesson',why:'Materials can be added to the class without leaving the teaching space.'},
    {x:51,y:63,title:'Skills attached',why:'Science process indicators remain visible on each material card.'}
  ],
  'bioenial-teacher-chat.webp':[
    {x:50,y:13,title:'Class conversation',why:'The room gives students and teachers a direct place to ask and respond.'},
    {x:64,y:45,title:'Replies in context',why:'Messages keep the exchange readable as a conversation. Names and content here are demo replacements.'}
  ],
  'bioenial-teacher-discussion.webp':[
    {x:50,y:31,title:'Prompt curiosity',why:'Teachers can start a question and invite the class into a focused discussion.'},
    {x:50,y:80,title:'One topic, many voices',why:'A topic card gathers replies in one thread. The question shown here is demo content.'}
  ],
  'bioenial-teacher-quiz.webp':[
    {x:50,y:33,title:'Practice in class',why:'Exercises sit beside lessons so students can apply what they learned.'},
    {x:49,y:70,title:'Review the attempt',why:'The teacher overview gives a route from each quiz to its results.'}
  ],
  'bioenial-teacher-assignments.webp':[
    {x:50,y:25,title:'Set the task',why:'Teachers can publish an individual assignment from the class area.'},
    {x:51,y:62,title:'Track submissions',why:'Instructions, deadlines, and submitted work stay connected.'}
  ],
  'bioenial-teacher-groups.webp':[
    {x:50,y:28,title:'Learn together',why:'Group assignments give collaborative work its own space.'},
    {x:51,y:70,title:'One shared brief',why:'The activity card keeps the task and its group progress together.'}
  ],
  'bioenial-teacher-scores.webp':[
    {x:50,y:16,title:'Science skills',why:'KPS assessment connects students to the process skills practiced in class.'},
    {x:50,y:49,title:'Evidence by indicator',why:'A skills matrix helps teachers see progress beyond one quiz score. Student names are demo replacements.'},
    {x:50,y:84,title:'Rubric in view',why:'The star rubric gives a shared meaning to each assessment level.'}
  ],
  'bioenial-student-wide-home.webp':[
    {x:30,y:35,title:'A clear starting point',why:'The home screen brings class access and the next learning step into view.'},
    {x:49,y:74,title:'Three ways to learn',why:'Study, practice, and discussion are visible as distinct paths.'}
  ],
  'bioenial-student-wide-class.webp':[
    {x:38,y:38,title:'A class of its own',why:'Lessons and class activity share one recognizable home.'},
    {x:82,y:82,title:'Progress in context',why:'Science process skills can be reviewed alongside class activity. The displayed value is demo data.'}
  ],
  'bioenial-student-wide-experience.webp':[
    {x:43,y:32,title:'Learn by doing',why:'An activity is presented as something to complete, beyond reading a page.'},
    {x:21,y:74,title:'A visible finish',why:'Completion is shown on the activity card so the next step is easy to find.'}
  ],
  'bioenial-student-wide-experience-detail.webp':[
    {x:47,y:33,title:'One activity, clear steps',why:'The task is broken into parts with a visible submission count.'},
    {x:49,y:70,title:'Work stays attached',why:'Instructions and submitted files remain alongside the activity.'}
  ],
  'bioenial-student-wide-materials.webp':[
    {x:43,y:32,title:'A learning library',why:'Class materials live together in a simple, browsable view.'},
    {x:38,y:72,title:'Earn the next lesson',why:'Locked resources signal which activity must be finished first.'}
  ],
  'bioenial-student-wide-chat.webp':[
    {x:49,y:49,title:'Ask the class',why:'A question begins a focused discussion without leaving the course.'},
    {x:49,y:69,title:'Replies stay together',why:'Comments remain under their topic. The text shown here is fictional demo content.'}
  ],
  'bioenial-student-wide-discussion.webp':[
    {x:61,y:26,title:'Class conversation',why:'A dedicated room keeps quick questions near the lesson.'},
    {x:82,y:72,title:'Reply in context',why:'Message replies stay attached to the original conversation. Messages are demo replacements.'}
  ],
  'bioenial-student-wide-quiz.webp':[
    {x:41,y:31,title:'Practice anytime',why:'Students can open a quiz directly from their class.'},
    {x:42,y:85,title:'Instant feedback',why:'The card shows completion and a score entry point; the value is replaced with demo text.'}
  ],
  'bioenial-student-wide-quiz-review.webp':[
    {x:50,y:49,title:'Results explained',why:'Automatic scoring leads into a question-by-question review.'},
    {x:42,y:74,title:'Learn from each answer',why:'Filters and explanations make the result useful after submission.'}
  ],
  'bioenial-student-wide-assignments.webp':[
    {x:44,y:33,title:'Work in one place',why:'Individual assignments sit beside the rest of the class journey.'},
    {x:42,y:80,title:'Know what is due',why:'Status, deadline, and teacher feedback are visible on each task card.'}
  ],
  'bioenial-student-wide-assignment-detail.webp':[
    {x:43,y:49,title:'Submission status',why:'A learner can see whether work was submitted and assessed.'},
    {x:49,y:81,title:'Instructions stay close',why:'The brief and submitted answer remain together for review.'}
  ],
  'bioenial-student-wide-groups.webp':[
    {x:42,y:32,title:'Work together',why:'Group tasks have their own path in the classroom.'},
    {x:43,y:79,title:'Shared progress',why:'A card shows the group deadline and assessment state at a glance.'}
  ],
  'bioenial-student-wide-group-detail.webp':[
    {x:46,y:49,title:'A shared submission',why:'The group can see the work state before assessment.'},
    {x:75,y:81,title:'Collaboration guidance',why:'The page sets expectations for preparing and reviewing work as a team.'}
  ],
  'bioenial-student-wide-results.webp':[
    {x:58,y:31,title:'Skills beyond a score',why:'Science process skills give learners a view of how they are growing.'},
    {x:50,y:73,title:'Evidence by indicator',why:'The assessment breaks progress down by skill. Personal values are hidden in this demo.'}
  ],
  'bioenial-admin-wide-dashboard.webp':[
    {x:34,y:30,title:'A live overview',why:'Aggregate activity gives administrators a quick picture of the learning platform.'},
    {x:51,y:68,title:'Activity over time',why:'Charts show how classroom participation changes across days.'}
  ],
  'bioenial-admin-wide-students.webp':[
    {x:34,y:42,title:'Find the right account',why:'Search and filters support account review at scale.'},
    {x:50,y:80,title:'Privacy by design',why:'The public sample replaces real names and email addresses with fictional entries.'}
  ],
  'bioenial-admin-wide-teachers.webp':[
    {x:50,y:40,title:'Manage educators',why:'Teacher accounts can be found, added, and reviewed from one list.'},
    {x:50,y:70,title:'Export when needed',why:'The table provides standard export controls; visible names are fictional.'}
  ],
  'bioenial-admin-wide-classes.webp':[
    {x:50,y:40,title:'See every class',why:'A searchable list helps administrators keep the classroom catalog organized.'},
    {x:50,y:70,title:'Browse at scale',why:'Pagination keeps a growing set of classes manageable. Listed names are examples.'}
  ],
  'bioenial-admin-wide-landing.webp':[
    {x:49,y:31,title:'Edit the first impression',why:'Site title, introduction, and subtitle can be updated in one place.'},
    {x:50,y:56,title:'Publish the message',why:'A single save action keeps page content management straightforward.'}
  ],
  'bioenial-admin-wide-about.webp':[
    {x:50,y:30,title:'Tell the story',why:'The about page has its own editor for public information.'},
    {x:50,y:60,title:'Content stays manageable',why:'Administrators can update copy without touching the learning flows.'}
  ],
  'bioenial-admin-wide-contact.webp':[
    {x:50,y:31,title:'Keep contact current',why:'The admin editor centralizes public contact details.'},
    {x:50,y:60,title:'One save for public details',why:'Address, email, and hours can be managed from a single form.'}
  ],
  'dony-lifts-screen.png':[
    {x:78,y:25,title:'Sets logged',why:'A workout card makes completion visible while training is in progress.'},
    {x:48,y:55,title:'The whole week',why:'Daily status and a weekly summary make consistency easy to scan.'},
    {x:48,y:76,title:'Plan ahead',why:'A future-week action lets the current day inform upcoming training plans.'}
  ],
  'dony-lifts-workout-live.png':[
    {x:72,y:26,title:'Every set visible',why:'The selected day shows completion and sets logged together.'},
    {x:50,y:45,title:'A whole week at once',why:'Finished days stand out while the current day stays easy to find.'},
    {x:51,y:77,title:'Plan ahead',why:'Today’s plan can be reused for future weeks without changing completed weeks.'}
  ],
  'dony-lifts-workout-detail.png':[
    {x:50,y:47,title:'Every set counts',why:'Load, reps, and completion live together for fast logging mid-workout.'},
    {x:49,y:63,title:'Plans stay flexible',why:'An extra set can be added without leaving the exercise.'},
    {x:78,y:26,title:'Last load in view',why:'The previous weight is visible beside the exercise when choosing today’s load.'}
  ],
  'dony-lifts-sync-demo.png':[
    {x:49,y:24,title:'Shared workout data',why:'The demo screen shows the signed-in state for cross-device records.'},
    {x:46,y:40,title:'A local way out',why:'Import and backup controls keep a portable copy within reach.'},
    {x:49,y:47,title:'Health stays private',why:'The screen states that Apple Health measurements remain on this device.'}
  ],
  'dony-lifts-profile-demo.png':[
    {x:48,y:29,title:'Your training space',why:'The profile brings workout preferences and account controls into one place.'},
    {x:50,y:46,title:'Fitness connection',why:'Apple Fitness integration keeps completed training visible in the wider activity record.'},
    {x:48,y:73,title:'Choose the feel',why:'Appearance settings let the journal fit the device and the person using it.'}
  ],
  'dony-lifts-analysis-demo.png':[
    {x:48,y:29,title:'Sessions in focus',why:'Completed training becomes a compact picture of sets and consistency.'},
    {x:50,y:61,title:'Readiness context',why:'Recovery and rest indicators add context before the next workout.'},
    {x:50,y:78,title:'Health in one view',why:'Sleep and heart metrics sit beside training progress instead of in separate screens.'}
  ],
  'run-detective-screen.png':[
    {x:29,y:24,title:'Health synced',why:'The visible sync state tells runners when the app last received workout data.'},
    {x:44,y:55,title:'The latest case',why:'Distance, pace, and heart rate turn one run into a useful starting point.'},
    {x:50,y:72,title:'Honest pace context',why:'The note explains when workout pace may include pauses.'}
  ],
  'run-detective-history-demo.png':[
    {x:48,y:25,title:'Every run kept',why:'A chronological archive makes earlier sessions easy to revisit.'},
    {x:51,y:46,title:'Compare the evidence',why:'Distance, pace, and heart rate appear together on each workout.'},
    {x:49,y:76,title:'Patterns emerge',why:'The list makes changes across weeks visible before opening a detailed chart.'}
  ],
  'run-detective-trends.png':[
    {x:48,y:31,title:'Change the window',why:'Time ranges let runners inspect short and long patterns.'},
    {x:52,y:57,title:'Weekly evidence',why:'Interactive charts show the exact week behind a distance trend.'},
    {x:74,y:89,title:'More than distance',why:'Pace and heart-rate panels add context to the distance chart.'}
  ],
  'wings-for-life.png':[
    {x:52,y:36,title:'Across time zones',why:'Regional panels organize a worldwide event into readable local views.'},
    {x:84,y:34,title:'Live from the course',why:'Video feeds bring activity from multiple locations into one screen.'},
    {x:51,y:72,title:'One control room',why:'The multi-screen layout keeps regional views and live coverage together.'}
  ],
  'rabobank-it.png':[
    {x:24,y:18,title:'Mission stakes',why:'Requirements and rewards make the next decision immediately clear.'},
    {x:52,y:62,title:'Choose a dock',why:'A spatial mission board turns progress into a place to explore.'},
    {x:79,y:19,title:'Story before action',why:'The mission brief gives each task a reason within the game world.'}
  ],
  'nn-sustainability.png':[
    {x:46,y:43,title:'A visible journey',why:'Illustrated milestones make learning progress feel tangible.'},
    {x:5,y:62,title:'Character paths',why:'Profiles at the side suggest different ways through the experience.'},
    {x:45,y:90,title:'Progress on a timeline',why:'The bottom track makes completed and upcoming steps visible.'}
  ],
  'arbo-techniek.png':[
    {x:46,y:24,title:'Find a safety topic',why:'Large illustrated rows make specialist subjects easier to recognize.'},
    {x:43,y:87,title:'Certificate actions',why:'The main actions put certificates and account connection within reach.'},
    {x:86,y:78,title:'Help close by',why:'FAQ and support controls remain available beside the learning path.'}
  ]
};
function positionAnnotations(){
  if(!imageDialog.open||!dialogImage.naturalWidth)return;
  const image=dialogImage.getBoundingClientRect(),stage=dialogStage.getBoundingClientRect();
  Object.assign(dialogAnnotations.style,{left:`${image.left-stage.left}px`,top:`${image.top-stage.top}px`,width:`${image.width}px`,height:`${image.height}px`});
  const viewer=imageDialog.getBoundingClientRect(),panel=imageDialog.querySelector('.image-dialog-content').getBoundingClientRect();
  const floating=window.innerWidth>700&&(viewer.width-panel.width)/2>205;
  imageDialog.classList.toggle('floating-notes',floating);
  imageDialog.classList.toggle('connected-notes',floating);
  connectorPaths.replaceChildren();
  if(!floating){
    for(const card of dialogNotes.children){card.classList.remove('note-right');card.style.top=''}
    return;
  }
  if(imageDialog.classList.contains('is-loading'))return;
  dialogConnectors.setAttribute('viewBox',`0 0 ${viewer.width} ${viewer.height}`);
  const cards=[...dialogNotes.children],spots=[...dialogAnnotations.children];
  const rightSides=spots.map(spot=>{const rect=spot.getBoundingClientRect();return rect.left+rect.width/2>image.left+image.width/2});
  if(rightSides.length===2&&rightSides[0]===rightSides[1]){
    const second=spots[1].getBoundingClientRect();
    const x=(second.left+second.width/2-image.left)/image.width;
    if(x>.45&&x<.55)rightSides[1]=!rightSides[1];
  }
  cards.forEach((card,index)=>{
    card.classList.toggle('note-right',rightSides[index]);
  });
  for(const right of [false,true]){
    const group=cards.map((card,index)=>({card,index,rect:spots[index]?.getBoundingClientRect()}))
      .filter(item=>rightSides[item.index]===right&&item.rect)
      .sort((a,b)=>a.rect.top-b.rect.top);
    if(!group.length)continue;
    const cardRect=group[0].card.getBoundingClientRect();
    const bubbles=[...dialogGallery.querySelectorAll('.gallery-bubble')]
      .map(bubble=>bubble.getBoundingClientRect())
      .filter(rect=>cardRect.left<rect.right+12&&cardRect.right>rect.left-12);
    const reservedTop=Math.max(14,...bubbles.map(rect=>rect.bottom-viewer.top+24));
    const gap=14;
    const heights=group.map(item=>item.card.getBoundingClientRect().height);
    const required=heights.reduce((sum,height)=>sum+height,0)+gap*(group.length-1);
    if(required>viewer.height-reservedTop-14){
      imageDialog.classList.remove('floating-notes','connected-notes');
      for(const card of cards){card.classList.remove('note-right');card.style.top=''}
      return;
    }
    const tops=[];
    let next=reservedTop;
    group.forEach((item,index)=>{
      const desired=item.rect.top+item.rect.height/2-viewer.top-heights[index]/2;
      tops[index]=Math.max(next,desired);
      next=tops[index]+heights[index]+gap;
    });
    let ceiling=viewer.height-14;
    for(let index=group.length-1;index>=0;index--){
      tops[index]=Math.min(tops[index],ceiling-heights[index]);
      ceiling=tops[index]-gap;
    }
    group.forEach((item,index)=>{item.card.style.top=`${tops[index]+heights[index]/2}px`});
  }
  const lines=cards.map((card,index)=>{
    const spot=spots[index];if(!spot)return;
    const a=spot.getBoundingClientRect(),b=card.getBoundingClientRect(),right=rightSides[index];
    const x1=a.left+a.width/2-viewer.left,y1=a.top+a.height/2-viewer.top;
    const x2=(right?b.left:b.right)-viewer.left;
    const y2=b.top+b.height/2-viewer.top;
    return {x1,y1,x2,y2,right};
  });
  const crosses=(a,b)=>{
    const turn=(x1,y1,x2,y2,x3,y3)=>(x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);
    const first=turn(a.x1,a.y1,a.x2,a.y2,b.x1,b.y1);
    const second=turn(a.x1,a.y1,a.x2,a.y2,b.x2,b.y2);
    const third=turn(b.x1,b.y1,b.x2,b.y2,a.x1,a.y1);
    const fourth=turn(b.x1,b.y1,b.x2,b.y2,a.x2,a.y2);
    return first*second<0&&third*fourth<0;
  };
  const routeAround={left:false,right:false};
  for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){
    if(lines[i]&&lines[j]&&lines[i].right===lines[j].right&&crosses(lines[i],lines[j])){
      routeAround[lines[i].right?'right':'left']=true;
    }
  }
  lines.forEach((line,index)=>{
    if(!line)return;
    const {x1,y1,x2,y2,right}=line;
    const edge=(right?image.right+8:image.left-8)-viewer.left;
    const detour=routeAround[right?'right':'left'];
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',detour?`M ${x1} ${y1} L ${edge} ${y1} L ${x2} ${y2}`:`M ${x1} ${y1} L ${x2} ${y2}`);
    path.setAttribute('marker-end','url(#annotation-arrowhead)');
    path.classList.toggle('is-active',index===activeNoteIndex);
    connectorPaths.append(path);
  });
}
function renderAnnotations(screen){
  const key=screen.src.split('/').pop();
  const highlights=screenHighlights[key]||[];
  activeNoteIndex=null;
  dialogAnnotations.replaceChildren();dialogNotes.replaceChildren();
  for(const [index,note] of highlights.entries()){
    const marker=document.createElement('span');marker.className='annotation-spot';
    marker.style.left=`${note.x}%`;marker.style.top=`${note.y}%`;
    marker.innerHTML=`<span class="annotation-index">${String(index+1).padStart(2,'0')}</span><span class="annotation-arrow" aria-hidden="true">↘</span>`;
    dialogAnnotations.append(marker);
    const card=document.createElement('div');card.className='image-note';
    card.innerHTML=`<span class="image-note-number">${String(index+1).padStart(2,'0')}</span><strong></strong><p></p>`;
    card.querySelector('strong').textContent=note.title;card.querySelector('p').textContent=note.why;
    card.tabIndex=0;
    card.addEventListener('pointerenter',()=>highlightAnnotation(index));
    card.addEventListener('pointerleave',()=>highlightAnnotation(null));
    card.addEventListener('focus',()=>highlightAnnotation(index));
    card.addEventListener('blur',()=>highlightAnnotation(null));
    dialogNotes.append(card);
  }
  dialogNotes.hidden=highlights.length===0;
  requestAnimationFrame(positionAnnotations);
}
window.addEventListener('resize',positionAnnotations);
if('ResizeObserver' in window)new ResizeObserver(positionAnnotations).observe(dialogImage);
imageDialog.querySelector('.image-dialog-content').addEventListener('transitionend',positionAnnotations);
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
      const visibleHeight=Math.min(dialogImage.naturalHeight,Math.max(260,window.innerHeight*.9-(portrait?95:170)));
      const fittedWidth=Math.min(portrait?1100:1050,Math.max(280,Math.round(visibleHeight*ratio+44)));
      imageDialog.style.setProperty('--viewer-width',`${fittedWidth}px`);
    }
    window.setTimeout(()=>{if(request===galleryRequest){imageDialog.classList.remove('is-loading');requestAnimationFrame(positionAnnotations)}},240);
  };
  dialogImage.src=screen.src;
  dialogImage.alt=screen.alt||`${activeProject} ${screen.label} screenshot`;
  dialogCaption.textContent=`${activeProject} · ${screen.label} · ${activeScreen+1} / ${activeScreens.length}`;
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
  const indexes=[1,2,3,4].map(offset=>(activeScreen+offset)%activeScreens.length);
  const others=[...new Set(indexes)].filter(index=>index!==activeScreen).map(index=>({screen:activeScreens[index],index}));
  const sideCounts=[0,0];
  others.forEach(({screen,index},position)=>{
    const side=position%2;
    const button=document.createElement('button');
    button.type='button';
    button.className=`gallery-bubble ${side?'bubble-right':'bubble-left'}${animateEntry?' bubble-enter':''}`;
    button.style.setProperty('--bubble-order',String(position));
    button.style.setProperty('--side-order',String(sideCounts[side]++));
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
