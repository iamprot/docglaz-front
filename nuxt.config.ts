// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { preset } from "node:process";

export default defineNuxtConfig({
    compatibilityDate: "2026-03-24",
    // devtools: { enabled: false },
    modules: [
      "@nuxt/eslint",
      "@nuxt/image",
      "@nuxtjs/google-fonts",
      "@vueuse/motion/nuxt",
      "@nuxtjs/robots",
      "@nuxtjs/sitemap",
      "nuxt-schema-org",
    ],
    app: {
        head: {
            link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
            htmlAttrs: {
                lang: "ru",
            },
        },
        pageTransition: { name: "page", mode: "out-in" },
    },
    googleFonts: {
        families: {
            Mulish: [200, 300, 400, 500, 600, 700, 800, 900],
        },
    },
    css: ["./app/assets/css/main.css"],
    ssr: true,
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL as string,
            directusUrl: process.env.DIRECTUS_URL
        },
        directusServerToken: process.env.NUXT_DIRECTUS_SERVER_TOKEN,
    },
    typescript: {
        tsConfig: {
            compilerOptions: {
                types: ["node"],
            },
        },
    },
    vite: {
        server: {
            allowedHosts: ["*"],
        },
        plugins: [tailwindcss()],
    },
    robots: {
        blockAiBots: true,
        blockNonSeoBots: true,
        disallow: [
            "/politika-konfidencialnosti",
            "/politika-okazaniya-platnyh-uslug",
            "/admin"
        ]
    },
    sitemap: {
        defaults: {
            lastmod: new Date().toDateString(),
            priority: 0.5,
            changefreq: 'weekly'
        },
        enabled: true,
        sources: ['/api/__sitemap__/urls'], // Указываем путь к вашему API-роуту
        autoLastmod: true, // Автоматически добавлять дату изменения
    },
    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL,
        name: "Офталомологическая клиника Докглаз Тула",
    },
});