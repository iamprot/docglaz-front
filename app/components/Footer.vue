<script setup lang="ts">
import type { NavigationItem, DirectusFile } from "#shared/types/schema";

const props = defineProps<{
    globals: any;
    footer: any;
    navigation: any;
}>();

const { getIcon } = useSocialIcons();

// Navigation
// Разделяем навигацию на колонки (если нужно)
const navColumns = computed(() => {
    const items = props.navigation.items;
    const midPoint = Math.ceil(items.length / 2);
    return [items.slice(0, midPoint), items.slice(midPoint)];
});

// Footer Data Policy
const documents = computed(() =>
  (Array.isArray(props.footer?.items) ? props.footer.items : [])
    .filter(
      (item: any): item is NavigationItem =>
        !!item &&
        typeof item === "object" &&
        (
          (item.type === "page" && !!item.page && typeof item.page === "object") ||
          (item.type === "file" && !!item.file && typeof item.file === "object")
        )
    )
    .sort((a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0))
);

const { getUrl } = useDocFile();

const isFileDoc = (
    doc: NavigationItem,
): doc is NavigationItem & { file: DirectusFile } => {
    return (
        doc.type === "file" && typeof doc.file === "object" && doc.file !== null
    );
};

// Phone & Email obfuscation
const phoneEl = ref<HTMLElement | null>(null);
const emailEl = ref<HTMLElement | null>(null);

const telLink = computed(() => {
    return "tel:" + props.globals.phone.replace(/\D/g, ""); // "tel:74872600610"
});

const reversedPhone = computed(() => {
    return props.globals.phone.split("").reverse().join("");
});

const reversedEmail = computed(() => {
    return props.globals.email.split("").reverse().join("");
});

onMounted(() => {
    if (phoneEl.value) {
        phoneEl.value.textContent = props.globals.phone;
    }
    if (emailEl.value) {
        emailEl.value.textContent = props.globals.email;
    }
});
</script>

<template>
    <footer class="mt-[100px] mx-auto py-16 bg-white rounded-t-smooth w-full">
        <BaseContainer>
            <div
                class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
                <!-- block 1 -->
                <div
                    class="col-span-1 lg:col-span-4 flex justify-center md:justify-start"
                >
                    <div
                        class="flex flex-col space-y-12 items-center md:items-start"
                    >
                        <div class="flex">
                            <img
                                :src="`${$config.public.directusUrl}/assets/${globals.logo_full}`"
                                :alt="globals.logo_full.title"
                                class="min-w-40 w-40 lg:w-48 lg:min-w-48 shrink-0"
                            />
                        </div>

                        <ul
                            class="text-base text-secondary-dark text-center flex flex-col justify-center md:justify-start items-center md:items-start space-y-4"
                        >
                            <li class="flex gap-2 items-center">
                                <component
                                    :is="getIcon('location')"
                                    v-if="getIcon('location')"
                                    class="w-6 h-6"
                                />
                                <span>
                                    {{ globals.address }}
                                </span>
                            </li>
                            <li class="flex gap-2 items-center">
                                <component
                                    :is="getIcon('phone')"
                                    v-if="getIcon('phone')"
                                    class="w-6 h-6"
                                />
                                <a :href="telLink">
                                    <span ref="phoneEl" data-encoded="">
                                        {{ reversedPhone }}
                                    </span>
                                </a>
                            </li>
                            <li class="flex gap-2 items-center">
                                <component
                                    :is="getIcon('email')"
                                    v-if="getIcon('email')"
                                    class="w-6 h-6"
                                />
                                <a
                                    :href="`mailto:${globals.email}`"
                                    data-encoded=""
                                >
                                    <span ref="emailEl" data-encoded="">
                                        {{ reversedEmail }}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- block 2-->
                <div class="col-span-1 lg:col-span-4 flex justify-start">
                    <div class="grid grid-cols-2 gap-8 w-full">
                        <div
                            v-for="(column, colIndex) in navColumns"
                            :key="colIndex"
                        >
                            <ul
                                class="flex flex-col items-center md:items-start space-y-8"
                            >
                                <li v-for="item in column" :key="item.id">
                                    <NuxtLink
                                        :to="`/${item.page?.permalink}`"
                                        class="text-secondary text-base hover:text-primary transition-colors duration-300"
                                    >
                                        {{ item.title }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- block 3-->
                <div class="col-span-1 lg:col-span-4 flex justify-start">
                    <div
                        class="flex flex-col space-y-8 items-center md:items-start"
                    >
                        <ul
                            class="flex flex-col items-center md:items-start space-y-6 text-center md:text-left"
                        >
                            <li v-for="(doc, idx) in documents" :key="idx">
                                <!-- Если это ссылка на страницу -->
                                <NuxtLink
                                    v-if="
                                        doc.type === 'page' &&
                                        typeof doc.page === 'object'
                                    "
                                    :to="`/${doc.page?.permalink}`"
                                    class="text-black/50 underline hover:no-underline block"
                                >
                                    {{ doc.page?.title }}
                                </NuxtLink>

                                <!-- Если это PDF файл -->
                                <div
                                    v-if="isFileDoc(doc)"
                                    class="flex flex-row items-start md:items-center gap-2"
                                >
                                    <BaseIconsPdf class="shrink-0"/>
                                    <a
                                        :href="getUrl(doc.file)"
                                        :download="doc.file.filename_download"
                                        target="_blank"
                                        class="text-black/50 underline hover:no-underline block"
                                    >
                                        {{ doc.file.title }}
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <div
                            class="text-balance text-sm text-center md:text-left text-black/50"
                        >
                            Сайт носит исключительно информационный характер и
                            ни при каких условиях не является публичной офертой.
                            Чтобы получить подробную информацию о стоимости
                            услуг, обращайтесь, пожалуйста, к администраторам
                            клиники «ДОКГЛАЗ».
                        </div>

                        <div>
                            <ul v-if="globals.social_links" class="flex gap-4">
                                <li
                                    v-for="(item, idx) in globals.social_links"
                                    :key="idx"
                                >
                                    <NuxtLink
                                        :to="item.url"
                                        class="social-link"
                                    >
                                        <component
                                            :is="getIcon(item.service)"
                                            v-if="getIcon(item.service)"
                                            class="w-6 h-6"
                                        />
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex flex-col md:flex-row gap-4 mt-6 text-black/50 items-center justify-center md:justify-between"
            >
                <div>© {{ new Date().getFullYear() }}, {{ globals.title }}</div>
                <div
                    class="flex gap-1 items-center text-sm text-center md:text-left"
                >
                    сделано в
                    <NuxtLink to="https://purplemoon.ru">
                        <NuxtImg
                            class="inline-block"
                            src="/icons/pm.svg"
                            width="24"
                            height="24"
                        />
                    </NuxtLink>
                </div>
            </div>
        </BaseContainer>
    </footer>
</template>

<style scoped></style>
