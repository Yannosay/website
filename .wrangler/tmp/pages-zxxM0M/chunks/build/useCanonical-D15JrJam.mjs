import{W as a,V as s,X as n}from"./server.mjs";function useCanonical(r){const e=n(),i=a(),t=String(e.public.siteUrl||"").replace(/\/$/,""),c=r??i.path,l=`${t}${c.startsWith("/")?c:`/${c}`}`;s({link:[{rel:"canonical",href:l}]})}export{useCanonical as u};
//# sourceMappingURL=useCanonical-D15JrJam.mjs.map
