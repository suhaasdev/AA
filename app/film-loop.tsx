"use client";
import {useEffect,useRef,useState} from "react";

/** Silent native footage starts automatically whenever its scene is visible. */
export default function FilmLoop({src,title,active,preload=false,poster}:{src:string;title:string;active:boolean;preload?:boolean;poster?:string}){
 const video=useRef<HTMLVideoElement>(null);
 const [ready,setReady]=useState(false),[state,setState]=useState("loading");
 useEffect(()=>{
  const media=video.current!;
  let disposed=false;
  const sync=()=>{
   if(disposed)return;
   if(active&&!document.hidden){
    media.muted=true;media.defaultMuted=true;
    if(media.paused)void media.play().catch(()=>{if(!disposed)setState("waiting");});
   }else media.pause();
  };
  sync();
  media.addEventListener("canplay",sync);
  document.addEventListener("visibilitychange",sync);
  window.addEventListener("pageshow",sync);
  // Retry silently after a browser-imposed autoplay restriction is lifted.
  document.addEventListener("pointerdown",sync,{passive:true});
  return()=>{disposed=true;media.removeEventListener("canplay",sync);document.removeEventListener("visibilitychange",sync);window.removeEventListener("pageshow",sync);document.removeEventListener("pointerdown",sync);media.pause();};
 },[active,src]);
 return <div className={`film-loop ${ready?"is-playing":""}`} data-video-state={state} data-active={active} aria-hidden="true">
  <video ref={video} src={src} poster={poster} autoPlay={active} muted loop playsInline controls={false} disablePictureInPicture preload={preload?"auto":"none"} aria-label={`${title} silent loop`} onPlaying={()=>{setReady(true);setState("playing");}} onPause={()=>setState("paused")} onError={()=>{setReady(false);setState("unavailable");}}/>
 </div>;
}
