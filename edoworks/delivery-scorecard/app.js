'use strict';
const $ = s => document.querySelector(s);
const el = (tag, text, cls) => {const n=document.createElement(tag); if(text !== undefined) n.textContent=text; if(cls)n.className=cls; return n;};
const date = value => value === null ? 'Unknown' : value.includes('T') ? value.replace('T',' ').replace('Z',' UTC') : value;
function section(title, text) {const n=el('section',undefined,'detail');n.append(el('h4',title),el('p',text ?? 'Unknown — no evidenced scope-change record.'));return n;}
function list(title, items, cls) {const n=el('section',undefined,cls);n.append(el('h4',title));const ul=el('ul');items.forEach(t=>ul.append(el('li',t)));n.append(ul);return n;}
function card(p) {
 const c=el('article',undefined,'project-card');const head=el('div',undefined,'card-head');const names=el('div');names.append(el('p','WORKING NAME','eyebrow'),el('h3',p.name));head.append(names,el('span',p.status,'badge '+p.stage));c.append(head);
 const dates=el('p',`Status observed: ${date(p.statusObservedAt)} · Test date: ${date(p.testDate)}`,'dates');c.append(dates);
 if(p.publicLinks){const links=el('p',undefined,'public-links');p.publicLinks.forEach((item,i)=>{if(i)links.append(document.createTextNode(' · '));const a=el('a',item.label);a.href=item.url;links.append(a);});c.append(links);}
 const outcome=el('div',undefined,'outcome');outcome.append(section('Intended outcome',p.intended),section('Delivered outcome',p.delivered));c.append(outcome);
 const evidence=el('div',undefined,'evidence');evidence.append(list('Verified checks',p.tests,'checks'),list('Known limitations',p.limitations,'limits'));c.append(evidence);
 const retro=el('details');retro.open=true;retro.append(el('summary','Retrospective & next action'));const grid=el('div',undefined,'retro-grid');grid.append(section('Elapsed time',p.elapsedSeconds === null ? 'Unknown — start and end boundaries are not evidenced.' : `${p.elapsedSeconds} seconds elapsed`),section('Open gap categories',p.blockers.length ? p.blockers.join(' · ') : 'No current publication or distribution blockers recorded; validation limits remain above.'),section('Rework',p.rework),section('Scope change',p.scopeChange),section('Improvement hypothesis',p.hypothesis),section('Next action',p.action));retro.append(grid);c.append(retro);return c;
}
async function start(){
 try {
 const response=await fetch('data/scorecard.json');if(!response.ok)throw Error('Data unavailable');const data=await response.json();
 $('#freshness').textContent=`${data.updateMode} · reviewed ${data.reviewedAt}`;
 const known=data.projects.filter(p=>p.unitTestsPassed!==null);const metrics=[[String(data.projects.length),'Projects tracked','Both names are tentative'],[String(known.reduce((s,p)=>s+p.unitTestsPassed,0)),'Known unit-test passes',`${known.length} of ${data.projects.length} projects reports a count`],[String(data.projects.filter(p=>p.stage==='tester'||p.internalBetaAvailable===true).length),'Tester-available builds','Internal testing availability only'],['Unknown','Elapsed delivery time','No evidenced start/end pairs']];
 metrics.forEach(([value,title,note])=>{const n=el('div',undefined,'metric');n.append(el('strong',value),el('h2',title),el('p',note));$('#metrics').append(n);});
 function render(){const shown=data.projects.filter(p=>($('#project').value==='all'||p.id===$('#project').value)&&($('#stage').value==='all'||p.stage===$('#stage').value));$('#projects').replaceChildren(...shown.map(card));$('#empty').hidden=shown.length!==0;$('#result-count').textContent=`${shown.length} of ${data.projects.length} projects shown`;}
 $('#project').addEventListener('change',render);$('#stage').addEventListener('change',render);$('#reset').addEventListener('click',()=>{$('#project').value='all';$('#stage').value='all';render();});
 data.history.forEach(h=>{const n=el('article',undefined,'history-entry');n.append(el('time',h.date),el('h3',h.type),el('p',h.description));$('#history').append(n);});render();
 }catch(e){$('#freshness').textContent='Snapshot unavailable';$('#projects').append(el('p','The public data could not be loaded. Reload this page to try again.','error'));}
}start();
