import './bootstrap'
import VCalendar from 'v-calendar'
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import 'v-calendar/style.css'
import { createPinia } from 'pinia'


const token = "94e3f3e1ac97def632645f3655f7c9323EBBF730196FF0171A3B0D34D08A0351D946F7FB"
wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
wialon.core.Session.getInstance().loginToken(token, "", () => {
    createApp(App)
        .use(VCalendar, {})
        .use(createPinia())
        .mount('#app')
})
