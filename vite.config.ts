import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
 
export default defineConfig({
    plugins: [
        laravel(['resources/ts/app.ts']),
        vue(),
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        },
    },
});