import { useCallback, useEffect, useRef, useState } from 'react';
import { nextTime } from './math.js';
export function usePlayback(autoplay=false) {
 const [time,setTime]=useState(0),[playing,setPlaying]=useState(autoplay),[speed,setSpeed]=useState(1);
 const clock=useRef(0),last=useRef<number|null>(null);
 useEffect(()=>{
  if(!playing) {last.current=null;return;}
  let frame:number;
  function tick(now:number) {
   if(last.current!==null) {
    clock.current=nextTime(clock.current,(now-last.current)/1000,speed);
    setTime(clock.current);
   }
   last.current=now;
   if(clock.current>=60) {setPlaying(false);return;}
   frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
  return ()=>{cancelAnimationFrame(frame);last.current=null;};
 },[playing,speed]);
 const seek=useCallback((v:number)=>{clock.current=Math.max(0,Math.min(60,v));setTime(clock.current);last.current=null;},[]);
 const toggle=()=>{if(clock.current>=60)seek(0);setPlaying(p=>!p);};
 return {time,playing,speed,setSpeed,seek,toggle,pause:()=>setPlaying(false),restart:()=>{seek(0);setPlaying(true);}};
}
