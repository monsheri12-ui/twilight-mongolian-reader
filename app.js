(async () => {
'use strict';
const $=s=>document.querySelector(s),player=$('#player');
function createLoadingController(){
 const panel=$('#reader-loading');
 if(!panel)return {start(){},update(){},ready(){},error(){}};
 const title=$('#loading-title'),detail=$('#loading-detail'),meter=$('#loading-meter'),progress=$('#loading-progress'),percent=$('#loading-percent'),retry=$('#loading-retry'),back=$('#loading-back'),choice=$('#loading-choice'),chapter=$('#loading-chapter');
 const areas=[$('.header'),$('main')].filter(Boolean);let retryAction,backAction,chooseAction,previousFocus=null,lastPercent=-1,turn=0;
 retry.onclick=null;retry.addEventListener('click',()=>retryAction?.());back.addEventListener('click',()=>backAction?.());chapter.addEventListener('change',()=>chooseAction?.(Number(chapter.value)));
 function busy(value){for(const area of areas)area.inert=value;$('main')?.setAttribute('aria-busy',String(value));document.body.classList.toggle('is-loading',value);}
 return {
  start(number){
   if(panel.hidden)previousFocus=document.activeElement;
   panel.hidden=false;panel.dataset.state='loading';panel.dataset.chapter=String(number);panel.dataset.loaded='0';panel.dataset.total='0';busy(true);
   title.textContent=number===0?'Открываем предисловие':number===25?'Открываем эпилог':'Открываем главу '+number;
   detail.textContent='Загружаем текст и пояснения';meter.hidden=false;progress.removeAttribute('value');percent.textContent='';lastPercent=-1;
   retry.hidden=true;back.hidden=true;choice.hidden=true;retryAction=null;backAction=null;chooseAction=null;return ++turn;
  },
  update({loaded,total},token=turn){
   if(token!==turn||panel.dataset.state!=='loading')return;
   panel.dataset.loaded=String(loaded);panel.dataset.total=String(total);
   if(!total)return;
   const value=Math.min(99,Math.floor(loaded/total*100));
   if(value===lastPercent)return;lastPercent=value;progress.value=value;percent.textContent=value+'%';
   progress.setAttribute('aria-valuetext',value+'%');if(loaded>=total)detail.textContent='Открываем страницу';
  },
  ready(){
   progress.value=100;progress.setAttribute('aria-valuetext','100%');percent.textContent='100%';panel.dataset.state='ready';panel.hidden=true;busy(false);
   if(previousFocus?.isConnected&&!panel.contains(previousFocus))previousFocus.focus({preventScroll:true});
   else if(panel.contains(document.activeElement))$('#chapter')?.focus({preventScroll:true});previousFocus=null;
  },
  error(message,actions){
   panel.hidden=false;panel.dataset.state='error';title.textContent='Не удалось открыть главу';detail.textContent=message;meter.hidden=true;
   $('main')?.setAttribute('aria-busy','false');retryAction=actions.retry;backAction=actions.back;chooseAction=actions.choose;
   retry.hidden=false;back.hidden=!backAction;choice.hidden=!chooseAction;
   if(chooseAction){chapter.replaceChildren(...[...$('#chapter').options].map(option=>option.cloneNode(true)));chapter.value=panel.dataset.chapter;}
   retry.focus({preventScroll:true});return true;
  }
 };
}
const loadingUI=createLoadingController();

document.documentElement.dataset.uiVersion='20261019-1';
const chapterFileSizes={"chapter-0.js":92368,"audio-0.js":13619,"book.js":5227700,"audio.js":419353,"chapter-2.js":2208612,"audio-2.js":395199,"chapter-3.js":1396543,"audio-3.js":239813,"chapter-4.js":1625976,"audio-4.js":294241,"chapter-5.js":1962544,"audio-5.js":396688,"chapter-6.js":2380236,"audio-6.js":300305,"chapter-7.js":2068135,"audio-7.js":341863,"chapter-8.js":2097004,"audio-8.js":429377,"chapter-9.js":1520241,"audio-9.js":296188,"chapter-10.js":1889607,"audio-10.js":372908,"chapter-11.js":1599484,"audio-11.js":289234,"chapter-12.js":2043584,"audio-12.js":415209,"chapter-13.js":2436884,"audio-13.js":453042,"chapter-14.js":2184306,"audio-14.js":463565,"chapter-15.js":1803656,"audio-15.js":404686,"chapter-16.js":1464797,"audio-16.js":245710,"chapter-17.js":2684008,"audio-17.js":486875,"chapter-18.js":1318847,"audio-18.js":254091,"chapter-19.js":1569377,"audio-19.js":259586,"chapter-20.js":1605520,"audio-20.js":326279,"chapter-21.js":1159777,"audio-21.js":169966,"chapter-22.js":1858878,"audio-22.js":350792,"chapter-23.js":594498,"audio-23.js":96361,"chapter-24.js":1744335,"audio-24.js":395065,"chapter-25.js":1572397,"audio-25.js":322318};
const chapterGlobals={"1":["TWILIGHT_BOOK","TWILIGHT_AUDIO"],"2":["TWILIGHT_CHAPTER_TWO","TWILIGHT_AUDIO_TWO"],"3":["TWILIGHT_CHAPTER_THREE","TWILIGHT_AUDIO_THREE"],"4":["TWILIGHT_CHAPTER_FOUR","TWILIGHT_AUDIO_FOUR"],"5":["TWILIGHT_CHAPTER_FIVE","TWILIGHT_AUDIO_FIVE"],"6":["TWILIGHT_CHAPTER_SIX","TWILIGHT_AUDIO_SIX"],"7":["TWILIGHT_CHAPTER_SEVEN","TWILIGHT_AUDIO_SEVEN"],"8":["TWILIGHT_CHAPTER_EIGHT","TWILIGHT_AUDIO_EIGHT"],"9":["TWILIGHT_CHAPTER_NINE","TWILIGHT_AUDIO_NINE"],"10":["TWILIGHT_CHAPTER_TEN","TWILIGHT_AUDIO_TEN"],"11":["TWILIGHT_CHAPTER_ELEVEN","TWILIGHT_AUDIO_ELEVEN"],"12":["TWILIGHT_CHAPTER_TWELVE","TWILIGHT_AUDIO_TWELVE"],"13":["TWILIGHT_CHAPTER_THIRTEEN","TWILIGHT_AUDIO_THIRTEEN"],"0":["TWILIGHT_CHAPTER_0","TWILIGHT_AUDIO_0"],"14":["TWILIGHT_CHAPTER_14","TWILIGHT_AUDIO_14"],"15":["TWILIGHT_CHAPTER_15","TWILIGHT_AUDIO_15"],"16":["TWILIGHT_CHAPTER_16","TWILIGHT_AUDIO_16"],"17":["TWILIGHT_CHAPTER_17","TWILIGHT_AUDIO_17"],"18":["TWILIGHT_CHAPTER_18","TWILIGHT_AUDIO_18"],"19":["TWILIGHT_CHAPTER_19","TWILIGHT_AUDIO_19"],"20":["TWILIGHT_CHAPTER_20","TWILIGHT_AUDIO_20"],"21":["TWILIGHT_CHAPTER_21","TWILIGHT_AUDIO_21"],"22":["TWILIGHT_CHAPTER_22","TWILIGHT_AUDIO_22"],"23":["TWILIGHT_CHAPTER_23","TWILIGHT_AUDIO_23"],"24":["TWILIGHT_CHAPTER_24","TWILIGHT_AUDIO_24"],"25":["TWILIGHT_CHAPTER_25","TWILIGHT_AUDIO_25"]},books={},audios={},chapterLoads=new Map(),dataVersion='20261018-7';
const availableChapters=new Set([...$('#chapter').options].map(option=>Number(option.value)));
for(const [number,names]of Object.entries(chapterGlobals)){if(window[names[0]])books[number]=window[names[0]];if(window[names[1]])audios[number]=window[names[1]];}
function loadDataScript(path,name,onBytes=()=>{}){
 const size=chapterFileSizes[path]||0;
 if(window[name]){onBytes(size);return Promise.resolve();}
 if(location.protocol==='file:'||typeof fetch!=='function'){
  return new Promise((resolve,reject)=>{const script=document.createElement('script');const timer=setTimeout(()=>{script.remove();reject(Error('Chapter download timed out'));},45000);script.src=path+'?v='+dataVersion;script.onload=()=>{clearTimeout(timer);if(window[name]){onBytes(size);resolve();}else{script.remove();reject(Error('Chapter data missing'));}};script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('Chapter download failed'));};document.head.append(script);});
 }
 return fetchChapterData(path,name,onBytes);
}
async function fetchChapterData(path,name,onBytes){
 const controller=new AbortController();let timer;
 const touch=()=>{clearTimeout(timer);timer=setTimeout(()=>controller.abort(),45000);};touch();
 try{
  const response=await fetch(path+'?v='+dataVersion,{signal:controller.signal});
  if(!response.ok)throw Error('Chapter download failed: '+response.status);
  let text='';
  if(response.body?.getReader&&typeof TextDecoder!=='undefined'){
   const reader=response.body.getReader(),decoder=new TextDecoder();let received=0;
   while(true){const {value,done}=await reader.read();if(done)break;touch();received+=value.byteLength;onBytes(received);text+=decoder.decode(value,{stream:true});}
   text+=decoder.decode();
  }else{text=await response.text();onBytes(new TextEncoder().encode(text).byteLength);}
  const prefix='window.'+name+'=',source=text.trim();
  if(!source.startsWith(prefix)||!source.endsWith(';'))throw Error('Invalid chapter data wrapper');
  const data=JSON.parse(source.slice(prefix.length,-1));
  window[name]=data;
 }finally{clearTimeout(timer);}
}
async function loadChapter(number,onProgress=()=>{}){
 if(!availableChapters.has(number)||!chapterGlobals[number])throw Error('Unknown chapter');
 const paths=number===1?['book.js','audio.js']:['chapter-'+number+'.js','audio-'+number+'.js'];
 const sizes=paths.map(path=>chapterFileSizes[path]||0),received=[0,0],total=sizes.reduce((a,b)=>a+b,0);
 const report=(index,bytes)=>{received[index]=Math.min(bytes,sizes[index]);onProgress({loaded:received[0]+received[1],total});};
 if(books[number]&&audios[number]){onProgress({loaded:total,total});return;}
 if(!chapterLoads.has(number))chapterLoads.set(number,(async()=>{
  const names=chapterGlobals[number];onProgress({loaded:0,total});
  await Promise.all(paths.map((path,index)=>loadDataScript(path,names[index],bytes=>report(index,bytes))));
  const book=window[names[0]],audio=window[names[1]];
  if(!book?.scenes?.length||!audio?.scenes||!Array.isArray(book.quizzes))throw Error('Invalid chapter data');
  books[number]=book;audios[number]=audio;
 })().catch(error=>{chapterLoads.delete(number);throw error;}));
 await chapterLoads.get(number);
}

let currentChapter=0;
try{const saved=localStorage.getItem('twilight-mn-current-chapter');if(saved!==null&&availableChapters.has(Number(saved)))currentChapter=Number(saved);}catch{}
async function initialChapter(){
 const selector=$('#chapter'),level=$('#level');selector.value=String(currentChapter);level.disabled=true;
 return new Promise(resolve=>{
  let loading=false;const retry=document.createElement('button');retry.type='button';retry.className='primary';retry.textContent='Повторить загрузку';retry.hidden=true;
  const attempt=async()=>{
   if(loading)return;loading=true;const number=Number(selector.value),token=loadingUI.start(number);selector.disabled=true;retry.disabled=true;$('#position').textContent='Загружаем главу…';
   try{await loadChapter(number,p=>loadingUI.update(p,token));selector.removeEventListener('change',attempt);retry.remove();selector.disabled=false;level.disabled=false;resolve(number);}
   catch{loading=false;selector.disabled=false;retry.disabled=false;const message='Проверьте подключение и попробуйте ещё раз. Можно открыть другую главу.';
    if(!loadingUI.error(message,{retry:attempt,choose:n=>{selector.value=String(n);attempt();}})){$('#position').textContent='Глава не загрузилась';$('#text').textContent=message;$('#text').append(document.createElement('br'),retry);retry.hidden=false;}
   }
  };
  retry.addEventListener('click',attempt);selector.addEventListener('change',attempt);attempt();
 });
}
currentChapter=await initialChapter();
let B=books[currentChapter],A=audios[currentChapter],KEY=B.id;
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fresh=()=>({book:B.id,version:1,scene:0,level:0,read:[],saved:[],reviews:{},quiz:[{}, {}, {}],quizIndex:[0,0,0],colors:false,discoveries:{},savedContexts:{}});
function notifyParent(scrollTo=null){if(window.parent===window)return;window.parent.postMessage({type:'twilight-reader-layout',height:Math.ceil(document.body.getBoundingClientRect().height),...(Number.isFinite(scrollTo)?{scrollTo}:{} )},'*');}
let state=fresh(),view='read',translation=false,grammar=false,selected='',selectedIndex=null,help=null,reviewQueue=[],reviewIndex=0,reviewRevealed=false,noticeTimer,sentenceEnd=null;
let ids=new Set(B.scenes.map(s=>s.id));
function validate(x){
 if(!x||typeof x!=='object'||Array.isArray(x)||x.book!==B.id||x.version!==1)throw Error('Файл относится к другой главе или использует неизвестный формат. Выберите нужную главу перед импортом.');
 if(!Number.isInteger(x.scene)||x.scene<0||x.scene>=B.scenes.length||![0,1,2].includes(x.level))throw Error('Неверная позиция чтения.');
 if(!Array.isArray(x.read)||x.read.length>B.scenes.length||x.read.some(v=>!ids.has(v))||new Set(x.read).size!==x.read.length)throw Error('Неверный список прочитанного.');
 if(!Array.isArray(x.saved)||x.saved.length>10000||x.saved.some(v=>typeof v!=='string'||!Object.hasOwn(B.lex,v))||new Set(x.saved).size!==x.saved.length)throw Error('Неверный словарь.');
 if(!Array.isArray(x.quiz)||x.quiz.length!==3||!Array.isArray(x.quizIndex)||x.quizIndex.length!==3)throw Error('Неверные результаты заданий.');
 for(let l=0;l<3;l++){
  if(!x.quiz[l]||typeof x.quiz[l]!=='object'||Array.isArray(x.quiz[l])||!Number.isInteger(x.quizIndex[l])||x.quizIndex[l]<0||x.quizIndex[l]>=B.quizzes[l].length)throw Error('Неверный итоговый тест.');
  for(const [id,a] of Object.entries(x.quiz[l])){const q=B.quizzes[l].find(q=>q.id===id);if(!q||!a||!Number.isInteger(a.choice)||a.choice<0||a.choice>=q.options.length||typeof a.checked!=='boolean')throw Error('Неверный ответ в тесте.');}
 }
 if(!x.reviews||typeof x.reviews!=='object'||Array.isArray(x.reviews))throw Error('Неверные карточки повторения.');
 const reviews={};for(const [k,v] of Object.entries(x.reviews)){if(!Object.hasOwn(B.lex,k)||!v||!Number.isFinite(v.due)||!Number.isInteger(v.interval)||v.interval<0||v.interval>3650)throw Error('Неверный срок повторения.');reviews[k]={due:v.due,interval:v.interval};}
 const discoveries={};for(const [k,v] of Object.entries(x.discoveries||{})){if(!ids.has(k)||!Array.isArray(v)||v.length>2||v.some(n=>![0,1].includes(n)))throw Error('Неверный список наблюдений.');discoveries[k]=[...new Set(v)];}
 const savedContexts={};for(const [k,v] of Object.entries(x.savedContexts||{})){if(!x.saved.includes(k)||!v||!ids.has(v.scene)||![0,1,2].includes(v.level))throw Error('Неверный контекст слова.');savedContexts[k]={scene:v.scene,level:v.level};if(v.wordIndex!==undefined){if(!Number.isInteger(v.wordIndex)||v.wordIndex<0)throw Error('Неверная позиция слова.');const words=B.scenes.find(s=>s.id===v.scene).text[v.level].match(/[А-Яа-яЁёӨөҮү]+/gu)||[];if(words[v.wordIndex]?.toLocaleLowerCase()===k)savedContexts[k].wordIndex=v.wordIndex;}}
 return {savedContexts,discoveries,book:B.id,version:1,scene:x.scene,level:x.level,read:[...x.read],saved:[...x.saved],reviews,quiz:x.quiz.map(q=>Object.fromEntries(Object.entries(q).map(([k,v])=>[k,{choice:v.choice,checked:v.checked}]))),quizIndex:[...x.quizIndex],colors:!!x.colors};
}
try{const s=localStorage.getItem(KEY);if(s)state=validate(JSON.parse(s));}catch(e){notice('Не удалось восстановить сохранение. Можно загрузить копию прогресса.');}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{notice('Браузер не сохраняет данные. Скачайте прогресс перед закрытием.');}}
function notice(msg){const el=$('#status');el.textContent=msg;el.classList.add('visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el.classList.remove('visible'),4500);}
function download(name,body,type='application/json'){const u=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function stop(){audioRequested=false;setAudioLoading(false);player.pause();sentenceEnd=null;player.currentTime=0;$('#listen').textContent='▶ Слушать отрывок';}
function changeScene(n){stop();state.scene=Math.max(0,Math.min(B.scenes.length-1,n));translation=false;grammar=false;help=null;selected='';selectedIndex=null;save();setView('read');renderRead();window.scrollTo({top:0,behavior:'auto'});notifyParent(0);}
function setView(v){view=v;for(const s of ['read','words','story','quiz'])$('#'+s+'-view').hidden=s!==v;document.querySelectorAll('nav [data-view]').forEach(b=>{if(b.dataset.view===v)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});if(v!=='read')stop();if(v==='words')renderWords();if(v==='story')renderStory();if(v==='quiz')renderQuiz();updateProgress();}
const sectionName=()=>B.chapter===0?'предисловия':B.chapter===25?'эпилога':'главы '+B.chapter;
const sectionTitle=()=>B.chapter===0?'Предисловие':B.chapter===25?'Эпилог':'Глава '+B.chapter;
function updateProgress(){$('#chapter').value=String(currentChapter);$('#progress').max=B.scenes.length;$('#story-view h2').textContent='Хроника '+sectionName();$('#quiz-view h2').textContent='Итог '+sectionName();$('#words-view .section-heading p').textContent='Ваши карточки из '+sectionName()+'. Повторяйте по памяти, затем открывайте перевод.';$('#read-count').textContent=`Прочитано ${state.read.length} / ${B.scenes.length} эпизодов · ${Math.round(state.read.length/B.scenes.length*100)}%`;$('#progress').value=state.read.length;$('#word-count').textContent=state.saved.length;$('#level').value=state.level;}
function wordForm(surface,en){
 let html=esc(surface),parts=en.morph;
 if(parts?.length&&parts.map(p=>p.text).join('').toLocaleLowerCase()===surface.toLocaleLowerCase()){
  let offset=0;html=parts.map(p=>{const t=surface.slice(offset,offset+p.text.length);offset+=p.text.length;return `<span class="cn-morph-${esc(p.role)}${p.category?' cn-g-'+esc(p.category):''}"${p.category?` data-grammar-category="${esc(p.category)}"`:''}>${esc(t)}</span>`;}).join('');
 }
 const unit=en.grammarUnit;
 return unit?`<span class="cn-grammar-unit cn-g-${esc(unit.category)}" data-grammar-category="${esc(unit.category)}">${html}</span>`:html;
}
function passageWords(){return [...B.scenes[state.scene].text[state.level].matchAll(/[А-Яа-яЁёӨөҮү]+/gu)].map(m=>m[0]);}
function contextWordIndex(k,c){const s=c&&B.scenes.find(s=>s.id===c.scene);if(!s)return -1;const words=s.text[c.level].match(/[А-Яа-яЁёӨөҮү]+/gu)||[];return Number.isInteger(c.wordIndex)&&words[c.wordIndex]?.toLocaleLowerCase()===k?c.wordIndex:words.findIndex(w=>w.toLocaleLowerCase()===k);}
function wordEntry(k,index=null){return {...B.lex[k],...(index===null?{}:B.scenes[state.scene].wordExplanations?.[state.level]?.[index]||{})};}
function textHTML(t){let i=0;return t.split(/([А-Яа-яЁёӨөҮү]+)/u).map(w=>{
 if(!/^[А-Яа-яЁёӨөҮү]+$/u.test(w))return esc(w);
 const index=i++,k=w.toLocaleLowerCase(),en=wordEntry(k,index);
 if(!en)return esc(w);
 const related=help==='words'&&selectedIndex!==null&&(B.scenes[state.scene].phrases[state.level]||[]).some(p=>p.focus.includes(selectedIndex)&&p.indices.includes(index));
 return `<button type="button" class="word cn-word${state.saved.includes(k)?' saved':''}${related?' is-related':''}" data-word="${esc(k)}" data-word-index="${index}" aria-label="Разобрать слово ${esc(w)}" aria-pressed="${help==='words'&&selectedIndex===index}">${wordForm(w,en)}</button>`;
}).join('');}
function renderText(){const el=$('#text');el.innerHTML=textHTML(B.scenes[state.scene].text[state.level]);el.className='text'+(state.colors?' colors':'');$('#colors').setAttribute('aria-pressed',String(state.colors));$('#colors .cn-grammar-check').textContent=state.colors?'✓':'';$('#grammar-legend').hidden=!state.colors;renderOtherForms();}
function wordParts(en){
 const unit=en.grammarUnit?`<div class="cn-unit-caption cn-g-${esc(en.grammarUnit.category)}">${esc(en.grammarUnit.label)}</div>`:'';
 return unit+(en.morph?.length?`<div class="cn-morph-parts">${en.morph.map(p=>`<div><b class="cn-morph-${esc(p.role)}${p.category?' cn-g-'+esc(p.category):''}"${p.category?` data-grammar-category="${esc(p.category)}"`:''} lang="mn">${p.role==='suffix'?'-':''}${esc(p.text)}</b><span><strong>${esc(p.label)}</strong><span>${esc(p.meaning)}</span></span></div>`).join('')}</div>`:'');
}
function phraseText(p){let n=0;return p.text.split(/([А-Яа-яЁёӨөҮү]+)/u).map(t=>{
 if(!/^[А-Яа-яЁёӨөҮү]+$/u.test(t))return esc(t);
 const i=p.indices[n++],en=wordEntry(t.toLocaleLowerCase(),i);
 return `<span class="${p.focus.includes(i)?'cn-phrase-mark':''}">${en?wordForm(t,en):esc(t)}</span>`;
}).join('');}
function phraseDetails(index=null){const phrases=(B.scenes[state.scene].phrases[state.level]||[]).filter(p=>index===null||p.focus.includes(index));if(!phrases.length)return '';
 if(index!==null)return `<section class="cn-word-phrases" aria-label="Разбор сочетаний с выбранным словом"><h3>В этом сочетании</h3>${phrases.map(p=>`<article class="cn-phrase-detail"><p class="cn-phrase-quote" lang="mn">${phraseText(p)}</p><h4>${esc(p.title)}</h4><p>${esc(p.note)}</p></article>`).join('')}</section>`;
 return `<section class="cn-phrase-list" aria-label="Частицы и конструкции отрывка"><h3>Разбор сочетаний</h3>${phrases.map(p=>`<details><summary><span lang="mn">${phraseText(p)}</span><small>${esc(p.title)}</small></summary><p>${esc(p.note)}</p></details>`).join('')}</section>`;
}
function renderOtherForms(){const seen=new Set(),rows=[];for(const [i,w] of passageWords().entries()){
 const k=w.toLocaleLowerCase(),en=wordEntry(k,i),parts=(en?.morph||[]).filter(p=>p.category==='form'),unit=en?.grammarUnit?.category==='form'?en.grammarUnit:null;
 if(seen.has(k)||!parts.length&&!unit)continue;seen.add(k);
 rows.push(`<li class="cn-form-example"><div><button type="button" class="cn-form-word" data-word="${esc(k)}" lang="mn">${wordForm(w,en)}</button><span>${esc(en.ru)}</span></div>${parts.length?`<ul>${parts.map(p=>`<li><b class="cn-g-form" data-grammar-category="form" lang="mn">-${esc(p.text)}</b> — ${esc(p.label)}. ${esc(p.meaning)}</li>`).join('')}</ul>`:''}${unit?`<p>${esc(en.note)}</p>`:''}</li>`);
 }
 const group=$('#other-forms');group.hidden=!rows.length;if(!rows.length)group.open=false;$('#other-forms-content').innerHTML=rows.length?`<p>В этом отрывке</p><ul class="cn-form-examples">${rows.join('')}</ul>`:'';
}
function renderHelp(){const s=B.scenes[state.scene],panel=$('#help-panel');panel.hidden=!help;$('#help-toggle').setAttribute('aria-expanded',String(!!help));if(!help){panel.replaceChildren();return;}
 let content='';
 if(help==='grammar')content=`<p class="cn-translation">${esc(s.ru[state.level])}</p>${phraseDetails()}<details class="cn-sentence-grammar"><summary>Как устроено предложение</summary><div>${s.syntax[state.level].map(p=>`<p>${esc(p)}</p>`).join('')}</div></details>`;
 else if(selected&&Object.hasOwn(B.lex,selected)){
  const en=wordEntry(selected,selectedIndex),surface=selectedIndex===null?selected:passageWords()[selectedIndex]||selected,saved=state.saved.includes(selected);
  const related=(s.phrases[state.level]||[]).filter(p=>selectedIndex!==null&&p.focus.includes(selectedIndex));
  content=`<div class="cn-word-detail"><div class="cn-word-name"><strong lang="mn">${wordForm(surface,en)}</strong><span>${esc(en.lemmaLabel||'словарная форма')}: <b lang="mn">${esc(en.lemma)}</b>${en.lemmaRu?` — ${esc(en.lemmaRu)}`:''}</span></div><p class="word-translation"><b>${esc(en.ru)}</b></p>${wordParts(en)}${en.note&&!related.some(p=>p.note===en.note)?`<p>${esc(en.note)}</p>`:''}${selectedIndex!==null?phraseDetails(selectedIndex):''}<div class="cn-word-actions"><button type="button" id="word-save" class="${saved?'cn-secondary':'cn-primary'}" ${saved?'disabled':''}>${saved?'✓ Уже в моих словах':'+ Добавить в мои слова'}</button>${saved?'<button type="button" class="cn-primary" data-view="words">Потренировать слова →</button>':''}</div></div>`;
 }else{
  const seen=new Set();content=`<div class="cn-word-list">${passageWords().map((surface,i)=>{const k=surface.toLocaleLowerCase();if(seen.has(k))return '';seen.add(k);const en=wordEntry(k,i);return `<div class="cn-word-row"><button type="button" class="cn-word-entry" data-word="${esc(k)}" data-word-index="${i}"><strong lang="mn">${esc(surface)}</strong><span>${esc(en.ru)}</span></button><button type="button" class="cn-small-save" data-save="${esc(k)}" aria-label="Добавить слово ${esc(surface)}" aria-pressed="${state.saved.includes(k)}">${state.saved.includes(k)?'✓':'+'}</button></div>`;}).join('')}</div>`;
 }
 panel.innerHTML=`<div class="cn-help-top"><div class="cn-tabs" role="tablist" aria-label="Разбор отрывка"><button type="button" role="tab" id="tab-grammar" data-help="grammar" aria-selected="${help==='grammar'}" aria-controls="help-content">Грамматика</button><button type="button" role="tab" id="tab-words" data-help="words" aria-selected="${help==='words'}" aria-controls="help-content">Слова</button></div><button type="button" class="cn-close" id="help-close" aria-label="Закрыть разбор">×</button></div><div class="cn-help-content" role="tabpanel" id="help-content" aria-labelledby="tab-${help}">${content}</div>`;
}
function showMobileHelp(){if(help&&window.matchMedia('(max-width:760px)').matches){$('#help-panel').scrollIntoView({block:'start',behavior:'auto'});notifyParent(Math.max(0,$('#help-panel').getBoundingClientRect().top+window.scrollY-12));}}
function openWord(k,index=null){if(!Object.hasOwn(B.lex,k))return;
 if(view!=='read'){
  const savedContext=state.savedContexts?.[k];
  if(index===null&&savedContext)index=contextWordIndex(k,savedContext);
  const n=savedContext?B.scenes.findIndex(s=>s.id===savedContext.scene):B.scenes.findIndex(s=>s.text.some(t=>(t.match(/[А-Яа-яЁёӨөҮү]+/gu)||[]).some(w=>w.toLocaleLowerCase()===k)));
  if(n>=0){state.scene=n;if(savedContext)state.level=savedContext.level;save();}setView('read');renderRead();
 }
 selected=k;selectedIndex=index===null?passageWords().findIndex(w=>w.toLocaleLowerCase()===k):index;
 if(selectedIndex<0)selectedIndex=null;help='words';renderText();renderHelp();showMobileHelp();
}
function addWord(k,index=null){if(!Object.hasOwn(B.lex,k)||state.saved.includes(k))return;
 const words=passageWords();if(!Number.isInteger(index)||words[index]?.toLocaleLowerCase()!==k)index=words.findIndex(w=>w.toLocaleLowerCase()===k);
 state.saved.push(k);state.savedContexts[k]={scene:B.scenes[state.scene].id,level:state.level,...(index>=0?{wordIndex:index}:{})};save();updateProgress();renderText();renderHelp();notice(`«${B.lex[k].lemma}» сохранено вместе с отрывком.`);
}

function clip(){return A?.clips?.[A.scenes?.[B.scenes[state.scene].id]?.[state.level]];}
function renderAudio(){const c=clip();$('#listen').disabled=!c;$('#audio-stop').disabled=!c;$('#sentence-audio').hidden=!c?.cues?.length;$('#sentence-audio summary').textContent='Слушать отдельные предложения ('+(c?.cues?.length||0)+')';$('#audio-state').textContent=c?'':'Озвучка ещё не подключена';$('#audio-about').hidden=!c;if(c){if(player.getAttribute('src')!==c.src)player.src=c.src;player.playbackRate=Number($('#speed').value);$('#audio-sentences').innerHTML=c.cues.map((q,i)=>`<button type="button" data-audio-sentence="${i}">▶ ${i+1}. ${esc(q.text)}</button>`).join('');}else player.removeAttribute('src');}
function setImageLoading(busy,failed=false){const hint=$('#image-loading');if(!hint)return;const art=$('#art');art.setAttribute('aria-busy',String(busy));hint.hidden=!busy&&!failed;hint.classList.toggle('is-error',failed);hint.querySelector('.inline-spinner').hidden=failed;hint.querySelector('span:last-child').textContent=failed?'Иллюстрация не загрузилась. Текст можно читать.':'Загружаем иллюстрацию';}
$('#art').addEventListener('load',()=>setImageLoading(false));$('#art').addEventListener('error',()=>setImageLoading(false,true));
function renderRead(){const s=B.scenes[state.scene];$('#art').src=B.assets[s.art];$('#art').alt='Иллюстрация сцены «'+s.title+'»';setImageLoading(!$('#art').complete||!$('#art').naturalWidth);$('#location').textContent=s.location;$('#title').textContent=s.title;$('#position').textContent=`Эпизод ${state.scene+1} из ${B.scenes.length}`;$('#page-number').textContent='';$('#level-note').textContent='';renderText();renderHelp();
 $('#previous').disabled=state.scene===0;$('#next').textContent=state.scene===B.scenes.length-1?'Отметить финал главы ✓':'Продолжить историю →';
 $('#chapter-end').hidden=state.scene!==B.scenes.length-1;$('#chapter-end').innerHTML=state.read.length===B.scenes.length?`<h3>${sectionTitle()} прочитан${B.chapter===0?'о':B.chapter===25?'':'а'}</h3><p>Вы прошли все эпизоды. Теперь можно проверить понимание и повторить сохранённые слова.</p><button class="primary" data-view="quiz">Пройти итоговые задания</button>`:`<h3>Конец ${sectionName()}</h3><p>Прочитано ${state.read.length} из ${B.scenes.length} эпизодов. Найдите оставшиеся в хронике или отметьте этот эпизод после чтения.</p><button data-view="story">Открыть хронику</button>`;$('#scene-progress').textContent=sectionTitle()+' · прочитано '+Math.round(state.read.length/B.scenes.length*100)+'%';renderAudio();updateProgress();
}
function savedEntry(k){const c=state.savedContexts[k],s=c&&B.scenes.find(s=>s.id===c.scene);if(!s)return B.lex[k];const i=contextWordIndex(k,c);return {...B.lex[k],...(s.wordExplanations?.[c.level]?.[i]||{})};}
function renderWords(){const list=state.saved;$('#saved-words').innerHTML=list.length?list.map(k=>{const w=savedEntry(k),r=state.reviews[k],c=state.savedContexts[k],s=c&&B.scenes.find(s=>s.id===c.scene);return `<div class="saved-row"><div><button class="quiet word-name" data-word="${esc(k)}" lang="mn">${esc(k)}</button><span>${esc(w.ru)}</span>${s?`<details class="saved-context"><summary>В тексте · эпизод ${B.scenes.indexOf(s)+1}</summary><blockquote lang="mn">${esc(s.text[c.level])}</blockquote></details>`:''}<small>${r&&r.due>Date.now()?'Следующее повторение: '+new Date(r.due).toLocaleDateString('ru-RU'):'Готово к повторению'}</small></div><button class="quiet" data-remove="${esc(k)}" aria-label="Убрать ${esc(k)}">Убрать</button></div>`;}).join(''):'<p style="margin-top:24px">Здесь появятся слова, которые вы добавите из истории. Откройте карточку и нажмите «Добавить в мои слова».</p>';$('#review-start').disabled=!list.length;updateProgress();}
function renderReview(){const el=$('#review');$('#saved-words').hidden=reviewQueue.length>0&&reviewIndex<reviewQueue.length;if(!reviewQueue.length){el.innerHTML='';return;}if(reviewIndex>=reviewQueue.length){el.innerHTML='<div class="review-card"><h3>Повторение завершено</h3><p>Новые сроки сохранены. Слова, которые забылись, появятся раньше.</p></div>';return;}const k=reviewQueue[reviewIndex],w=savedEntry(k);el.innerHTML=`<div class="review-card"><small>Карточка ${reviewIndex+1} из ${reviewQueue.length}</small><p class="mn" lang="mn">${esc(k)}</p>${reviewRevealed?`<p>${esc(w.ru)}</p><p class="muted">${esc(w.note)}</p><div><button data-rating="0">Не вспомнил</button><button data-rating="1">С трудом</button><button data-rating="2">Вспомнил</button></div>`:'<button id="review-show" class="primary">Показать перевод</button>'}</div>`;}
function renderStory(){const q=$('#search').value.toLocaleLowerCase().trim(),num=/^\d+$/.test(q)?Number(q):null;const items=B.scenes.map((s,i)=>({s,i})).filter(({s,i})=>!q||(num?i+1===num:([s.title,...s.text,...s.ru].join(' ').toLocaleLowerCase().includes(q))));$('#search-count').textContent='Найдено эпизодов: '+items.length;$('#story-results').innerHTML=items.map(({s,i})=>`<button class="story-row" data-go="${i}"><span><small>${i+1}. ${esc(s.location)} · ${state.read.includes(s.id)?'Прочитано ✓':'Ещё не прочитано'}</small><strong>${esc(s.title)}</strong><span class="preview" lang="mn">${esc(s.text[2].slice(0,165))}${s.text[2].length>165?'…':''}</span></span><span aria-hidden="true">→</span></button>`).join('')||'<p>Ничего не найдено. Попробуйте другую форму слова.</p>';}
function renderQuiz(){const l=state.level,qs=B.quizzes[l],i=state.quizIndex[l],q=qs[i],a=state.quiz[l][q.id],checked=qs.filter(q=>state.quiz[l][q.id]?.checked).length,score=qs.filter(q=>state.quiz[l][q.id]?.checked&&state.quiz[l][q.id].choice===q.correct).length;$('#quiz-description').textContent=[ 'Начальный уровень: найдите явные детали истории.','Средний уровень: разберите формы и конструкции в контексте.','Продвинутый уровень: различайте наблюдение, предположение и вывод рассказчицы.'][l];$('#quiz-progress').textContent=`${B.levels[l]} · вопрос ${i+1} из ${qs.length} · проверено ${checked}, верно ${score}`;$('#quiz-content').innerHTML=`<h3>${esc(q.prompt)}</h3><p><small>Связан с эпизодом ${q.scene+1}. Ответ и объяснение появятся после проверки.</small></p><fieldset class="quiz-options" style="border:0;padding:0" aria-label="Варианты ответа">${q.options.map((o,n)=>`<label class="quiz-option"><input type="radio" name="answer" value="${n}" ${a?.choice===n?'checked':''} ${a?.checked?'disabled':''}><span>${esc(o)}</span></label>`).join('')}</fieldset>${a?.checked?`<div class="quiz-result ${a.choice===q.correct?'':'wrong'}"><strong>${a.choice===q.correct?'Верно':'Попробуйте разобраться'}</strong><p>Ответ: ${esc(q.options[q.correct])}</p><p>${esc(q.explain)}</p><button class="quiet" data-go="${q.scene}">Вернуться к эпизоду ${q.scene+1}</button></div>`:''}<div class="quiz-tools">${a?.checked?'<button id="quiz-retry" class="quiet">Попробовать снова</button>':'<button id="quiz-check" class="primary">Проверить ответ</button>'}<button id="quiz-prev" class="quiet" ${i===0?'disabled':''}>← Назад</button><button id="quiz-next" class="quiet" ${i===qs.length-1?'disabled':''}>Следующий →</button></div>${checked===qs.length?`<div class="quiz-result"><h3>Итог: ${score} / ${qs.length}</h3><p>${score===qs.length?'Все задания этого уровня выполнены верно.':'Вернитесь к вопросам, где были ошибки. Каждый можно повторить.'}</p><button id="quiz-reset" class="quiet">Пройти этот уровень заново</button></div>`:''}`;}
let audioRequested=false;
function setAudioLoading(value){const el=$('#audio-state');if(value){el.dataset.loading='true';el.textContent='Загружаем запись…';}else if(el.dataset.loading==='true'){delete el.dataset.loading;el.textContent='';}}
async function play(start=0,end=null){const c=clip();if(!c)return;if(start===null&&!player.paused){player.pause();return;}if(start===null)start=player.currentTime;player.currentTime=start;sentenceEnd=end;audioRequested=true;setAudioLoading(player.readyState<3);try{await player.play();setAudioLoading(false);}catch{audioRequested=false;setAudioLoading(false);notice('Браузер не начал воспроизведение. Нажмите «Слушать» ещё раз.');}}
player.addEventListener('play',()=>{$('#listen').textContent='Ⅱ Пауза';});
player.addEventListener('playing',()=>setAudioLoading(false));player.addEventListener('canplay',()=>setAudioLoading(false));
player.addEventListener('waiting',()=>{if(audioRequested&&!player.paused)setAudioLoading(true);});
player.addEventListener('pause',()=>{audioRequested=false;setAudioLoading(false);$('#listen').textContent='▶ Слушать отрывок';});
player.addEventListener('timeupdate',()=>{if(sentenceEnd!==null&&player.currentTime>=sentenceEnd){player.pause();sentenceEnd=null;}});
player.addEventListener('error',()=>{audioRequested=false;setAudioLoading(false);if(clip())$('#audio-state').textContent='Не удалось воспроизвести запись. Попробуйте открыть тренажёр заново.';});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const id=b.id;
 if(b.dataset.view){setView(b.dataset.view);return;}if(b.dataset.help){help=b.dataset.help;selected='';selectedIndex=null;renderText();renderHelp();return;}if(b.dataset.save){addWord(b.dataset.save);return;}if(b.dataset.word){openWord(b.dataset.word,b.dataset.wordIndex===undefined?null:+b.dataset.wordIndex);return;}if(b.dataset.go!==undefined){changeScene(+b.dataset.go);return;}if(b.dataset.remove){state.saved=state.saved.filter(k=>k!==b.dataset.remove);delete state.reviews[b.dataset.remove];delete state.savedContexts[b.dataset.remove];save();renderWords();return;}
 if(b.dataset.audioSentence!==undefined){const q=clip()?.cues?.[+b.dataset.audioSentence];if(q)play(q.start,q.end);return;}
 if(b.dataset.rating!==undefined){const k=reviewQueue[reviewIndex],r=state.reviews[k]||{interval:0},rating=+b.dataset.rating,interval=rating===0?0:rating===1?1:Math.min(3650,Math.max(2,r.interval?Math.round(r.interval*2.3):3));state.reviews[k]={interval,due:Date.now()+(interval?interval*86400000:600000)};reviewIndex++;reviewRevealed=false;save();renderReview();renderWords();return;}
 if(id==='help-toggle'){help=help?null:'grammar';selected='';selectedIndex=null;renderText();renderHelp();showMobileHelp();}else if(id==='help-close'){help=null;selected='';selectedIndex=null;renderText();renderHelp();$('#help-toggle').focus();}else if(id==='colors'){state.colors=!state.colors;save();renderText();}else if(id==='previous')changeScene(state.scene-1);
 else if(id==='next'){const sid=B.scenes[state.scene].id;if(!state.read.includes(sid))state.read.push(sid);save();if(state.scene<B.scenes.length-1)changeScene(state.scene+1);else{renderRead();notice('Финальный эпизод отмечен прочитанным');}}
 else if(id==='listen')play(null);
 else if(id==='audio-stop')stop();
 else if(id==='word-save')addWord(selected,selectedIndex);
 else if(id==='review-start'){reviewQueue=state.saved.filter(k=>!state.reviews[k]||state.reviews[k].due<=Date.now());if(!reviewQueue.length){reviewQueue=[...state.saved];notice('Все карточки пока помнятся. Можно повторить их ещё раз.');}reviewIndex=0;reviewRevealed=false;renderReview();}
 else if(id==='review-show'){reviewRevealed=true;renderReview();}
 else if(id==='words-export'){const q=s=>'"'+String(s).replace(/"/g,'""')+'"';download('Сумерки-глава-'+B.chapter+'-мои-слова.csv','\uFEFF'+[['Монгольский','Словарная форма','Русский'],...state.saved.map(k=>{const w=savedEntry(k);return [k,w.lemma,w.ru];})].map(a=>a.map(q).join(',')).join('\r\n'),'text/csv;charset=utf-8');}
 else if(id==='export')download('Сумерки-глава-'+B.chapter+'-мой-прогресс.json',JSON.stringify(state,null,2));
 else if(id==='quiz-check'){const input=$('input[name=answer]:checked');if(!input){notice('Сначала выберите ответ');return;}const q=B.quizzes[state.level][state.quizIndex[state.level]];state.quiz[state.level][q.id]={choice:+input.value,checked:true};save();renderQuiz();}
 else if(id==='quiz-retry'){const q=B.quizzes[state.level][state.quizIndex[state.level]];delete state.quiz[state.level][q.id];save();renderQuiz();}
 else if(id==='quiz-prev'||id==='quiz-next'){state.quizIndex[state.level]+=id==='quiz-next'?1:-1;save();renderQuiz();}
 else if(id==='quiz-reset'){state.quiz[state.level]={};state.quizIndex[state.level]=0;save();renderQuiz();}
});
async function changeChapter(number){
 if(!availableChapters.has(number)||number===currentChapter)return;
 save();stop();$('#chapter').disabled=true;$('#level').disabled=true;const token=books[number]&&audios[number]?null:loadingUI.start(number);
 try{await loadChapter(number,p=>{if(token!==null)loadingUI.update(p,token);});}catch{$('#chapter').value=String(currentChapter);$('#chapter').disabled=false;$('#level').disabled=false;if(!loadingUI.error('Проверьте подключение и повторите попытку. Открытая глава и ваш прогресс сохранены.',{retry:()=>changeChapter(number),back:()=>loadingUI.ready()}))notice('Не удалось загрузить главу. Попробуйте ещё раз.');return;}
 $('#chapter').disabled=false;$('#level').disabled=false;currentChapter=number;B=books[number];A=audios[number];KEY=B.id;ids=new Set(B.scenes.map(s=>s.id));state=fresh();
 try{const previous=localStorage.getItem(KEY);if(previous)state=validate(JSON.parse(previous));localStorage.setItem('twilight-mn-current-chapter',String(number));}catch{notice('Не удалось восстановить сохранение этой главы. Можно загрузить копию прогресса.');}
 translation=false;grammar=false;help=null;selected='';selectedIndex=null;reviewQueue=[];reviewIndex=0;reviewRevealed=false;$('#review').innerHTML='';$('#saved-words').hidden=false;$('#search').value='';$('#transfer-status').textContent='';
 setView('read');renderRead();window.scrollTo({top:0,behavior:'auto'});notifyParent(0);loadingUI.ready();
}
$('#chapter').addEventListener('change',e=>changeChapter(Number(e.target.value)));
$('#level').addEventListener('change',e=>{stop();state.level=+e.target.value;translation=false;grammar=false;help=null;selected='';selectedIndex=null;save();renderRead();if(view==='quiz')renderQuiz();});$('#speed').addEventListener('change',e=>{player.playbackRate=+e.target.value;});$('#search').addEventListener('input',renderStory);
$('#import').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>5000000)throw Error('Файл слишком большой.');const candidate=validate(JSON.parse(await f.text()));stop();state=candidate;save();translation=false;grammar=false;help=null;selected='';selectedIndex=null;reviewQueue=[];$('#review').innerHTML='';setView('read');renderRead();$('#transfer-status').textContent=`Прогресс загружен: ${state.read.length} эпизодов, ${state.saved.length} слов.`;}catch(err){$('#transfer-status').textContent='Импорт отклонён. Текущий прогресс сохранён. '+err.message;}e.target.value='';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&help){help=null;selected='';selectedIndex=null;renderText();renderHelp();$('#help-toggle').focus({preventScroll:true});}const b=e.target.closest('[data-help]');if(b&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();help=e.key==='Home'?'grammar':e.key==='End'?'words':help==='grammar'?'words':'grammar';selected='';selectedIndex=null;renderText();renderHelp();$('[data-help="'+help+'"]').focus({preventScroll:true});}});
renderRead();setView('read');loadingUI.ready();
if(window.parent!==window){new ResizeObserver(()=>notifyParent()).observe(document.body);window.addEventListener('load',()=>notifyParent());}
})();
