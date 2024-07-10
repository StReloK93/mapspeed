import{M as f,aM as p,aK as m,ax as _,aC as g,u as x,I as u,bx as w,v as a,bz as h,bo as v,aR as D,aE as k}from"./app-feea65f6.js";import{h as l,L as b,W as y,_ as z}from"./Leaflet-d3a47846.js";const M={class:"fixed inset-0"},C=a("i",{class:"fa-sharp fa-light fa-xmark"},null,-1),L={class:"absolute bottom-3 left-0 p-2 z-50"},B=f({__name:"WaterTruck",setup(I){const s=p(),e=m({currentDate:l().format("YYYY-MM-DD"),wialon:null,geozones:null,leaflet:null,selected:null,loading:!1}),d=setInterval(()=>{r(e.currentDate)},1e4);async function r(n){e.loading=!0;const t=l(n).add(-10,"hours").unix(),o=l(n).unix();await e.wialon.waterTruckReport(t,o),e.loading=!1}async function i(){r(e.currentDate)}return _(async()=>{e.leaflet=new b(s.value),e.wialon=new y(e.leaflet.map),e.wialon.onInit=()=>i()}),g(()=>{clearInterval(d)}),(n,t)=>{const o=D("RouterLink");return k(),x("section",M,[u(z,{loading:e.loading},null,8,["loading"]),u(o,{to:"/",class:"absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center"},{default:w(()=>[C]),_:1}),a("div",L,[h(a("input",{type:"date","onUpdate:modelValue":t[0]||(t[0]=c=>e.currentDate=c),onChange:t[1]||(t[1]=c=>i()),class:"px-4 py-1.5 rounded-full"},null,544),[[v,e.currentDate]])]),a("div",{ref_key:"geozonemap",ref:s,class:"h-full w-full z-40"},null,512)])}}});export{B as default};
