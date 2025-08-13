import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import path from "path";

// run package config
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [react()],
    // define process env
    define: {
        "process.env": process.env,
    },
    server: {
        proxy: {
            "/api/sensor_data": {
                target: "http://192.168.25.190",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
