import { createItem } from "@directus/sdk";
import type { FormSubmission } from "#shared/types/schema";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const { name, phone, source_page } = body;

        const payload: Partial<FormSubmission> = {
            date_created: new Date().toLocaleString(),
            name: name as string,
            phone: phone as string,
            consent: true,
            source_page: source_page as string,
            status: "new",
            ip_address: getRequestIP(event, { xForwardedFor: true }),
            user_agent: getRequestHeader(event, "user-agent"),
        };

        const result = await directusServer.request(
            createItem("form_submissions", payload),
        );

        return {
            success: true,
            id: result.id,
        };
    } catch (error) {
        console.error("[Lead API] Error:", error);

        // Пробрасываем известные ошибки на клиент
        if (error) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            message: "Ошибка при обработке заявки",
        });
    }
});
