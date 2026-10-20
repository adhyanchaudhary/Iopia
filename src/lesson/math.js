export const clamp = (v, low, high) => Math.min(high, Math.max(low, v));
export const ease = v => { const t = clamp(v, 0, 1); return t*t*(3-2*t); };
export const activation = (name, x) => name === 'ReLU' ? Math.max(0,x) : name === 'Sigmoid' ? 1/(1+Math.exp(-x)) : Math.tanh(x);
export const feature = (x,y) => Math.max(0,x)+Math.max(0,-x)+Math.max(0,y)+Math.max(0,-y);
export const classificationPoints = () => Array.from({length:88},(_,index)=>{
 const inner=index%2===0,angle=index*2.39996,radius=inner?.25+(index%13)*.042:1.75+(index%11)*.03;
 return {index,inner,x:radius*Math.cos(angle),y:radius*Math.sin(angle)};
});
export const sceneAt = t => t < 10 ? 0 : t < 20 ? 1 : t < 35 ? 2 : t < 50 ? 3 : 4;
export const formatTime = t => `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
export function nextTime(current, deltaSeconds, speed) { return clamp(current+deltaSeconds*speed,0,60); }
