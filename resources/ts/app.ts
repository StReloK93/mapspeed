import './bootstrap'
import VCalendar from 'v-calendar'
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import 'v-calendar/style.css'
import { createPinia } from 'pinia'


const token = "94e3f3e1ac97def632645f3655f7c9325FBF8B37B9070360D58D2FC728179D2C5ABA96B9"
wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
wialon.core.Session.getInstance().loginToken(token, "", (code) => {
    createApp(App)
        .use(VCalendar, {})
        .use(createPinia())
        .mount('#app')
})
