import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'wwwroot',
    },
//    server: {
//        proxy: {
//            '/api': 'http://localhost:5001', // Adjust the port based on your ASP.NET Core server configuration
//        },
//    },
})
