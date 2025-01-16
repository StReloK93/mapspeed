import{d as z,A as I,e as p,B as N,C as q,r as F,D as H,h as B,o as x,c as b,a as n,t as D,u as i,b as r,n as S,y as $,m as V,g as Y,p as T,w as M,k as j,E as P,f as J,v as K}from"./app-69148bdb.js";import{h as w,W as E}from"./Wialon-065a674b.js";import{g as U,a as O,b as Q}from"./TimezoneDate-36149338.js";import{D as L,a as _,o as G,b as R}from"./data-grid-4a535ed4.js";import{L as X,_ as Z}from"./PreLoader.vue_vue_type_script_setup_true_lang-cb99aa70.js";import"./_commonjsHelpers-de833af9.js";const ee={class:"relative"},te={key:0},ae={key:1},oe={key:0,class:"absolute inset-0 bg-black/40 z-50 flex justify-center items-center"},ne={class:"bg-white p-4 text-center rounded"},se=n("h3",{class:"mb-4 font-semibold"},"Выберите смену",-1),le=n("span",{class:"mr-4"},null,-1),A=z({__name:"PeriodPicker",props:{day:{},dayModifiers:{},smena:{},smenaModifiers:{}},emits:I(["submit"],["update:day","update:smena"]),setup(k,{emit:y}){const u=y,c=p(!1),d=p(null),s=p(null),f=N(k,"day"),g=N(k,"smena"),v=p([{start:new Date(new Date().getTime()+24*60*60*1e3),end:null}]);function e(){d.value=null,s.value=null}const o=p([{key:"today",highlight:!0,dates:f}]);return q(()=>s.value,()=>{d.value==null||s.value==null||(f.value=d.value,g.value=s.value,c.value=!1,u("submit"))}),(a,t)=>{const l=F("VDatePicker"),m=H("click-outside");return B((x(),b("main",ee,[n("button",{onClick:t[0]||(t[0]=h=>c.value=!0),class:"px-4 py-1.5 bg-slate-900 text-white rounded shadow-md"},[f.value==null&&g.value==null?(x(),b("span",te," Выберите Дату ")):(x(),b("span",ae,D(i(w)(f.value).format("YYYY-MM-DD"))+" СМЕНА : "+D(g.value),1))]),c.value?(x(),b("div",{key:0,onVnodeMounted:e,class:"absolute bg-white z-50 top-11 left-0"},[r(l,{modelValue:d.value,"onUpdate:modelValue":t[1]||(t[1]=h=>d.value=h),mode:"date",attributes:o.value,"disabled-dates":v.value},null,8,["modelValue","attributes","disabled-dates"]),d.value?(x(),b("main",oe,[n("aside",ne,[se,n("button",{class:S([{"bg-slate-900 !text-white":s.value==1},"bg-gray-200 text-black w-10 h-10 rounded shadow-sm"]),onClick:t[2]||(t[2]=h=>s.value=1)},"1",2),le,n("button",{class:S([{"bg-slate-900 !text-white":s.value==2},"bg-gray-200 text-black w-10 h-10 rounded shadow-sm"]),onClick:t[3]||(t[3]=h=>s.value=2)},"2",2)])])):$("",!0)],512)):$("",!0)])),[[m,()=>c.value=!1]])}}}),ie={class:"flex justify-end items-center px-2 bg-slate-900 text-white"},re=n("i",{class:"fa-regular fa-xmark"},null,-1),ue=[re],de={class:"flex-grow relative"},ce={class:"absolute inset-0 overflow-y-auto"},ve={class:"flex pt-2 px-2 items-start"},me={key:0,style:{color:"red"}},_e={key:1,style:{color:"green"}},pe={class:"absolute bottom-0 w-full bg-gray-100 px-2 py-1.5 text-xl uppercase"},xe=n("br",null,null,-1),fe=z({__name:"GrayderModal",setup(k){const y=p(),u=p([]),c=p(null),d=p(null);y.value=new E;const s=U();c.value=s.date,d.value=s.smena;async function f(){u.value=[];const e=w(c.value).format("YYYY-MM-DD"),o=d.value==1?{start:"08:30",end:"09:40"}:{start:"20:30",end:"21:40"},a=await y.value.greyderTable(10587,w(`${e} ${o.start}`).unix(),w(`${e} ${o.end}`).unix());for(const l in a){const m=[...a[l].counts];var t="";m.forEach(h=>{t+=`${h.replace("РВ Экскаватор","")} `}),u.value.push({name:l,in_excavator:(a[l].time_in_excavator/60).toFixed(1),counts:a[l].counts.size,excavator_names:t,active:a[l].in_not_excavator_move==0&&a[l].in_not_excavator_stop==0&&a[l].time_in_excavator==0,in_smena:d.value==1?"08:30 - 09:40 | 70 мин":"20:30 - 21:40 | 70 мин",in_not_excavator_move:(a[l].in_not_excavator_move/60).toFixed(1),in_not_excavator_stop:(a[l].in_not_excavator_stop/60).toFixed(1),excavator_move:a[l].in_not_excavator_move,excavator_stop:a[l].in_not_excavator_stop,excalibur:a[l].time_in_excavator})}}const g=V(()=>{const e=u.value.reduce((a,t)=>t.active==!1?a+=1:a,0),o=u.value.reduce((a,t)=>t.count!=0?a+=t.counts:a,0);return(o+e==0?0:o/e).toFixed(1)}),v=V(()=>{const o=u.value.reduce((t,l)=>l.active==!1?t+=1:t,0)*70*60,a=u.value.reduce((t,l)=>l.excavator_stop!=0?t+=l.excavator_stop:t,0);return isNaN(a/o)?0:Math.round(a/o*100)});return Y(()=>{f()}),(e,o)=>(x(),b("section",{onMouseup:o[4]||(o[4]=a=>e.$emit("close")),class:"absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10"},[n("main",{onMouseup:o[3]||(o[3]=P(()=>{},["stop"])),class:"bg-white w-full h-full rounded-md flex flex-col overflow-hidden relative"},[n("header",ie,[n("div",null,[n("button",{onClick:o[0]||(o[0]=a=>e.$emit("close")),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},ue)])]),n("main",de,[n("div",ce,[n("div",ve,[r(A,{day:c.value,"onUpdate:day":o[1]||(o[1]=a=>c.value=a),smena:d.value,"onUpdate:smena":o[2]||(o[2]=a=>d.value=a),onSubmit:f},null,8,["day","smena"])]),u.value.length?(x(),T(i(R),{key:0,"data-source":u.value,onExporting:i(G)},{"grid-cell":M(({data:a})=>[a.data.active?(x(),b("div",me,"В ремонте")):(x(),b("div",_e,"В работе"))]),default:M(()=>[r(i(L),{enabled:!0,"allow-export-selected-data":!0}),r(i(_),{"data-field":"name",caption:"Техника",width:"120"}),r(i(_),{"data-field":"active",caption:"Статус","cell-template":"grid-cell"}),r(i(_),{"data-field":"counts",caption:"Кол-во зачищенных забоев",width:"200"}),r(i(_),{"data-field":"excavator_names",caption:"Экскаватор",width:"130"}),r(i(_),{"data-field":"in_smena",caption:"Доступное время в пересменку ЭКС",width:"260"}),r(i(_),{"data-field":"in_excavator",caption:"Время в геозоне ЭКС (мин)"}),r(i(_),{"data-field":"in_not_excavator_move",caption:"Вне геозоны ЭКС, в движении (мин)"}),r(i(_),{"data-field":"in_not_excavator_stop",caption:"Вне геозоны ЭКС, без движении (мин)"})]),_:1},8,["data-source","onExporting"])):$("",!0)]),n("div",pe,[j(" количество зачищенных забоев на 1 ед. работающей техники - "+D(g.value)+" ",1),xe,j(" Вне геозоны ЭКС, без движении % от доступного времени - "+D(v.value)+"% ",1)])])],32)],32))}}),be={class:"flex justify-end items-center px-2 bg-slate-900 text-white"},ge=n("i",{class:"fa-regular fa-xmark"},null,-1),ye=[ge],we={class:"flex-grow relative"},he={class:"absolute inset-0 overflow-y-auto"},$e={class:"flex pt-2 px-2 items-start"},ke={key:0,style:{color:"red"}},De={key:1,style:{color:"green"}},Me={class:"absolute bottom-0 w-full bg-gray-100 px-2 py-1.5 text-xl uppercase"},C=660,Ce=z({__name:"GrayderModalSmena",setup(k){const y=p(),u=p([]),c=p(null),d=p(null);y.value=new E;const s=U();c.value=s.date,d.value=s.smena;async function f(){u.value=[];const v=w(c.value).format("YYYY-MM-DD"),e=d.value==1?{start:"08:30",end:"20:30"}:{start:"20:30",end:"08:30"},o=w(`${v} ${e.start}`).unix(),a=d.value==2?w(`${v} ${e.end}`).add(1,"days").unix():w(`${v} ${e.end}`).unix(),t=await y.value.greyderTable(10587,o,a);for(const m in t){const h=[...t[m].counts];var l="";h.forEach(W=>{l+=`${W.replace("РВ Экскаватор","")} `}),u.value.push({name:m,in_excavator:(t[m].time_in_excavator/60).toFixed(1),counts:t[m].counts.size,excavator_names:l,active:t[m].in_not_excavator_move==0&&t[m].in_not_excavator_stop==0&&t[m].time_in_excavator==0,in_smena:d.value==1?`08:30 - 20:30 | ${C} мин`:`20:30 - 08:30 | ${C} мин`,in_not_excavator_move:(t[m].in_not_excavator_move/60).toFixed(1),in_not_excavator_stop:(t[m].in_not_excavator_stop/60).toFixed(1),excavator_stop:Math.round((t[m].time_in_excavator+t[m].in_not_excavator_move)/(C*60)*100)+"%",excavator_move:t[m].in_not_excavator_move,time_in_excavator:t[m].time_in_excavator})}}const g=V(()=>{const v=u.value.reduce((t,l)=>l.active==!1?t+=1:t,0),e=u.value.reduce((t,l)=>l.time_in_excavator!=0?t+=l.time_in_excavator:t,0),o=u.value.reduce((t,l)=>l.excavator_move!=0?t+=l.excavator_move:t,0),a=v*C*60;return console.log(e,o,a),isNaN((e+o)/a*100)?0:Math.round((e+o)/a*100)});return Y(()=>{f()}),(v,e)=>(x(),b("section",{onMouseup:e[4]||(e[4]=o=>v.$emit("close")),class:"absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10"},[n("main",{onMouseup:e[3]||(e[3]=P(()=>{},["stop"])),class:"bg-white w-full h-full rounded-md flex flex-col overflow-hidden relative"},[n("header",be,[n("div",null,[n("button",{onClick:e[0]||(e[0]=o=>v.$emit("close")),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},ye)])]),n("main",we,[n("div",he,[n("div",$e,[r(A,{day:c.value,"onUpdate:day":e[1]||(e[1]=o=>c.value=o),smena:d.value,"onUpdate:smena":e[2]||(e[2]=o=>d.value=o),onSubmit:f},null,8,["day","smena"])]),u.value.length?(x(),T(i(R),{key:0,"data-source":u.value,onExporting:i(G)},{"grid-cell":M(({data:o})=>[o.data.active?(x(),b("div",ke,"В ремонте")):(x(),b("div",De,"В работе"))]),default:M(()=>[r(i(L),{enabled:!0,"allow-export-selected-data":!0}),r(i(_),{"data-field":"name",caption:"Техника",width:"100"}),r(i(_),{"data-field":"active",caption:"Статус","cell-template":"grid-cell",width:"100"}),r(i(_),{"data-field":"counts",caption:"Кол-во зачищенных забоев",width:"200"}),r(i(_),{"data-field":"excavator_names",caption:"Экскаватор"}),r(i(_),{"data-field":"in_smena",caption:"Доступное время в пересменку ЭКС",width:"260"}),r(i(_),{"data-field":"in_excavator",caption:"Время в геозоне ЭКС (мин)"}),r(i(_),{"data-field":"in_not_excavator_move",caption:"Вне геозоны ЭКС, в движении (мин)"}),r(i(_),{"data-field":"in_not_excavator_stop",caption:"Вне геозоны ЭКС, без движении (мин)"}),r(i(_),{"data-field":"excavator_stop",caption:"Время в движении, % от доступного времени"})]),_:1},8,["data-source","onExporting"])):$("",!0)])]),n("div",Me," Время в движении, % от доступного времени: "+D(g.value+"%"),1)],32)],32))}}),Se={class:"fixed inset-0"},Te=n("i",{class:"fa-duotone fa-house"},null,-1),ze={class:"absolute bottom-3 left-0 p-2 z-50"},Be=z({__name:"GreydersPage",setup(k){const y=p(),u=p(!1),c=p(!1),d=O(w()),s=J({currentDate:d.date,wialon:null,geozones:null,leaflet:null,selected:null,loading:!1,smena:d.smena});function f(v){s.smena=v,g()}async function g(){s.loading=!0;const v=Q(s.currentDate,s.smena),e=v.start,o=v.end;await s.wialon.greyderReport(e,o),s.loading=!1}return Y(async()=>{s.leaflet=new X(y.value),s.wialon=new E(s.leaflet.map),s.wialon.onInit=()=>g()}),(v,e)=>{const o=F("RouterLink");return x(),b("section",Se,[r(Z,{loading:s.loading},null,8,["loading"]),u.value?(x(),T(fe,{key:0,onClose:e[0]||(e[0]=a=>u.value=!1)})):$("",!0),c.value?(x(),T(Ce,{key:1,onClose:e[1]||(e[1]=a=>c.value=!1)})):$("",!0),r(o,{to:"/",class:"absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center"},{default:M(()=>[Te]),_:1}),n("div",ze,[B(n("input",{type:"date","onUpdate:modelValue":e[2]||(e[2]=a=>s.currentDate=a),onChange:g,class:"px-4 py-1.5 rounded-full shadow-sm"},null,544),[[K,s.currentDate]]),n("button",{class:S([{"!bg-teal-600 !text-white":s.smena==1},"bg-white px-4 ml-2 py-1.5 rounded-full"]),onClick:e[3]||(e[3]=a=>f(1))},"1 Smena",2),n("button",{class:S([{"!bg-teal-600 !text-white":s.smena==2},"bg-white px-4 ml-2 py-1.5 rounded-full"]),onClick:e[4]||(e[4]=a=>f(2))},"2 Smena",2),n("button",{onClick:e[5]||(e[5]=a=>u.value=!0),class:"bg-white px-4 ml-2 py-1.5 rounded-full"},"Контроль зачистки забоя в пересменку"),n("button",{onClick:e[6]||(e[6]=a=>c.value=!0),class:"bg-white px-4 ml-2 py-1.5 rounded-full"},"Контроль зачистки забоя во время смены")]),n("div",{ref_key:"geozonemap",ref:y,class:"h-full w-full z-40"},null,512)])}}});export{Be as default};