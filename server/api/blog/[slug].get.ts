import type { New as News } from "#shared/types/schema";
import { readItem, readItems } from "@directus/sdk";

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "slug");

    // валидируем
    if (!slug || slug.trim() === "") {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
        });
    }

    try {
        const news = await directusServer.request(
            readItems("news", {
                limit: 1,
                filter: {
                    slug: { _eq: slug },
                    status: { _eq: "published" },
                },
                fields: [
                    "id",
                    "title",
                    "slug",
                    "date_created",
                    "reading_time",
                    "excerpt",
                    "seo",
                    "content",
                    {
                        image: [
                            "id",
                            "title",
                            "description",
                            "filename_download",
                        ],
                        button: [
                            "id",
                            "label",
                            "type",
                            "variant",
                            "size",
                            "arrow",
                            "url",
                            {
                                page: ["id", "permalink", "title"],
                            },
                        ],
                    },
                ],
                deep: { button: { _sort: ["sort"] } },
            }),
        );

        if (!news || news.length === 0) {
            throw createError({
                statusCode: 404,
                message: "Страница не найдена",
            });
        }

        const currentNews = news[0] as News;
        
        const relatedNews = await directusServer.request(
            readItems("news", {
                limit: 3,
                fields: [
                    "id",
                    "title",
                    "slug",
                    "excerpt",
                    {
                        image: ["id", "title", "description", "filename_download"],
                    },
                    "date_created",
                ],
                filter: {
                    status: { _eq: "published" },
                    id: { _neq: currentNews.id },
                },
                sort: ["-date_created"],
            }),
        );

        return {
            news: currentNews,
            related: relatedNews as News[],
        };
    } catch (err: any) {
        if (err?.statusCode) {
            throw createError({
                statusCode: 404,
                message: "Page not found",
            });
        }

        console.error("Directus API error:", err);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch page data",
        });
    }
});
