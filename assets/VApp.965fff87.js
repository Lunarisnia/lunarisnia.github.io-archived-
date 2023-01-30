import{p as U,i as k,g as ae,b as Z,r as C,e as se,f as le,h as c,j as ue,k as L,l as z,m as D,n as F,q as ie,s as re,t as X,a as V,d as ce,u as ve,o as de,c as pe,w as me,v as fe,x as ye,y as ge}from"./index.21b2d680.js";import{m as he,u as W}from"./tag.8761ae63.js";import{u as be}from"./resizeObserver.e9e5a27c.js";const B=Symbol.for("vuetify:layout"),Y=Symbol.for("vuetify:layout-item"),K=1e3,Ie=U({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Ce=U({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function xe(){const e=k(B);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Be(e){var v;const u=k(B);if(!u)throw new Error("[Vuetify] Could not find injected layout");const n=(v=e.id)!=null?v:`layout-item-${ae()}`,l=Z("useLayoutItem");F(Y,{id:n});const a=C(!1);se(()=>a.value=!0),le(()=>a.value=!1);const{layoutItemStyles:i,layoutItemScrimStyles:r}=u.register(l,{...e,active:c(()=>a.value?!1:e.active.value),id:n});return ue(()=>u.unregister(n)),{layoutItemStyles:i,layoutRect:u.layoutRect,layoutItemScrimStyles:r}}const Se=(e,u,n,l)=>{let a={top:0,left:0,right:0,bottom:0};const i=[{id:"",layer:{...a}}];for(const r of e){const v=u.get(r),y=n.get(r),b=l.get(r);if(!v||!y||!b)continue;const g={...a,[v.value]:parseInt(a[v.value],10)+(b.value?parseInt(y.value,10):0)};i.push({id:r,layer:g}),a=g}return i};function we(e){const u=k(B,null),n=c(()=>u?u.rootZIndex.value-100:K),l=C([]),a=L(new Map),i=L(new Map),r=L(new Map),v=L(new Map),y=L(new Map),{resizeRef:b,contentRect:g}=be(),G=c(()=>{var t;const o=new Map,d=(t=e.overlaps)!=null?t:[];for(const f of d.filter(s=>s.includes(":"))){const[s,p]=f.split(":");if(!l.value.includes(s)||!l.value.includes(p))continue;const h=a.get(s),w=a.get(p),_=i.get(s),R=i.get(p);!h||!w||!_||!R||(o.set(p,{position:h.value,amount:parseInt(_.value,10)}),o.set(s,{position:w.value,amount:-parseInt(R.value,10)}))}return o}),I=c(()=>{const o=[...new Set([...r.values()].map(t=>t.value))].sort((t,f)=>t-f),d=[];for(const t of o){const f=l.value.filter(s=>{var p;return((p=r.get(s))==null?void 0:p.value)===t});d.push(...f)}return Se(d,a,i,v)}),O=c(()=>!Array.from(y.values()).some(o=>o.value)),x=c(()=>I.value[I.value.length-1].layer),J=c(()=>({"--v-layout-left":z(x.value.left),"--v-layout-right":z(x.value.right),"--v-layout-top":z(x.value.top),"--v-layout-bottom":z(x.value.bottom),...O.value?void 0:{transition:"none"}})),S=c(()=>I.value.slice(1).map((o,d)=>{let{id:t}=o;const{layer:f}=I.value[d],s=i.get(t),p=a.get(t);return{id:t,...f,size:Number(s.value),position:p.value}})),T=o=>S.value.find(d=>d.id===o),E=Z("createLayout"),H=C(!1);D(()=>{H.value=!0}),F(B,{register:(o,d)=>{let{id:t,order:f,position:s,layoutSize:p,elementSize:h,active:w,disableTransitions:_,absolute:R}=d;r.set(t,f),a.set(t,s),i.set(t,p),v.set(t,w),_&&y.set(t,_);const j=ie(Y,E==null?void 0:E.vnode).indexOf(o);j>-1?l.value.splice(j,0,t):l.value.push(t);const N=c(()=>S.value.findIndex($=>$.id===t)),M=c(()=>n.value+I.value.length*2-N.value*2),te=c(()=>{const $=s.value==="left"||s.value==="right",A=s.value==="right",ne=s.value==="bottom",q={[s.value]:0,zIndex:M.value,transform:`translate${$?"X":"Y"}(${(w.value?0:-110)*(A||ne?-1:1)}%)`,position:R.value||n.value!==K?"absolute":"fixed",...O.value?void 0:{transition:"none"}};if(!H.value)return q;const m=S.value[N.value];if(!m)throw new Error(`[Vuetify] Could not find layout item "${t}"`);const P=G.value.get(t);return P&&(m[P.position]+=P.amount),{...q,height:$?`calc(100% - ${m.top}px - ${m.bottom}px)`:h.value?`${h.value}px`:void 0,left:A?void 0:`${m.left}px`,right:A?`${m.right}px`:void 0,top:s.value!=="bottom"?`${m.top}px`:void 0,bottom:s.value!=="top"?`${m.bottom}px`:void 0,width:$?h.value?`${h.value}px`:void 0:`calc(100% - ${m.left}px - ${m.right}px)`}}),oe=c(()=>({zIndex:M.value-1}));return{layoutItemStyles:te,layoutItemScrimStyles:oe,zIndex:M}},unregister:o=>{r.delete(o),a.delete(o),i.delete(o),v.delete(o),y.delete(o),l.value=l.value.filter(d=>d!==o)},mainRect:x,mainStyles:J,getLayoutItem:T,items:S,layoutRect:g,rootZIndex:n});const Q=c(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),ee=c(()=>({zIndex:n.value,position:u?"relative":void 0,overflow:u?"hidden":void 0}));return{layoutClasses:Q,layoutStyles:ee,getLayoutItem:T,items:S,layoutRect:g,layoutRef:b}}function _e(){const e=C(!1);return D(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:c(()=>e.value?void 0:{transition:"none !important"}),isBooted:re(e)}}const $e=X({name:"VMain",props:{scrollable:Boolean,...he({tag:"main"})},setup(e,u){let{slots:n}=u;const{mainStyles:l}=xe(),{ssrBootStyles:a}=_e();return W(()=>{var i,r;return V(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable}],style:[l.value,a.value]},{default:()=>[e.scrollable?V("div",{class:"v-main__scroller"},[(i=n.default)==null?void 0:i.call(n)]):(r=n.default)==null?void 0:r.call(n)]})}),{}}}),Me=ce({__name:"View",setup(e){return(u,n)=>{const l=ve("router-view");return de(),pe($e,null,{default:me(()=>[V(l)]),_:1})}}});const Ae=X({name:"VApp",props:{...Ie({fullHeight:!0}),...fe()},setup(e,u){let{slots:n}=u;const l=ye(e),{layoutClasses:a,layoutStyles:i,getLayoutItem:r,items:v,layoutRef:y}=we(e),{rtlClasses:b}=ge();return W(()=>{var g;return V("div",{ref:y,class:["v-application",l.themeClasses.value,a.value,b.value],style:i.value},[V("div",{class:"v-application__wrap"},[(g=n.default)==null?void 0:g.call(n)])])}),{getLayoutItem:r,items:v,theme:l}}});export{Ae as V,Me as _,Ce as m,Be as u};
