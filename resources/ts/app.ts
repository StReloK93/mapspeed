import './bootstrap'
import VCalendar from 'v-calendar'
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import 'v-calendar/style.css'
import 'devextreme/dist/css/dx.material.teal.light.compact.css'
import { createPinia } from 'pinia'

wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
wialon.core.Session.getInstance().loginToken(SERVER_DATA.wialon_token, "", () => {
    createApp(App)
        .use(VCalendar, {})
        .use(createPinia())
        .mount('#app')
})
