import{u as w,h as V,W as B}from"./Wialon-d02f08bb.js";import{d as p,o as r,c as i,F as m,i as v,u as f,a as e,n as b,t as g,k as _,b as u,f as A,e as x,g as S,r as M,l as L,m as K,w as z,p as k,q as j,K as G,T as N,h as y,v as F,s as T,x as P,y as U,z as O}from"./app-e9234c57.js";import{_ as I,L as H}from"./PreLoader.vue_vue_type_script_setup_true_lang-052099b1.js";import{d as $,f as D,s as q}from"./TimezoneDate-73bb07cd.js";import{H as R}from"./highcharts-ba9c9956.js";import"./_commonjsHelpers-de833af9.js";const E={class:"flex gap-1.5 flex-wrap flex-col absolute top-1/2 -translate-y-1/2 -left-16"},W=["onClick"],Y=e("i",{class:"fa-duotone fa-gear text-xl"},null,-1),J=[Y],Q=p({__name:"Transports",setup(h){const t=w();function l(n){t.withLoading(()=>t.UIData.wialon.selectGroup(n))}return(n,a)=>(r(),i("main",E,[(r(!0),i(m,null,v(f(t).transport_groups,s=>(r(),i("button",{class:b([{"!bg-slate-900 !text-white":s.id==f(t).UIData.active},"btn-line"]),onClick:o=>l(s)},g(s.name),11,W))),256)),e("button",{class:b([{"!bg-slate-900 !text-white":f(t).openControl},"btn-line"]),onClick:a[0]||(a[0]=s=>f(t).openControl=!0)},J,2)]))}}),X={class:"flex flex-col h-full px-3 -mx-3"},Z=e("h3",{class:"text-indigo-100 py-2 text-center"},[e("i",{class:"fa-solid fa-circle-small scale-50"}),_(" Tezlik tushgan nuqtalar "),e("i",{class:"fa-solid fa-circle-small scale-50"})],-1),ee={class:"w-full flex-grow relative"},te={class:"absolute inset-0 overflow-y-auto flex items-start flex-wrap gap-y-1.5 content-start"},ae=["onClick"],se={class:"w-6 h-full bg-gray-700 text-white inline-flex justify-center items-center"},le={class:"flex-grow"},oe={class:"text-center"},ne=e("span",{class:"text-xs"},"Km/s",-1),re={class:"text-center"},ie=e("span",{class:"text-xs text-red-600"},"Km/s",-1),ce=p({__name:"PointsList",setup(h){const t=w();return(l,n)=>(r(),i("main",X,[Z,e("main",ee,[e("aside",te,[(r(!0),i(m,null,v(f(t).points,a=>(r(),i("div",{onClick:s=>f(t).UIData.map.fixedToPoint(a.center,a.image),class:"w-1/3 px-1 cursor-pointer"},[e("main",{class:b([{"!bg-gray-100 !text-gray-700":a.active},"w-full bg-white/10 text-gray-300 h-12 flex overflow-hidden hover:bg-gray-100 hover:text-gray-700"])},[e("div",se,g(a.index),1),e("article",le,[e("div",oe,[_(g(a.item.SpeedAvg)+" ",1),ne]),e("div",re,[_(g(a.item.SpeedAvgL)+" ",1),ie])])],2)],8,ae))),256))])])]))}}),de={class:"w-80 bg-slate-900 h-full px-3 relative z-10"},ue=p({__name:"MenuRight",setup(h){return(t,l)=>(r(),i("section",de,[u(Q),u(ce)]))}}),fe={class:"absolute top-1/2 -translate-y-1/2 left-2 text-center z-30 flex flex-col h-5/6"},pe=p({__name:"SpeedColors",setup(h){const t=[{speed:"0",color:"bg-[#f80000]",text:"text-[#f80000]",border:"after:border-[#f80000]"},{speed:"5",color:"bg-[#f86000]",text:"text-[#f86000]",border:"after:border-[#f86000]"},{speed:"10",color:"bg-[#f8c800]",text:"text-[#f8c800]",border:"after:border-[#f8c800]"},{speed:"15",color:"bg-[#60f880]",text:"text-[#60f880]",border:"after:border-[#60f880]"},{speed:"20",color:"bg-[#10c050]",text:"text-[#10c050]",border:"after:border-[#10c050]"},{speed:"25",color:"bg-[#187830]",text:"text-[#187830]",border:"after:border-[#187830]"},{speed:"30",color:"bg-[#0060c8]",text:"text-[#0060c8]",border:"after:border-[#0060c8]"},{speed:"35",color:"bg-[#0000f8]",text:"text-[#0000f8]",border:"after:border-[#0000f8]"},{speed:"40",color:"bg-[#111]",text:"text-[#111]",border:"after:border-[#111]"}];return(l,n)=>(r(),i("div",fe,[(r(),i(m,null,v(t,a=>e("main",{class:b([[a.border,a.color],"w-1.5 h-[11%] text-sm relative text-white colorafter"])},[e("span",{class:b(["absolute -top-2 left-6 font-semibold text-xs",[a.text]])},g(a.speed),3)],2)),64))]))}});V.locale("uz",{months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentyabr_Oktyabr_Noyabr_Dekabr".split("_"),monthsShort:"yan_fev_mart_apr_may_iyun_iyul_avg_sent_okt_noy_dek".split("_"),relativeTime:{future:"%s keyin",past:"%s oldin",s:"1 sekund",m:"1 minut",mm:"%d minut",h:"1 soat",hh:"%d soat",d:"1 kun",dd:"%d kun",M:"1 Oy",MM:"%d Oy"}});const he={page:"",class:"w-full h-full flex"},ge={class:"flex-grow relative"},xe={class:"w-64 flex items-center flex-col"},_e=p({__name:"GeneralChart",setup(h){const t=A({chart:null,loading:!1}),l=x(),n=x({start:$(7),end:new Date});async function a(){await L(),s()}function s(){t.loading=!0,axios.post("api/tracks",{startDay:D(n.value.start,"start"),endDay:D(n.value.end,"end")}).then(({data:o})=>{const d=q(o);t.chart.series[0].update({data:d.map(c=>c.day_speed)},!0,!0),t.chart.series[1].update({data:d.map(c=>c.night_speed)},!0,!0),t.chart.xAxis[0].update({categories:d.map(c=>V(c.date).format("D-MMM"))},!0,!0),t.loading=!1})}return s(),S(()=>{t.chart=R.chart(l.value,{accessibility:{enabled:!1},chart:{type:"column",zoomType:"x"},title:{text:null},xAxis:{type:"datetime"},yAxis:{title:{text:null}},series:[{name:"Kunduzgi smena",data:[],showInLegend:!1,color:"orange"},{name:"Tungi smena",data:[],showInLegend:!1,color:"darkblue"}]})}),(o,d)=>{const c=M("VDatePicker");return r(),i("nav",he,[e("header",ge,[e("div",{ref_key:"chartdiv",ref:l,class:"h-full w-full border"},null,512),u(I,{loading:t.loading},null,8,["loading"])]),e("section",xe,[u(c,{borderless:"",color:"gray","onUpdate:modelValue":[a,d[0]||(d[0]=C=>n.value=C)],modelValue:n.value,modelModifiers:{range:!0},"disabled-dates":[{start:f($)(-1),end:null}],timezone:"Asia/Ashgabat"},null,8,["modelValue","disabled-dates"])])])}}}),be={page:"",class:"w-full h-full flex"},me={class:"flex-grow relative"},ve={class:"w-64 flex items-center flex-col"},we=p({__name:"GroupChart",setup(h){const t=A({chart:null,loading:!1}),l=x(),n=x({start:$(7),end:new Date});async function a(){await L(),s()}function s(){t.loading=!0,axios.post("api/tracks",{startDay:D(n.value.start,"start"),endDay:D(n.value.end,"end")}).then(({data:o})=>{const d=q(o);t.chart.series[0].update({data:d.map(c=>c.day_speed)},!0,!0),t.chart.series[1].update({data:d.map(c=>c.night_speed)},!0,!0),t.chart.xAxis[0].update({categories:d.map(c=>V(c.date).format("D-MMM"))},!0,!0),t.loading=!1})}return s(),S(()=>{t.chart=R.chart(l.value,{accessibility:{enabled:!1},chart:{type:"column",zoomType:"x"},title:{text:null},xAxis:{type:"datetime"},yAxis:{title:{text:null}},series:[{name:"Kunduzgi smena",data:[],showInLegend:!1,color:"orange"},{name:"Tungi smena",data:[],showInLegend:!1,color:"darkblue"}]})}),(o,d)=>{const c=M("VDatePicker");return r(),i("nav",be,[e("header",me,[e("div",{ref_key:"chartdiv",ref:l,id:"chartdiv",class:"h-full w-full border"},null,512),u(I,{loading:t.loading},null,8,["loading"])]),e("section",ve,[u(c,{color:"gray",borderless:"","onUpdate:modelValue":[a,d[0]||(d[0]=C=>n.value=C)],modelValue:n.value,modelModifiers:{range:!0},"disabled-dates":[{start:f($)(-1),end:null}],timezone:"Asia/Ashgabat"},null,8,["modelValue","disabled-dates"])])])}}}),ye={class:"absolute inset-0 p-8 z-50 bg-black/45 flex justify-center items-center"},ke={class:"bg-white rounded shadow-md p-2 w-[992px] h-[550px] flex flex-col overflow-hidden"},$e={class:"flex justify-between items-center -m-2 mb-0 px-2 bg-slate-900 text-white"},De=e("i",{class:"fa-regular fa-xmark"},null,-1),Ce=[De],Te={class:"flex w-full flex-grow pt-2"},ze=p({__name:"Charts",setup(h){const t=x(1),l=K(()=>{if(t.value==1)return _e;if(t.value==2)return we});return(n,a)=>(r(),i("section",ye,[e("main",ke,[e("header",$e,[e("div",null,[e("button",{onClick:a[0]||(a[0]=s=>t.value=1),class:b([{"border-white":t.value==1},"active:bg-gray-50 px-2 h-10 active:bg-white/15 hover:bg-white/25 border-b-2 border-transparent"])},"Barcha",2),e("button",{onClick:a[1]||(a[1]=s=>t.value=2),class:b([{"border-white":t.value==2},"active:bg-gray-50 px-2 h-10 active:bg-white/15 hover:bg-white/25 border-b-2 border-transparent"])},"Gruppalar",2)]),e("div",null,[e("button",{onClick:a[2]||(a[2]=s=>n.$emit("close")),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},Ce)])]),e("div",Te,[u(N,null,{default:z(()=>[(r(),k(G,null,[(r(),k(j(l.value)))],1024))]),_:1})])])]))}}),Ve={class:"absolute inset-0 p-8 z-50 bg-black/45 backdrop-blur-sm flex justify-center items-center"},Ae={class:"bg-white rounded shadow-md p-5 min-w-[992px] max-w-[992px] h-[550px] flex flex-col overflow-hidden"},Se={class:"flex justify-between items-center -m-5 mb-0 px-2 bg-slate-900 text-white"},Me=e("div",null,null,-1),Ie=e("i",{class:"fa-regular fa-xmark"},null,-1),Ue=[Ie],Le={class:"flex w-full flex-grow flex-wrap content-between pt-2"},Pe={class:"w-full flex flex-wrap"},qe=P('<main class="w-full mt-10 mb-4 px-10"><div class="border-t-2 border-slate-900 relative h-6 border-dashed"><aside class="absolute w-[206px] border-b right-[34px] -top-3 border-slate-900 border-dotted"><i class="fa-thin fa-angle-left absolute -top-2 -left-px"></i><span class="absolute -top-6 left-1/2 -translate-x-1/2"> B <span class="text-xs text-gray-400">Soat</span></span><i class="fa-thin fa-angle-right absolute -top-2 right-px"></i></aside><aside class="absolute w-[600px] border-b right-60 -top-3 border-slate-900 border-dotted"><i class="fa-thin fa-angle-left absolute -top-2 -left-px"></i><span class="absolute -top-6 left-1/2 -translate-x-1/2"> C <span class="text-xs text-gray-400">Kun</span></span><i class="fa-thin fa-angle-right absolute -top-2 right-px"></i></aside><nav class="absolute left-[30px] bottom-[13px] flex flex-col items-center"><i class="fa-solid fa-pipe text-2xl"></i></nav><nav class="absolute right-60 bottom-[13px] flex flex-col items-center"><i class="fa-solid fa-pipe text-2xl"></i></nav><nav class="absolute right-[16px] -bottom-[11px] flex flex-col items-center"><i class="fa-solid fa-pipe text-2xl"></i><span class="relative -top-1"> A <span class="text-xs text-gray-400">Vaqt</span></span></nav></div></main>',1),Re={class:"w-1/2 pr-2"},Be={class:"mb-2"},Ke=e("p",{class:"text-gray-500 text-sm"},[_(" Tanlangan vaqt "),e("i",{class:"fa-light fa-bracket-round"}),e("span",{class:"text-base text-gray-700 font-semibold"},"A"),e("i",{class:"fa-light fa-bracket-round-right"})],-1),je={class:"mb-2"},Ge=e("p",{class:"text-gray-500 text-sm"},[_(" Tanlangan vaqt nechi soat oldin "),e("i",{class:"fa-light fa-bracket-round"}),e("span",{class:"text-base text-gray-700 font-semibold"},"B"),e("i",{class:"fa-light fa-bracket-round-right"})],-1),Ne={class:"mb-2"},Fe=e("p",{class:"text-gray-500 text-sm"},[_("Oldingi necha kun bilan berilgan muddatni solishtirsin "),e("i",{class:"fa-light fa-bracket-round"}),e("span",{class:"text-base text-gray-700 font-semibold"},"C"),e("i",{class:"fa-light fa-bracket-round-right"})],-1),Oe={class:"mb-2"},He=e("p",{class:"text-gray-500 text-sm"},[_("Tezlik farqi "),e("i",{class:"fa-light fa-bracket-round"}),e("span",{class:"text-base text-gray-700 font-semibold"},"D"),e("i",{class:"fa-light fa-bracket-round-right"})],-1),Ee=P('<main class="w-1/2 pl-2"><h3 class="text-center text-[17px] font-semibold mb-3">Funksiyaning ishlash prinsipi haqida</h3><p class="text-gray-500 text-sm w-full"> Kon hududi xaritada 50x50m o&#39;lchamdagi kataklarga bo&#39;lingan. Har bir katak uchun tanlangan <i class="fa-light fa-bracket-round"></i><span class="text-base text-gray-700 font-semibold">A</span><i class="fa-light fa-bracket-round-right"></i> vaqtdan boshlab, belgilangan <i class="fa-light fa-bracket-round"></i><span class="text-base text-gray-700 font-semibold">B</span><i class="fa-light fa-bracket-round-right"></i> soat oldingi vaqt oralig&#39;ida avtoa&#39;gdargichlarning o&#39;rtacha tezligini hisoblaydi va undan olgingi <i class="fa-light fa-bracket-round"></i><span class="text-base text-gray-700 font-semibold">C</span><i class="fa-light fa-bracket-round-right"></i> kun ichidagi avtoa&#39;gdargichlarning o&#39;rtacha tezligini hisoblab solishtiriladi. Solishtirilgan o&#39;rtacha tezliklar farqi <b>D</b> ga teng yoki undan katta bo&#39;lgan kataklar aniqlab beriladi. </p></main>',1),We=e("i",{class:"fa-light fa-rotate-right mr-3"},null,-1),Ye=p({__name:"SpeedControl",setup(h){const t=w(),l=A({oldDays:t.oldDays,hourPeriod:t.hourPeriod,selectedTime:t.selectedTime,speedRange:t.speedRange});function n(){t.openControl!=!1&&(t.oldDays=l.oldDays,t.hourPeriod=l.hourPeriod,t.selectedTime=l.selectedTime,t.speedRange=l.speedRange,t.withLoading(()=>t.UIData.wialon.selectGroup(t.UIData.active)),t.openControl=!1)}return(a,s)=>(r(),i("section",Ve,[e("main",Ae,[e("header",Se,[Me,e("div",null,[e("button",{onClick:s[0]||(s[0]=o=>f(t).openControl=!1),class:"w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25"},Ue)])]),e("div",Le,[e("div",Pe,[qe,e("main",Re,[e("aside",Be,[Ke,y(e("input",{type:"datetime-local","onUpdate:modelValue":s[1]||(s[1]=o=>l.selectedTime=o),class:"text-gray-800 w-full py-2 border-b outline-none"},null,512),[[F,l.selectedTime]])]),e("aside",je,[Ge,y(e("select",{"onUpdate:modelValue":s[2]||(s[2]=o=>l.hourPeriod=o),class:"text-gray-800 w-full py-2 border-b outline-none"},[(r(),i(m,null,v(12,o=>e("option",null,g(o),1)),64))],512),[[T,l.hourPeriod]])]),e("aside",Ne,[Fe,y(e("select",{"onUpdate:modelValue":s[3]||(s[3]=o=>l.oldDays=o),class:"text-gray-800 w-full py-2 border-b outline-none"},[(r(),i(m,null,v(10,o=>e("option",null,g(o),1)),64))],512),[[T,l.oldDays]])]),e("aside",Oe,[He,y(e("select",{"onUpdate:modelValue":s[4]||(s[4]=o=>l.speedRange=o),class:"text-gray-800 w-full py-2 border-b outline-none"},[(r(),i(m,null,v(3,o=>e("option",null,g(o*5),1)),64))],512),[[T,l.speedRange]])])]),Ee]),e("div",{class:"w-full text-right"},[e("button",{onClick:n,class:"bg-slate-900 text-white px-4 py-1.5 rounded-sm shadow active:bg-slate-70 hover:bg-slate-800 active:shadow-none"},[We,_(" Yangilash ")])])])])]))}}),Je={class:"h-full flex-grow relative"},Qe=e("i",{class:"fa-duotone fa-house"},null,-1),Xe=e("i",{class:"fa-regular fa-chart-mixed"},null,-1),Ze=[Xe],et=p({__name:"Map",setup(h){const t=x(!1),l=x(),n=w(),a=x(null);return S(async()=>{const s=new H(l.value);a.value=new B(s.map),n.UIData.wialon=a,n.UIData.map=s,a.value.onInit=()=>{n.withLoading(()=>a.value.selectGroup(n.transport_groups[0]))},a.value.onSelectStart=()=>{s.removeCubics(),s.map.setView([42.2628699,63.891215],13)},a.value.onSelectEnd=o=>s.drawCubics(o)}),(s,o)=>{const d=M("RouterLink");return r(),i("section",Je,[u(O,null,{default:z(()=>[t.value?(r(),k(ze,{key:0,onClose:o[0]||(o[0]=c=>t.value=!1)})):U("",!0),f(n).openControl?(r(),k(Ye,{key:1})):U("",!0)]),_:1}),u(d,{to:"/",class:"absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center"},{default:z(()=>[Qe]),_:1}),e("button",{onClick:o[1]||(o[1]=c=>t.value=!0),class:"absolute right-2 top-2 btn-line bg-white shadow-md !text-xl z-10"},Ze),e("div",{ref_key:"map",ref:l,class:"h-full w-full z-[1]"},null,512)])}}}),tt={class:"h-full w-full relative rounded-xl overflow-hidden flex"},it=p({__name:"TrucksPage",setup(h){const t=w();return(l,n)=>(r(),i("main",tt,[u(I,{loading:f(t).UIData.loading},null,8,["loading"]),u(pe),u(et),u(ue)]))}});export{it as default};
