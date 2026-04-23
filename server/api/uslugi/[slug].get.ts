import { readItems } from "@directus/sdk";

const serviceFields = [
    "*",
    // "id",
    // "title",
    // "slug",
    // "seo",
    // "status",
    // "description",
    // "details",
    // "prices",
    // "notice",
    // "process",
    // "symptoms",
    {
        category: ["id", "title"],
        image: ["id", "title", "description", "filename_download"],
        button: [
            "*",
            // "id",
            // "label",
            // "type",
            // "variant",
            // "size",
            // "arrow",
            // "url",
            {
                page: ["id", "permalink", "title"],
            },
        ],
        blocks: [
            "id",
            "collection",
            "sort",
            {
                item: {
                    block_ratings: [
                        "id",
                        "headline",
                        {
                            ratingsgroup: [
                                "title",
                                "value",
                                "source",
                                "reviews",
                                "image",
                            ],
                        },
                    ],
                    block_doctors: [
                        "id",
                        "headline",
                        "display_as",
                        {
                            button: [
                                "*",
                                // "id",
                                // "label",
                                // "type",
                                // "variant",
                                // "size",
                                // "arrow",
                                // "url",
                                { page: ["id", "permalink", "title"] },
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
                                                "*",
                                                // "id",
                                                // "label",
                                                // "type",
                                                // "variant",
                                                // "size",
                                                // "arrow",
                                                // "url",
                                                {
                                                    page: [
                                                        "id",
                                                        "permalink",
                                                        "title",
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
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
                }
            }
        ]
    },
];

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "slug");

    // Валидация параметра
    if (!slug || slug.trim() === "") {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        });
    }

    try {
        const service = await directusServer.request(
            readItems("services", {
                limit: 1,
                filter: {
                    slug: { _eq: slug },
                    status: { _eq: "published" },
                },
                fields: serviceFields as any,
                deep: { blocks: { _sort: ["sort"] } },
            }),
        );

        if (!service) {
            throw createError({
                statusCode: 404,
                message: "Cтраница не найдена",
            });
        }

        return { service };
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
