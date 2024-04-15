import './bootstrap'
import VCalendar from 'v-calendar'
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import 'v-calendar/style.css'
import { createPinia } from 'pinia'


const token = "94e3f3e1ac97def632645f3655f7c932F353B5B91B9E1B0EA7B79A39D6672B70685972C0"
wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
wialon.core.Session.getInstance().loginToken(token, "", () => {
    createApp(App)
        .use(VCalendar, {})
        .use(createPinia())
        .mount('#app')
})
