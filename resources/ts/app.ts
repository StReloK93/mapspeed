import './bootstrap';
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import { createPinia } from 'pinia'

createApp(App)
    .use(createPinia())
    .mount('#app')