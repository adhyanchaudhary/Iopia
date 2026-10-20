import { useId } from 'react';
import { activation, ease, feature, classificationPoints } from '../lesson/math.js';

export function Logo({compact=false}:{compact?:boolean}) {
 const id=useId();
 return <span className="brand"><svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><defs><linearGradient id={id} x2="1" y2="1"><stop stopColor="#ac6dff"/><stop offset="1" stopColor="#48dcf8"/></linearGradient></defs><g fill="none" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 35C14 29 8 28 3 28V12c6-1 12 2 17 6 5-4 11-7 17-6v16c-5 0-11 1-17 7Z"/><path d="M20 19v16M6 7l8 1 5 5M23 4h7l5 5"/><circle cx="6" cy="7" r="2"/><circle cx="23" cy="4" r="2"/></g><path d="m17 16 10 6-10 6Z" fill={`url(#${id})`}/></svg>{!compact&&<span>iopia<span className="brand-period">.</span></span>}</span>;
}

type P = [number,number,number];
function project([x,y,z]:P,angle:number,scale=42):[number,number] {
 const a=x*Math.cos(angle)-y*Math.sin(angle),b=x*Math.sin(angle)+y*Math.cos(angle);
 return [200+a*scale,174+b*scale*.40-z*scale*.82];
}
const pathFrom=(points:number[][])=>points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
export function Surface({time=0,mode='affine',progress=1}:{time?:number,mode?:'affine'|'relu'|'feature',progress?:number}) {
 const angle=-.55+Math.sin(time*.12)*.10;
 const blend=ease(progress);
 function map(x:number,y:number):P {
  if(mode==='relu') return [x,y,blend*(Math.max(0,x)+Math.max(0,y))*.65];
  if(mode==='feature') return [x,y,blend*feature(x,y)*.58];
  const a=Math.sin(time*.28)*.32;return [x*(1+a)+y*.23*Math.sin(time*.3)+Math.sin(time*.4)*.25,y,0];
 }
 const lines=[];
 for(let i=-8;i<=8;i++) {
  const c=i*.3;
  for(const direction of [0,1]) {
   const pts=Array.from({length:49},(_,j)=>{const v=-2.4+j*.1;return project(map(direction?v:c,direction?c:v),angle,mode==='affine'?64:42);});
   lines.push(<path key={`${i}-${direction}`} d={pathFrom(pts)} fill="none" stroke={i===0?'#a8bcff':mode==='affine'?'#638fe9':'#8580ff'} strokeOpacity={i===0?.8:.47} strokeWidth={i===0?1.3:.8}/>);
  }
 }
 return <svg className="surface" viewBox="0 0 400 320" role="img" aria-label={mode==='affine'?'A straight coordinate grid under an affine transformation':mode==='relu'?'Feature surface with height ReLU of x plus ReLU of y':'Feature surface with height absolute x plus absolute y'}>
  <ellipse cx="200" cy="227" rx="144" ry="48" fill="#5978ff" opacity=".035"/>
  {lines}
  {mode!=='affine'&&<><path d={pathFrom(Array.from({length:49},(_,j)=>project(map(0,-2.4+j*.1),angle)))} stroke="#8ce4ed" strokeWidth="1.8" fill="none"/><path d={pathFrom(Array.from({length:49},(_,j)=>project(map(-2.4+j*.1,0),angle)))} stroke="#8ce4ed" strokeWidth="1.8" fill="none"/></>}
  {Array.from({length:42},(_,i)=>{const x=Math.sin(i*13.1)*2,y=Math.cos(i*6.7)*2;const p=project(map(x,y),angle,mode==='affine'?64:42);return <circle key={i} cx={p[0]} cy={p[1]} r="2.2" fill={i%2?'#7a8eff':'#73e5db'} opacity={.65+Math.sin(time*1.8+i)*.25}/>;})}
  <text x="343" y="227" className="svg-label">x₁</text><text x="63" y="244" className="svg-label">x₂</text>
  {mode!=='affine'&&<text x="200" y="302" textAnchor="middle" className="svg-label">{mode==='relu'?'HEIGHT = ReLU(x₁) + ReLU(x₂)':'HEIGHT = |x₁| + |x₂|'}</text>}
 </svg>;
}

export function Network({time=0,small=false}:{time?:number,small?:boolean}) {
 const layers=[3,5,5,3,1];
 const nodes=layers.map((n,l)=>Array.from({length:n},(_,i)=>({x:44+l*78,y:150+(i-(n-1)/2)*40})));
 return <svg viewBox="0 0 400 300" className={`network ${small?'small':''}`} role="img" aria-label="A five-layer neural network with signals passing through its connections">
  {nodes.slice(0,-1).flatMap((layer,l)=>layer.flatMap((p,i)=>nodes[l+1].map((q,j)=>{
   const phase=((time*.55+l*.24+i*.12+j*.19)%1+1)%1;
   return <g key={`${l}-${i}-${j}`}><line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={l%2?'#7777dd':'#4885b7'} strokeWidth=".7" opacity=".26"/>{(i+j)%3===0&&<circle cx={p.x+(q.x-p.x)*phase} cy={p.y+(q.y-p.y)*phase} r="1.7" fill="#99def4" opacity=".8"/>}</g>;
  })))}
  {nodes.flatMap((layer,l)=>layer.map((p,i)=><g key={`${l}-${i}`}><circle cx={p.x} cy={p.y} r="11" fill="#111a2b" stroke={l===4?'#a3ece5':'#6d7ee5'} strokeOpacity=".65"/><circle cx={p.x} cy={p.y} r="3" fill={l===4?'#a3ece5':'#8b9aff'} opacity={.5+Math.sin(time*2-i-l)*.3}/></g>))}
  <text x="44" y="278" textAnchor="middle" className="svg-label">INPUT</text><text x="200" y="278" textAnchor="middle" className="svg-label">LEARNED FEATURES</text><text x="356" y="278" textAnchor="middle" className="svg-label">OUTPUT</text>
 </svg>;
}

export function FunctionGraph({name='ReLU',input,blend=1}:{name?:string,input?:number,blend?:number}) {
 const ox=150,oy=145,sx=30,sy=27;
 const graph=Array.from({length:201},(_,i)=>{const x=-4+i*.04;return [ox+x*sx,oy-((1-blend)*x+blend*activation(name,x))*sy];});
 return <svg viewBox="0 0 300 260" className="function-graph" role="img" aria-label={`${name} activation graph${input!==undefined?`, input ${input}, output ${activation(name,input).toFixed(2)}`:''}`}>
  {Array.from({length:9},(_,i)=><g key={i}><line x1={30+i*30} y1="25" x2={30+i*30} y2="232" stroke="#263044" strokeWidth=".5"/><line x1="26" y1={37+i*24} x2="276" y2={37+i*24} stroke="#263044" strokeWidth=".5"/></g>)}
  <path d="M25 145H279M150 20V235" fill="none" stroke="#59677d" strokeWidth="1"/>
  <text x="282" y="159" className="svg-label">z</text><text x="161" y="25" className="svg-label">f(z)</text><text x="137" y="161" className="svg-label">0</text><text x="264" y="160" className="svg-label">4</text><text x="24" y="161" className="svg-label">−4</text>
  <path d={pathFrom(graph)} stroke="#98e5de" strokeWidth="3" fill="none" strokeLinejoin="round"/>
  {input!==undefined&&<g><path d={`M${ox+input*sx} ${oy}V${oy-activation(name,input)*sy}H${ox}`} stroke="#ac9cff" strokeDasharray="4 4" fill="none"/><circle cx={ox+input*sx} cy={oy-activation(name,input)*sy} r="6" fill="#ae9cff" stroke="#080b12" strokeWidth="2"/></g>}
 </svg>;
}

export function Boundary({time=0,progress=1}:{time?:number,progress?:number}) {
 const b=ease(progress),points=[];
 for(const {x,y,inner,index} of classificationPoints()) points.push(<circle key={index} cx={200+x*65} cy={154+y*65} r="3.1" fill={inner?'#9c91fa':'#73ddd1'} opacity=".85"/>);
 return <svg viewBox="0 0 400 320" className="boundary" role="img" aria-label="Two classes separated by a diamond-shaped piecewise-linear boundary in original input space">
  {Array.from({length:11},(_,i)=><g key={i}><path d={`M${40+i*32} 25V285M40 ${25+i*26}H360`} stroke="#263044" strokeWidth=".5"/></g>)}
  <path d="M40 154H360M200 25V285" stroke="#6d7a93" opacity=".45"/>
  <path d={`M200 ${154-104*b}L${200+104*b} 154L200 ${154+104*b}L${200-104*b} 154Z`} fill="#8b83fa" fillOpacity={.035*b} stroke="#b4acf9" strokeOpacity={b} strokeWidth="1.8"/>
  <path d={`M${80} ${60}L${320} ${250}`} stroke="#e3b17f" strokeWidth="1.6" strokeDasharray="6 5" opacity={1-b}/>
  {points}<text x="200" y="311" textAnchor="middle" className="svg-label">{b>.5?'INPUT SPACE · |x₁| + |x₂| = 1.6':'ONE STRAIGHT BOUNDARY IS NOT ENOUGH'}</text>
  <circle cx={200+104*Math.cos(time*.2)/(Math.abs(Math.cos(time*.2))+Math.abs(Math.sin(time*.2)))} cy={154+104*Math.sin(time*.2)/(Math.abs(Math.cos(time*.2))+Math.abs(Math.sin(time*.2)))} r="4" fill="#e9e4ff" opacity={b}/>
 </svg>;
}

export function LessonVisual({time,scene}:{time:number,scene:number}) {
 const local=time-[0,10,20,35,50][scene];
 return <div className={`lesson-render scene-${scene}`}>
  <div className="visual-meta"><span><i/> LIVE MATHEMATICAL CANVAS</span><span>FIG. 0{scene+1}</span></div>
  {scene===0&&<div className="visual-single"><Surface time={time}/><div className="floating-tag">ROTATE <span>→</span> STRETCH <span>→</span> SHIFT</div></div>}
  {scene===1&&<div className="visual-single"><Network time={time}/><div className="equation-collapse" style={{opacity:.4+.6*ease(local/4)}}>W′ = W₂W₁ <span>·</span> b′ = W₂b₁ + b₂</div></div>}
  {scene===2&&<div className="visual-dual"><div><span className="diagram-label">01 / ACTIVATION MAPPING</span><FunctionGraph blend={ease(local/3)} input={-3+((local%7)/7)*6}/><small>Negative features → 0 · positive features → unchanged</small></div><div><span className="diagram-label">02 / A DERIVED FEATURE SURFACE</span><Surface mode="relu" time={time} progress={local/5}/><small>Height plot, not a uniform bend of the input plane</small></div></div>}
  {scene===3&&<div className="visual-dual"><div><span className="diagram-label">ORIGINAL INPUT SPACE</span><Boundary time={time} progress={(local-1)/4}/><small>Two classes · fixed illustrative weights</small></div><div><span className="diagram-label">NONLINEAR FEATURE REPRESENTATION</span><Surface mode="feature" time={time} progress={local/5}/><small>Threshold h = 1.6 separates these two classes</small></div></div>}
  {scene===4&&<div className="final-visual"><Network time={time}/><div className="representation"><span>AFFINE MAPS</span><b>+</b><span>NONLINEARITY</span><b>=</b><strong>NEW POSSIBILITIES</strong></div></div>}
 </div>;
}
