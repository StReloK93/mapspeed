import './bootstrap';
import { createApp } from 'vue'
import App from '@/components/App.vue'
import '@/assets/index.css'
import { createPinia } from 'pinia'
createApp(App)
    .use(createPinia())
    .mount('#app')












// const { data: coordinates } = await axios.get("/api/get_tiles")
// let summa = data.reduce((accumulator, { speed },) => accumulator + speed, 0)
// for (let first = 0; first < 100; first++) {
//     for (let second = 0; second < 100; second++) {
//         getSquare(map, { row: first, column: second })
//     }
// }
// coordinates.forEach(({ start, end }, index) => {
//     L.rectangle([[start.lat, start.lon], [end.lat, end.lon],], { color: "#ff7800", weight: 0.5 }).addTo(map)
// });