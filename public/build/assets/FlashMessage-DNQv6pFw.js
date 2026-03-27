import{c as t}from"./createLucideIcon-BAfukqln.js";import{r as o,j as r}from"./app-B58nJbiU.js";import{c as x}from"./clsx-B-dksMZM.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],y=t("CircleCheckBig",p);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],u=t("CircleX",m);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],v=t("Menu",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],l=t("TriangleAlert",b);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],j=t("X",g),N={success:r.jsx(y,{size:20,className:"text-accent-400 flex-shrink-0"}),error:r.jsx(u,{size:20,className:"text-brand-500 flex-shrink-0"}),warning:r.jsx(l,{size:20,className:"text-brand-400 flex-shrink-0"})},_={success:"bg-[#0a2e2f] border-accent-500/20 text-accent-300",error:"bg-[#0a2e2f] border-brand-500/20 text-brand-300",warning:"bg-[#0a2e2f] border-brand-400/20 text-brand-300"};function w({flash:e,className:i=""}){const[a,n]=o.useState(!0),s=e!=null&&e.success?"success":e!=null&&e.error?"error":"warning",c=(e==null?void 0:e.success)||(e==null?void 0:e.error)||(e==null?void 0:e.warning);return o.useEffect(()=>{const d=setTimeout(()=>n(!1),5e3);return()=>clearTimeout(d)},[c]),!a||!c?null:r.jsxs("div",{className:x("flex items-center gap-3 px-4 py-3 rounded-lg border text-sm",_[s],i),children:[N[s],r.jsx("span",{className:"flex-1",children:c}),r.jsx("button",{onClick:()=>n(!1),className:"p-0.5 rounded hover:opacity-70",children:r.jsx(j,{size:16})})]})}export{w as F,v as M,j as X};
