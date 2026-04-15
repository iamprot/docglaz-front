export default defineAppConfig({
  websiteUrl: "http://localhost:3000",
  routes: {
    // Шаблоны с плейсхолдером :slug
    DOCTOR: (slug: string) => `/vrachi/${slug}`,
    NEWS: (slug: string) => `/blog/${slug}`,
    PROMOTION: (slug: string) => `/akcii/${slug}`,
    SERVICE: (slug: string) => `/uslugi/${slug}`,
  }
})