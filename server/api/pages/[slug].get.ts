import type { Page, BlockNew, New } from "#shared/types/schema";
import { readItems } from "@directus/sdk";

const pageFields = [
    "id",
    "title",
    "permalink",
    "status",
    "seo",
    {
        blocks: [
            "id",
            "collection",
            "sort",
            {
                item: {
                    block_about: [
                        "*",
                        // "id",
                        // "sort",
                        // "title",
                        // "description",
                        // "advantages",
                        // "info",
                        {
                            documents: [
                                "id",
                                "sort",
                                {
                                    directus_files_id: [
                                        "id",
                                        "title",
                                        "filesize",
                                        "filename_download",
                                    ],
                                },
                            ],
                            image: [
                                "id",
                                "title",
                                "description",
                                "filename_download",
                            ],
                            button: [
                                "*.*"
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                // { page: ["id", "permalink", "title"] },
                            ],
                        },
                    ],
                    block_form: [
                        "id",
                        "title",
                        "consent_text",
                        "success_message",
                        // "email_recipient"
                    ],
                    block_map: [
                        "*",
                        // "id",
                        // "sort",
                        // "title",
                        // "links",
                        // "working_hours",
                        // "map",
                        {
                            button: [
                                "*.*"
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                // { page: ["id", "permalink", "title"] },
                            ],
                        },
                    ],
                    block_doctors: [
                        "*",
                        // "id",
                        // "headline",
                        // "display_as",
                        {
                            button: [
                                "*.*"
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                // { page: ["id", "permalink", "title"] },
                            ],
                        },
                        {
                            doctors: [
                                "id",
                                {
                                    doctors_id: [
                                        "*",
                                        // "id",
                                        // "title",
                                        // "slug",
                                        // "description",
                                        // "color",
                                        // "standing",
                                        // "status",
                                        // "image",
                                        {
                                            button: [
                                                "*.*"
                                                // "id",
                                                // "label",
                                                // "type",
                                                // "variant",
                                                // "size",
                                                // "arrow",
                                                // "url",
                                                // {
                                                //     page: [
                                                //         "id",
                                                //         "permalink",
                                                //         "title",
                                                //     ],
                                                // },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    block_news: [
                        "*"
                        // "id",
                        // "headline",
                        // "items_limit",
                        // "load_more_step",
                    ],
                    block_promotions: [
                        "*",
                        // "id",
                        // "headline",
                        // "display_as",
                        {
                            button: [
                                "*"
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                // { page: ["id", "permalink", "title"] },
                            ],
                        },
                        {
                            promotionsgroup: [
                                "id",
                                {
                                    promotions_id: [
                                        "*"
                                        // "id",
                                        // "title",
                                        // "description",
                                        // "slug",
                                        // "seo",
                                        // "date",
                                        // "status",
                                        // "content",
                                        // "image",
                                    ],
                                },
                            ],
                        },
                    ],
                    block_hero: [
                        "*",
                        // "id",
                        // "tagline",
                        // "headline",
                        // "description",
                        {
                            image: ["id", "title", "description"],
                            button_group: [
                                // "id",
                                {
                                    buttons: [
                                        "*.*"
                                        // "id",
                                        // "label",
                                        // "type",
                                        // "variant",
                                        // "size",
                                        // "arrow",
                                        // "url",
                                        // { page: ["id", "permalink", "title"] },
                                    ],
                                },
                            ],
                        },
                    ],
                    block_faq: [
                        "id",
                        "headline",
                        "display_as",
                        {
                            items: [
                                "id",
                                "sort",
                                {
                                    faq_id: [
                                        "*"
                                        // "id",
                                        // "question",
                                        // "answer",
                                        // "status",
                                    ],
                                },
                            ],
                        },
                        {
                            button: [
                                "*.*"
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                // { page: ["id", "permalink", "title"] },
                            ],
                        },
                    ],
                    block_photo_slider: [
                        "id",
                        "headline",
                        {
                            photos: ["directus_files_id"],
                        },
                    ],
                    block_ratings: [
                        "id",
                        "headline",
                        {
                            ratingsgroup: [
                                "*"
                                // "title",
                                // "value",
                                // "source",
                                // "reviews",
                                // "image",
                            ],
                        },
                    ],
                    block_reviews: [
                        "id",
                        "headline",
                        {
                            reviewsgroup: [
                                "*"
                                // "name",
                                // "date",
                                // "status",
                                // "content"
                            ],
                        },
                    ],
                    block_richtext: [
                        "*"
                        // "id",
                        // "content",
                        // "alignment"
                    ],
                    block_services: [
                        "id",
                        "headline",
                        "display_as",
                        {
                            featured_services: [
                                "*"
                                // "id",
                                // "title",
                                // "slug",
                                // "description",
                                // "icon",
                            ],
                            list_categories: [
                                "id",
                                "title",
                                "color",
                                {
                                    services: [
                                        "*"
                                        // "id",
                                        // "status",
                                        // "title",
                                        // "slug",
                                        // "icon",
                                        // "image",
                                        // "description",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    },
];

export default defineEventHandler(async (event) => {
    let slug = getRouterParam(event, "slug");

    // ТУТ ЗАХАРДКОДИМ ВСЕ ЖЕ ГЛАВНУЮ СТРАНИЦУ
    const DEFAULT_HOMEPAGE_PERMALINK = "index";

    if (!slug || slug.trim() === "" || slug === "index") {
        slug = DEFAULT_HOMEPAGE_PERMALINK;
    }

    if (!slug || slug.trim() === "") {
        throw createError({
            statusCode: 400,
            message: "Bad Request",
            data: { message: "Page slug is required" },
        });
    }

    try {
        const pages = await directusServer.request(
            readItems("pages", {
                limit: 1,
                filter: {
                    permalink: { _eq: slug },
                    status: { _eq: "published" },
                },
                fields: pageFields as any,
                deep: { blocks: { _sort: ["sort"] } },
            }),
        );

        if (!pages || pages.length === 0) {
            const isHomepage = slug === DEFAULT_HOMEPAGE_PERMALINK;
            throw createError({
                statusCode: 404,
                message: isHomepage
                    ? "Главная страница не найдена"
                    : "Страница не найдена",
            });
        }

        const page = pages[0] as Page;

        if (page.blocks && Array.isArray(page.blocks)) {
            for (const block of page.blocks) {
                // Отсекаем строки и null
                // После этой проверки ts осознает, что block — это PagesBlock
                if (typeof block === "string" || !block || !block.collection) {
                    continue;
                }
                // ура есть доступ к block.collection и block.item

                if (block.collection === "block_news" && block.item) {
                    const blockData = block.item as BlockNew;

                    try {
                        // Грузим ВСЕ новости (для страницы /blog)
                        const allNews = await directusServer.request(
                            readItems("news", {
                                limit: 100, // Максимум новостей
                                filter: { status: { _eq: "published" } },
                                sort: ["-date_created"],
                                fields: [
                                    "id",
                                    "title",
                                    "slug",
                                    "reading_time",
                                    "excerpt",
                                    "image",
                                    "date_created",
                                ],
                            }),
                        );

                        (blockData as any)._news = allNews as New[];
                    } catch (newsError) {
                        console.warn("Failed to load news:", newsError);
                        (blockData as any)._news = [];
                    }
                }
            }
        }
        return { page };
        
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
