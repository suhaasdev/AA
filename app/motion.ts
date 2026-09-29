export const DURATION=14;
export const clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v));
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const range=(s:number,a:number,b:number)=>clamp((s-a)/(b-a));
export const smooth=(t:number)=>t*t*(3-2*t);
export const windowFade=(s:number,a:number,b:number,fade=.3)=>Math.min(range(s,a,a+fade),1-range(s,b-fade,b));
export type Pose={x:number;y:number;z:number;rx:number;ry:number;rz:number;scale:number;opacity:number;rainbow:number;wire:number};
const keyframes:[number,Pose][]=[
 [0,{x:0,y:0,z:0,rx:-.13,ry:-.48,rz:-.09,scale:1.12,opacity:1,rainbow:.85,wire:0}],
 [.7,{x:0,y:0,z:0,rx:.1,ry:.3,rz:.08,scale:.96,opacity:1,rainbow:.35,wire:0}],
 [1.2,{x:0,y:0,z:0,rx:.2,ry:1.15,rz:.12,scale:.8,opacity:1,rainbow:.6,wire:0}],
 [2.1,{x:0,y:0,z:0,rx:-.18,ry:3.2,rz:-.1,scale:.9,opacity:1,rainbow:.75,wire:0}],
 [3.2,{x:0,y:0,z:0,rx:.12,ry:5.7,rz:.1,scale:.92,opacity:1,rainbow:.6,wire:0}],
 [3.7,{x:0,y:0,z:.3,rx:-.1,ry:6.55,rz:-.08,scale:1.16,opacity:1,rainbow:.9,wire:0}],
 [4.1,{x:0,y:-3,z:0,rx:.2,ry:7.8,rz:.2,scale:.9,opacity:0,rainbow:1,wire:0}],
 [4.65,{x:-.7,y:0,z:0,rx:.07,ry:7.8,rz:-.38,scale:.92,opacity:0,rainbow:1,wire:0}],
 [4.95,{x:-.7,y:0,z:0,rx:.07,ry:7.85,rz:-.38,scale:.98,opacity:1,rainbow:1,wire:0}],
 [5.7,{x:-.6,y:0,z:.2,rx:.08,ry:7.84,rz:-.38,scale:1.14,opacity:1,rainbow:1,wire:0}],
 [6.15,{x:-.25,y:0,z:1.9,rx:.17,ry:7.36,rz:-.42,scale:2.3,opacity:1,rainbow:1,wire:0}],
 [6.6,{x:0,y:0,z:3.7,rx:.1,ry:6.8,rz:-.2,scale:13,opacity:1,rainbow:.5,wire:0}],
 [6.95,{x:0,y:0,z:4,rx:.1,ry:6.4,rz:-.1,scale:26,opacity:0,rainbow:0,wire:0}],
 [10.6,{x:-.65,y:-2,z:0,rx:.15,ry:8.2,rz:0,scale:.7,opacity:0,rainbow:.05,wire:0}],
 [11.2,{x:-1.25,y:0,z:0,rx:0,ry:6.38,rz:0,scale:.68,opacity:1,rainbow:.05,wire:0}],
 [12,{x:-1.7,y:0,z:0,rx:0,ry:6.283,rz:0,scale:.6,opacity:1,rainbow:0,wire:1}],
 [12.8,{x:-1.7,y:0,z:0,rx:0,ry:6.283,rz:0,scale:.6,opacity:0,rainbow:0,wire:1}],
 [14,{x:-1.7,y:0,z:0,rx:0,ry:6.283,rz:0,scale:.6,opacity:0,rainbow:0,wire:1}],
];
export function poseAt(s:number):Pose{let index=0;while(index<keyframes.length-2&&s>keyframes[index+1][0])index++;const [a,A]=keyframes[index],[b,B]=keyframes[index+1];const t=smooth(range(s,a,b));return Object.fromEntries(Object.keys(A).map(k=>[k,lerp(A[k as keyof Pose],B[k as keyof Pose],t)])) as Pose;}
export const motionState={s:0,pointerX:0,pointerY:0,drag:0,material:"iridescent",reduced:false};
