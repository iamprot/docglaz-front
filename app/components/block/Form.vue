<script setup lang="ts">
import type { BlockForm } from "#shared/types/schema";
import { useForm, useField, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const route = useRoute();

interface Props {
    data: BlockForm;
}

const currentRoute = route.path === "/" ? "index" : route.path;

const props = defineProps<Props>();

const phoneRegex =
    /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/;

const honeypot = ref("");

const validationSchema = toTypedSchema(
    yup.object({
        name: yup
            .string()
            .min(3, "Минимум 3 символа")
            .max(100, "Слишком длинное имя")
            .matches(/^[\p{L}\s'-]+$/u, "Только буквы и пробелы")
            .required("Обязательное поле"),

        phone: yup
            .string()
            .matches(phoneRegex, "+7 (___) ___-__-__")
            .test("is-valid-phone", "Формат +7 (___) ___-__-__", (value) => {
                const digits = value?.replace(/\D/g, "") || "";
                return digits.length === 11;
            })
            .required("Обязательное поле"),

        consent: yup
            .boolean()
            .oneOf([true], "Необходимо согласие на обработку данных")
            .required("Необходимо согласие"),
    }),
);

const { values, errors, meta, handleSubmit, setFieldValue, resetForm } =
    useForm({
        validationSchema,
        initialValues: {
            name: "",
            phone: "",
            consent: false,
        },
    });

const isLoading = ref(false);
const isSubmitted = ref(false);

const { value: name } = useField<string>("name");
const { value: phone } = useField<string>("phone");
const { value: consent } = useField<boolean>("consent");

// Форматируем телефон на лету
const formatPhone = (value: string) => {
    // 1. Оставляем только цифры
    const digits = value.replace(/\D/g, "");

    // 2. Ограничиваем длину 11 цифрами (7 + 10 цифр номера)
    const limitedDigits = digits.slice(0, 11);

    // 3. Обрабатываем начало номера (8 или 7)
    let processed = limitedDigits;
    if (processed.startsWith("8")) {
        processed = "7" + processed.slice(1);
    } else if (processed.length > 0 && !processed.startsWith("7")) {
        // Если ввели первую цифру не 7 или 8, считаем что это код 7
        processed = "7" + processed;
    }

    // 4. Снова ограничиваем после обработки (на случай если добавили 7)
    const finalDigits = processed.slice(0, 11);

    // 5. Форматируем по маске +7 (XXX) XXX-XX-XX
    let formatted = "+7";
    if (finalDigits.length > 1) {
        formatted += ` (${finalDigits.slice(1, 4)}`;
    }
    if (finalDigits.length > 4) {
        formatted += `) ${finalDigits.slice(4, 7)}`;
    }
    if (finalDigits.length > 7) {
        formatted += `-${finalDigits.slice(7, 9)}`;
    }
    if (finalDigits.length > 9) {
        formatted += `-${finalDigits.slice(9, 11)}`;
    }

    return formatted;
};

// Обработчик ввода телефона с маской
const onPhoneInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart;
    const oldValue = input.value;

    // Форматируем
    const formatted = formatPhone(oldValue);

    // Обновляем значение через vee-validate
    phone.value = formatted;

    // Возвращаем курсор в конец (упрощенно для маски)
    // Для более сложного поведения нужно считать смещения символов
    setTimeout(() => {
        input.setSelectionRange(formatted.length, formatted.length);
    }, 0);
};

// Отправка формы
const onSubmit = handleSubmit(async (validValues) => {
    isLoading.value = true;

    if (honeypot.value) {
        // 1. Логируем для аналитики (опционально)
        console.warn("[Honeypot] Bot detected:", {
            path: window.location.pathname,
            time: new Date().toISOString(),
            // Можно отправить метрику в Яндекс.Метрику
            // ym(XXXXXX, 'reachGoal', 'honeypot_triggered')
        });

        // 2. Имитируем успех для бота
        // Бот думает, что форма отправилась, и уходит
        isSubmitted.value = true;
        resetForm();
        isLoading.value = false;

        // 3. Прерываем реальную отправку
        return;
    }

    

    try {
        await $fetch("/api/contact", {
            method: "POST",
            body: {
                ...validValues,
                // recipient: props.data.email_recipient,
                source_page: currentRoute,
            },
        });
        isSubmitted.value = true;
        resetForm();
    } catch (error) {
        console.error("[Form Submit] Error:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
            opacity: 1,
            y: 0,
        }"
        :delay="200"
        :duration="300"
        class="relative bg-[#DAECFF] w-full mx-auto flex flex-col p-8 min-h-[235px] rounded-smooth contact-form overflow-hidden"
    >
        <div class="flex flex-1 flex-col h-full justify-between z-10">
            <BaseHeadline
                :headline="data.title"
                as="form_header"
                class="mb-6"
            />
            <div v-if="!isSubmitted" class="relative flex flex-col">
                <form @submit="onSubmit" novalidate>
                    <Field
                        type="text"
                        name="form_title"
                        v-model="honeypot"
                        autocomplete="off"
                        tabindex="-1"
                        class="hidden"
                    />

                    <div
                        class="flex flex-col md:flex-row items-center gap-5 mb-5"
                    >
                        <div class="relative w-full md:w-72">
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                v-model="name"
                                placeholder="Ваше имя"
                                :class="{ error: errors.name && meta.touched }"
                                class="bg-white rounded-2xl text-base focus:outline-4 focus:outline-primary w-full px-5 h-[54px]"
                                @blur="meta.touched = true"
                                required
                            />
                            <span
                                v-if="errors.name && meta.touched"
                                class="absolute -bottom-6 left-5 error-message"
                            >
                                {{ errors.name }}
                            </span>
                        </div>

                        <div class="relative w-full md:w-72">
                            <Field
                                id="phone"
                                name="phone"
                                v-model="phone"
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                                :class="{ error: errors.phone && meta.touched }"
                                @input="onPhoneInput"
                                maxlength="18"
                                @blur="meta.touched = true"
                                class="bg-white rounded-2xl text-base focus:outline-4 focus:outline-primary w-full px-5 h-[54px]"
                                required
                            />
                            <span
                                v-if="errors.phone && meta.touched"
                                class="absolute -bottom-6 left-5 error-message"
                            >
                                {{ errors.phone }}
                            </span>
                        </div>

                        <button
                            class="group px-7 h-[54px] w-full md:w-fit text-lg shrink-0 flex items-center justify-center font-normal rounded-xl hover:cursor-pointer transition-all duration-300 ease-in select-none bg-primary text-white hover:shadow-[0_5px_15px_rgba(188,199,255,0.75)] shadow-none gap-2"
                            type="submit"
                            :disabled="isLoading"
                        >
                            {{ isLoading ? "Отправка..." : "Отправить" }}
                            <svg
                                class="w-6 h-6 transition-transform duration-300"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="transition-all duration-300 fill-white group-hover:fill-white group-hover:translate-x-1"
                                    d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="relative flex items-center">
                        <div class="relative inline-flex items-center gap-2">
                            <label
                                class="flex items-center cursor-pointer relative"
                            >
                                <Field
                                    name="consent"
                                    type="checkbox"
                                    v-model="consent"
                                    :checked="values.consent"
                                    @change="
                                        setFieldValue(
                                            'consent',
                                            ($event.target as HTMLInputElement)
                                                .checked,
                                        )
                                    "
                                    class="peer h-5 w-5 bg-white cursor-pointer transition-all appearance-none rounded-full border border-slate-300 checked:bg-primary checked:border-primary"
                                    id="consent"
                                />
                                <span
                                    class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-3.5 w-3.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-width="1"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                            </label>
                            <span
                                class="consent-text"
                                v-html="data.consent_text"
                            ></span>
                            <span
                                v-if="errors.consent && meta.touched"
                                class="absolute -bottom-5 left-7 error-message"
                            >
                                {{ errors.consent }}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div
                v-else
                class="flex flex-1 justify-center items-center text-2xl font-bold text-secondary-dark"
                v-html="data.success_message"
            ></div>
        </div>
        <div class="absolute right-16 -top-20 h-96 opacity-10 lg:opacity-20">
            <img src="/images/envelope.png" class="h-full w-full shrink-0" />
        </div>
    </div>
</template>

<style scoped>
/* Стили идентичны версии с Zod */
.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="tel"] {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.form-group input.error {
    border-color: #ef4444;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
}

.error-message {
    display: block;
    color: #446fef;
    font-size: 0.875rem;
}

.consent {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    margin-top: 0.25rem;
    width: 1.125rem;
    height: 1.125rem;
}

.consent-text {
    font-size: 0.875rem;
    color: var(--color-secondary);
    line-height: 1.4;
}

.consent-text :deep(a) {
    color: #3b82f6;
    text-decoration: none;
}

.consent-text :deep(a:hover) {
    text-decoration: underline;
}

.submit-btn {
    width: 100%;
    padding: 0.875rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
    background: #2563eb;
}

.submit-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

.success {
    text-align: center;
    padding: 2rem;
    background: #f0fdf4;
    border-radius: 0.75rem;
    border: 1px solid #bbf7d0;
}
</style>
