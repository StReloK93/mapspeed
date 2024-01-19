import './bootstrap'
import VCalendar from 'v-calendar'
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import 'v-calendar/style.css'
import { createPinia } from 'pinia'

createApp(App)
    .use(VCalendar, {})
    .use(createPinia())
    .mount('#app')