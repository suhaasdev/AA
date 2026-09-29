import polygonClipping from 'polygon-clipping';
import {writeFileSync} from 'node:fs';
const paths=[[[63,257],[145,49],[156,254],[42,164],[323,164]],[[179,257],[242,49],[283,257]]];
const polys=[];
for(const path of paths){const edges=[];for(let i=0;i<path.length-1;i++){const a=path[i],b=path[i+1],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),n=[-dy/len*6.7,dx/len*6.7];edges.push(n);polys.push([[[a[0]+n[0],a[1]+n[1]],[b[0]+n[0],b[1]+n[1]],[b[0]-n[0],b[1]-n[1]],[a[0]-n[0],a[1]-n[1]],[a[0]+n[0],a[1]+n[1]]]]);}
for(let i=1;i<path.length-1;i++){const p=path[i],a=edges[i-1],b=edges[i];for(const sign of[-1,1])polys.push([[[p[0],p[1]],[p[0]+a[0]*sign,p[1]+a[1]*sign],[p[0]+b[0]*sign,p[1]+b[1]*sign],[p[0],p[1]]]]);}}
const result=polygonClipping.union(...polys);
writeFileSync('app/aa-shape.json',JSON.stringify(result));
console.log('AA silhouette:',result.length,'connected shape(s),',result.reduce((n,p)=>n+p.length-1,0),'openings');
