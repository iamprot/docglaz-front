// server/api/site-data.get.ts
import { readSingleton, readItem } from "@directus/sdk";

export default defineEventHandler(async (event) => {
    try {
        const [globals, navigation, footer] = await Promise.all([
            directusServer.request(
                readSingleton("globals", {
                    fields: [
                        "title",
                        "address",
                        "phone",
                        "email",
                        "url",
                        "logo_short",
                        "logo_full",
                        "social_links",
                    ],
                }),
            ),
            directusServer.request(
                readItem("navigation", "main", {
                    fields: [
                        "id",
                        {
                            items: [
                                "title",
                                {
                                    page: ["title", "permalink"],
                                },
                                "url",
                            ],
                        },
                    ],
                    deep: {
                        items: {
                            _sort: ["sort"],
                        },
                    },
                }),
            ),
            directusServer.request(
                readItem("navigation", "footer", {
                    fields: [
                        "id",
                        "title",
                        {
                            items: [
                                "id",
                                "type",
                                "sort",
                                "url",
                                {
                                    page: ["id", "title", "permalink"],
                                },
                                {
                                    file: [
                                        "id",
                                        "title",
                                        "filename_disk",
                                        "filename_download",
                                        "type",
                                        "description",
                                    ],
                                },
                            ],
                        },
                    ],
                    deep: {
                        items: {
                            _sort: ["sort"],
                        },
                    },
                }),
            ),
        ]);
        return {
            globals,
            navigation,
            footer,
        };
    } catch (error) {
        console.error("Site data fetch error:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch site data",
        });
    }
});
