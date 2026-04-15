import { readItems } from "@directus/sdk";

const doctorFields = [
    "id",
    "title",
    "slug",
    "seo",
    "status",
    "description",
    "color",
    "standing",
    "education",
    "experience",
    "certificates",
    "skills",
    {
        image: [
            "id",
            "title",
            "description",
            "filename_download"
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
        blocks: [
            "id",
            "collection",
            "sort",
            {
                item: {
                    block_reviews: [
                        "id",
                        "headline",
                        {
                            reviewsgroup: ["name", "date", "status", "content"],
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

    // 🔹 Валидация параметра
    if (!slug || slug.trim() === "") {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        });
    }

    try {
        const doctor = await directusServer.request(
            readItems("doctors", {
                limit: 1,
                filter: {
                    slug: { _eq: slug },
                    status: { _eq: "published" },
                },
                fields: doctorFields as any,
                deep: { blocks: { _sort: ["sort"] } },
            }),
        );

        if (!doctor) {
            throw createError({
                statusCode: 404,
                message: "Cтраница не найдена",
            });
        }

        return { doctor };

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
