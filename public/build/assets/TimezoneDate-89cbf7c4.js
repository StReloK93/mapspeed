import{h as n}from"./Wialon-41b96dde.js";function i(e){const t=new Date;return t.setDate(t.getDate()-e),t}function g(e,t){const s=n(e);if(t==1){const a=n(s.format("YYYY-MM-DD 09:10")).unix(),o=n(s.format("YYYY-MM-DD 21:10")).unix();return{start:a,end:o,smena:1}}else if(t==2){const a=n(s.format("YYYY-MM-DD 21:10")).unix(),o=n(s.add(1,"day").format("YYYY-MM-DD 09:10")).unix();return{start:a,end:o,smena:2}}}function u(e){const t=n(e.format("YYYY-MM-DD 09:10")),s=n(e.format("YYYY-MM-DD 21:10"));if(t>e)return{date:e.add(-1,"day").format("YYYY-MM-DD"),smena:2};if(t<e&&e<s)return{date:e.format("YYYY-MM-DD"),smena:1};if(s<e)return{date:e.format("YYYY-MM-DD"),smena:2}}function c(e,t=null){const s=e.getFullYear(),a=(e.getMonth()+1).toString().padStart(2,"0"),o=e.getDate().toString().padStart(2,"0"),r=e.getHours().toString().padStart(2,"0"),d=e.getMinutes().toString().padStart(2,"0");return t=="start"?`${s}-${a}-${o} 09:00`:t=="end"?`${s}-${a}-${o} 08:59`:`${s}-${a}-${o} ${r}:${d}`}function p(e){const t=D(e,12),s=[];return t.forEach((a,o)=>{if(o%2==0){const r=a[0].hour.split(" ")[0];s.push({date:r,day_speed:Y(a,0),night_speed:Y(t[o+1],0)})}}),s}function Y(e,t){return+((e[t].average_speed+e[t+1].average_speed+e[t+2].average_speed+e[t+3].average_speed+e[t+4].average_speed+e[t+5].average_speed+e[t+6].average_speed+e[t+7].average_speed+e[t+8].average_speed+e[t+9].average_speed+e[t+10].average_speed+e[t+11].average_speed)/12).toFixed(3)}function D(e,t){const s=[];for(let a=0;a<e.length;a+=t)s.push(e.slice(a,a+t));return s}function M(e=void 0){const t=n(e),s=n(n().format("YYYY-MM-DD 09:40")),a=n(n().format("YYYY-MM-DD 21:40"));return s<t&&a>t?{date:t.toDate(),smena:1}:a<t?{date:t.toDate(),smena:2}:{date:t.clone().subtract(1,"day").toDate(),smena:2}}export{u as a,g as b,i as d,c as f,M as g,p as s};