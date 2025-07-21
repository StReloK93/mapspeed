import "./bootstrap";
import VCalendar from "v-calendar";
import { createApp } from "vue";
import App from "@/components/App.vue";
import "@/assets/index.css";
import "v-calendar/style.css";
import "devextreme/dist/css/dx.material.teal.light.compact.css";
import { createPinia } from "pinia";
import router from "./router";
import { TippyDirective, Tippy, TippySingleton } from "tippy.vue";
import "tippy.js/dist/tippy.css";
import OutsideClick from "./modules/OutsideClick";
// wialon.core.Session.getInstance().initSession("http://172.16.0.166:8025");
wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz");
wialon.core.Session.getInstance().loginToken(
    SERVER_DATA.wialon_token,
    "",
    () => {
        createApp(App)
            .directive('click-outside', OutsideClick)
            .directive("tippy", TippyDirective)
            .component("tippy", Tippy)
            .component("tippy-singleton", TippySingleton)
            .use(router)
            .use(VCalendar, {})
            .use(createPinia())
            .mount("#app");
    }
);
