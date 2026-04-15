// server/api/__sitemap__/urls.ts
import { defineSitemapEventHandler } from '#imports'
import { readItems } from "@directus/sdk"

// Тип для элемента карты сайта (опционально, для удобства)
interface SitemapUrl {
  loc: string
  lastmod?: string
}

export default defineSitemapEventHandler(async () => {
  // Запускаем все запросы параллельно для скорости
  const [pages, news, services, doctors, promotions] = await Promise.all([
    // 1. Статические страницы
    directusServer.request(
      readItems("pages", {
        limit: -1,
        fields: ["permalink", ],
        filter: { status: { _eq: "published" } },
      })
    ),
    // 2. Новости (/blog/slug)
    directusServer.request(
      readItems("news", {
        limit: -1,
        fields: ["slug",],
        filter: { status: { _eq: "published" } },
      })
    ),
    // 3. Услуги (/services/slug)
    directusServer.request(
      readItems("services", {
        limit: -1,
        fields: ["slug", ],
        filter: { status: { _eq: "published" } },
      })
    ),
    // 4. Врачи (/doctors/slug)
    directusServer.request(
      readItems("doctors", {
        limit: -1,
        fields: ["slug",],
        filter: { status: { _eq: "published" } },
      })
    ),
    // 5. Акции (/promotions/slug)
    directusServer.request(
      readItems("promotions", {
        limit: -1,
        fields: ["slug", ],
        filter: { status: { _eq: "published" } },
      })
    ),
  ])

  const urls: SitemapUrl[] = []

  // Статика
  // permalink '/about' или 'about'
  urls.push(
    ...pages.map((item) => ({
      loc: item.permalink.startsWith('/') ? item.permalink : `/${item.permalink}`,
    //   lastmod: item.date_updated,
    }))
  )

  // Динамические страницы
  // Маппим коллекций с префиксом
  const mapCollection = (
    items: any[], 
    prefix: string, 
    slugField: string = 'slug'
  ) => 
    items.map((item) => ({
      loc: `/${prefix}/${item[slugField]}`,
      lastmod: item.date_updated,
      priority: 0.7
    }))

  urls.push(...mapCollection(news, 'blog'))
  urls.push(...mapCollection(services, 'uslugi'))
  urls.push(...mapCollection(doctors, 'vrachi'))
  urls.push(...mapCollection(promotions, 'akcii'))

  return urls
})