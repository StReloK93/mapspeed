import{d as z,A,e as p,B as Y,C as W,r as N,D as I,h as F,o as f,c as g,a,t as M,u as r,b as u,n as C,y as h,m as E,g as T,p as S,w as D,k as j,E as B,f as q,v as H}from"./app-69807878.js";import{h as y,W as V}from"./Wialon-41b96dde.js";import{g as U,a as J,b as K}from"./TimezoneDate-89cbf7c4.js";import{D as L,a as m,o as P,b as G}from"./data-grid-cfbe1ba9.js";import{L as O,_ as Q}from"./PreLoader.vue_vue_type_script_setup_true_lang-0c037218.js";import"./_commonjsHelpers-de833af9.js";const X={class:"relative"},Z={key:0},ee={key:1},te={key:0,class:"absolute inset-0 bg-black/40 z-50 flex justify-center items-center"},ae={class:"bg-white p-4 text-center rounded"},oe=a("h3",{class:"mb-4 font-semibold"},"Выберите смену",-1),ne=a("span",{class:"mr-4"},null,-1),R=z({__name:"PeriodPicker",props:{day:{},dayModifiers:{},smena:{},smenaModifiers:{}},emits:A(["submit"],["update:day","update:smena"]),setup($,{emit:b}){const c=b,v=p(!1),d=p(null),n=p(null),x=Y($,"day"),_=Y($,"smena"),i=p([{start:new Date(new Date().getTime()+24*60*60*1e3),end:null}]);function t(){d.value=null,n.value=null}const s=p([{key:"today",highlight:!0,dates:x}]);return W(()=>n.value,()=>{d.value==null||n.value==null||(x.value=d.value,_.value=n.value,v.value=!1,c("submit"))}),(e,l)=>{const o=N("VDatePicker"),k=I("click-outside");return F((f(),g("main",X,[a("button",{onClick:l[0]||(l[0]=w=>v.value=!0),class:"px-4 py-1.5 bg-slate-900 text-white rounded shadow-md"},[x.value==null&&_.value==null?(f(),g("span",Z," Выберите Дату ")):(f(),g("span",ee,M(r(y)(x.value).format("YYYY-MM-DD"))+" СМЕНА : "+M(_.value),1))]),v.value?(f(),g("div",{key:0,onVnodeMounted:t,class:"absolute bg-white z-50 top-11 left-0"},[u(o,{modelValue:d.value,"onUpdate:modelValue":l[1]||(l[1]=w=>d.value=w),mode:"date",attributes:s.value,"disabled-dates":i.value},null,8,["modelValue","attributes","disabled-dates"]),d.value?(f(),g("main",te,[a("aside",ae,[oe,a("button",{class:C([{"bg-slate-900 !text-white":n.value==1},"bg-gray-200 text-black w-10 h-10 rounded shadow-sm"]),onClick:l[2]||(l[2]=w=>n.value=1)},"1",2),ne,a("button",{class:C([{"bg-slate-900 !text-white":n.value==2},"bg-gray-200 text-black w-10 h-10 rounded shadow-sm"]),onClick:l[3]||(l[3]=w=>n.value=2)},"2",2)])])):h("",!0)],512)):h("",!0)])),[[k,()=>v.value=!1]])}}}),se={class:"flex justify-end items-center px-2 bg-slate-900 text-white"},le=a("i",{class:"fa-regular fa-xmark"},null,-1),ie=[le],re={class:"flex-grow relative"},ue={class:"absolute inset-0 overflow-y-auto"},de={class:"flex pt-2 px-2 items-start"},ce={key:0,style:{color:"red"}},ve={key:1,style:{color:"green"}},me={class:"absolute bottom-0 w-full bg-gray-100 px-2 py-1.5 text-xl uppercase"},_e=a("br",null,null,-1),pe=z({__name:"GrayderModal",setup($){const b=p(),c=p([]),v=p(null),d=p(null);b.value=new V;const n=U();v.value=n.date,d.value=n.smena;async function x(){c.value=[];const t=y(v.value).format("YYYY-MM-DD"),s=d.value==1?{start:"08:30",end:"09:40"}:{start:"20:30",end:"21:40"},e=await b.value.greyderTable(10587,y(`${t} ${s.start}`).unix(),y(`${t} ${s.end}`).unix());for(const o in e){const k=[...e[o].counts];var l="";k.forEach(w=>{l+=`${w.replace("РВ Экскаватор","")} `}),c.value.push({name:o,in_excavator:(e[o].time_in_excavator/60).toFixed(1),counts:e[o].counts.size,excavator_names:l,active:e[o].in_not_excavator_move==0&&e[o].in_not_excavator_stop==0&&e[o].time_in_excavator==0,in_smena:d.value==1?"08:30 - 09:40 | 70 мин":"20:30 - 21:40 | 70 мин",in_not_excavator_move:(e[o].in_not_excavator_move/60).toFixed(1),in_not_excavator_stop:(e[o].in_not_excavator_stop/60).toFixed(1),excavator_move:e[o].in_not_excavator_move,excavator_stop:e[o].in_not_excavator_stop,excalibur:e[o].time_in_excavator})}}const _=E(()=>{console.log(c.value);const t=c.value.reduce((e,l)=>l.active==!1?e+=1:e,0),s=c.value.reduce((e,l)=>l.count!=0?e+=l.counts:e,0);return(s+t==0?0:s/t).toFixed(1)}),i=E(()=>{const s=c.value.reduce((l,o)=>o.active==!1?l+=1:l,0)*70*60,e=c.value.reduce((l,o)=>o.excavator_stop!=0?l+=o.excavator_stop:l,0);return isNaN(e/s)?0:Math.round(e/s*100)});return T(()=>{x()}),(t,s)=>(f(),g("section",{onMouseup:s[4]||(s[4]=e=>t.$emit("close")),class:"absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10"},[a("main",{onMouseup:s[3]||(s[3]=B(()=>{},["stop"])),class:"bg-white w-full h-full rounded-md flex flex-col overflow-hidden relative"},[a("header",se,[a("div",null,[a("button",{onClick:s[0]||(s[0]=e=>t.$emit("close")),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},ie)])]),a("main",re,[a("div",ue,[a("div",de,[u(R,{day:v.value,"onUpdate:day":s[1]||(s[1]=e=>v.value=e),smena:d.value,"onUpdate:smena":s[2]||(s[2]=e=>d.value=e),onSubmit:x},null,8,["day","smena"])]),c.value.length?(f(),S(r(G),{key:0,"data-source":c.value,onExporting:r(P)},{"grid-cell":D(({data:e})=>[e.data.active?(f(),g("div",ce,"В ремонте")):(f(),g("div",ve,"В работе"))]),default:D(()=>[u(r(L),{enabled:!0,"allow-export-selected-data":!0}),u(r(m),{"data-field":"name",caption:"Техника",width:"120"}),u(r(m),{"data-field":"active",caption:"Статус","cell-template":"grid-cell"}),u(r(m),{"data-field":"counts",caption:"Кол-во зачищенных забоев",width:"200"}),u(r(m),{"data-field":"excavator_names",caption:"Экскаватор",width:"130"}),u(r(m),{"data-field":"in_smena",caption:"Доступное время в пересменку ЭКС",width:"260"}),u(r(m),{"data-field":"in_excavator",caption:"Время в геозоне ЭКС (мин)"}),u(r(m),{"data-field":"in_not_excavator_move",caption:"Вне геозоны ЭКС, в движении (мин)"}),u(r(m),{"data-field":"in_not_excavator_stop",caption:"Вне геозоны ЭКС, без движении (мин)"})]),_:1},8,["data-source","onExporting"])):h("",!0)]),a("div",me,[j(" количество зачищенных забоев на 1 ед. работающей техники - "+M(_.value)+" ",1),_e,j(" Вне геозоны ЭКС, без движении % от доступного времени - "+M(i.value)+"% ",1)])])],32)],32))}}),fe={class:"flex justify-end items-center px-2 bg-slate-900 text-white"},xe=a("i",{class:"fa-regular fa-xmark"},null,-1),ge=[xe],be={class:"flex-grow relative"},ye={class:"absolute inset-0 overflow-y-auto"},we={class:"flex pt-2 px-2 items-start"},he={key:0,style:{color:"red"}},$e={key:1,style:{color:"green"}},ke=z({__name:"GrayderModalSmena",setup($){const b=p(),c=p([]),v=p(null),d=p(null);b.value=new V;const n=U();v.value=n.date,d.value=n.smena;async function x(){c.value=[];const _=y(v.value).format("YYYY-MM-DD"),i=d.value==1?{start:"08:30",end:"20:30"}:{start:"20:30",end:"08:30"},t=y(`${_} ${i.start}`).unix(),s=d.value==2?y(`${_} ${i.end}`).add(1,"days").unix():y(`${_} ${i.end}`).unix(),e=await b.value.greyderTable(10587,t,s);for(const o in e){const k=[...e[o].counts];var l="";k.forEach(w=>{l+=`${w.replace("РВ Экскаватор","")} `}),c.value.push({name:o,in_excavator:(e[o].time_in_excavator/60).toFixed(1),counts:e[o].counts.size,excavator_names:l,active:e[o].in_not_excavator_move==0&&e[o].in_not_excavator_stop==0&&e[o].time_in_excavator==0,in_smena:d.value==1?"08:30 - 20:30 | 720 мин":"20:30 - 08:30 | 720 мин",in_not_excavator_move:(e[o].in_not_excavator_move/60).toFixed(1),in_not_excavator_stop:(e[o].in_not_excavator_stop/60).toFixed(1),excavator_move:e[o].in_not_excavator_move,excavator_stop:Math.round(e[o].in_not_excavator_stop/(10*60*60)*100)+"%"})}}return T(()=>{x()}),(_,i)=>(f(),g("section",{onMouseup:i[4]||(i[4]=t=>_.$emit("close")),class:"absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10"},[a("main",{onMouseup:i[3]||(i[3]=B(()=>{},["stop"])),class:"bg-white w-full h-full rounded-md flex flex-col overflow-hidden relative"},[a("header",fe,[a("div",null,[a("button",{onClick:i[0]||(i[0]=t=>_.$emit("close")),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},ge)])]),a("main",be,[a("div",ye,[a("div",we,[u(R,{day:v.value,"onUpdate:day":i[1]||(i[1]=t=>v.value=t),smena:d.value,"onUpdate:smena":i[2]||(i[2]=t=>d.value=t),onSubmit:x},null,8,["day","smena"])]),c.value.length?(f(),S(r(G),{key:0,"data-source":c.value,onExporting:r(P)},{"grid-cell":D(({data:t})=>[t.data.active?(f(),g("div",he,"В ремонте")):(f(),g("div",$e,"В работе"))]),default:D(()=>[u(r(L),{enabled:!0,"allow-export-selected-data":!0}),u(r(m),{"data-field":"name",caption:"Техника",width:"100"}),u(r(m),{"data-field":"active",caption:"Статус","cell-template":"grid-cell",width:"100"}),u(r(m),{"data-field":"counts",caption:"Кол-во зачищенных забоев",width:"200"}),u(r(m),{"data-field":"excavator_names",caption:"Экскаватор"}),u(r(m),{"data-field":"in_smena",caption:"Доступное время в пересменку ЭКС",width:"260"}),u(r(m),{"data-field":"in_excavator",caption:"Время в геозоне ЭКС (мин)"}),u(r(m),{"data-field":"in_not_excavator_move",caption:"Вне геозоны ЭКС, в движении (мин)"}),u(r(m),{"data-field":"in_not_excavator_stop",caption:"Вне геозоны ЭКС, без движении (мин)"}),u(r(m),{"data-field":"excavator_stop",caption:"Время в движении, % от доступного времени"})]),_:1},8,["data-source","onExporting"])):h("",!0)])])],32)],32))}}),De={class:"fixed inset-0"},Me=a("i",{class:"fa-duotone fa-house"},null,-1),Ce={class:"absolute bottom-3 left-0 p-2 z-50"},je=z({__name:"GreydersPage",setup($){const b=p(),c=p(!1),v=p(!1),d=J(y()),n=q({currentDate:d.date,wialon:null,geozones:null,leaflet:null,selected:null,loading:!1,smena:d.smena});function x(i){n.smena=i,_()}async function _(){n.loading=!0;const i=K(n.currentDate,n.smena),t=i.start,s=i.end;await n.wialon.greyderReport(t,s),n.loading=!1}return T(async()=>{n.leaflet=new O(b.value),n.wialon=new V(n.leaflet.map),n.wialon.onInit=()=>_()}),(i,t)=>{const s=N("RouterLink");return f(),g("section",De,[u(Q,{loading:n.loading},null,8,["loading"]),c.value?(f(),S(pe,{key:0,onClose:t[0]||(t[0]=e=>c.value=!1)})):h("",!0),v.value?(f(),S(ke,{key:1,onClose:t[1]||(t[1]=e=>v.value=!1)})):h("",!0),u(s,{to:"/",class:"absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center"},{default:D(()=>[Me]),_:1}),a("div",Ce,[F(a("input",{type:"date","onUpdate:modelValue":t[2]||(t[2]=e=>n.currentDate=e),onChange:_,class:"px-4 py-1.5 rounded-full shadow-sm"},null,544),[[H,n.currentDate]]),a("button",{class:C([{"!bg-teal-600 !text-white":n.smena==1},"bg-white px-4 ml-2 py-1.5 rounded-full"]),onClick:t[3]||(t[3]=e=>x(1))},"1 Smena",2),a("button",{class:C([{"!bg-teal-600 !text-white":n.smena==2},"bg-white px-4 ml-2 py-1.5 rounded-full"]),onClick:t[4]||(t[4]=e=>x(2))},"2 Smena",2),a("button",{onClick:t[5]||(t[5]=e=>c.value=!0),class:"bg-white px-4 ml-2 py-1.5 rounded-full"},"Контроль зачистки забоя в пересменку"),a("button",{onClick:t[6]||(t[6]=e=>v.value=!0),class:"bg-white px-4 ml-2 py-1.5 rounded-full"},"Контроль зачистки забоя во время смены")]),a("div",{ref_key:"geozonemap",ref:b,class:"h-full w-full z-40"},null,512)])}}});export{je as default};