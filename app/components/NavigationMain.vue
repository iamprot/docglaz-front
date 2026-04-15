<script setup lang="ts">
const props = defineProps<{
    navigation: any;
    globals: any;
}>();

const { getIcon } = useSocialIcons();

onUnmounted(() => {
    document.body.style.overflow = "";
});

const isDrawerOpen = ref<boolean>(false);

const toggleBodyScroll = (disable: boolean) => {
    if (disable) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
};

watch(isDrawerOpen, (newVal) => {
    toggleBodyScroll(newVal);
});

// Handle Scroll
const isHidden = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Скроллим вниз
        isHidden.value = true;
    } else {
        // Скроллим вверх
        isHidden.value = false;
    }
    lastScrollY = currentScrollY;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

// Phone & Email obfuscation

const phoneElMain = ref<HTMLElement | null>(null);
const phoneEl = ref<HTMLElement | null>(null);
const emailEl = ref<HTMLElement | null>(null);

const telLink = computed(() => {
    return "tel:+" + props.globals.phone.replace(/\D/g, ""); // "tel:74872600610"
});

const reversedPhone = computed(() => {
    return props.globals.phone.split("").reverse().join("") ?? "";
});

const reversedEmail = computed(() => {
    return props.globals.email.split("").reverse().join("") ?? "";
});

onMounted(() => {
    if (phoneElMain.value) {
        phoneElMain.value.textContent = props.globals.phone;
    }
    if (phoneEl.value) {
        phoneEl.value.textContent = props.globals.phone;
    }
    if (emailEl.value) {
        emailEl.value.textContent = props.globals.email;
    }
});
</script>

<template>
    <header
        class="z-30 relative"
        :class="[
            'sticky top-0 w-full transition-all duration-300',
            isHidden && !isDrawerOpen ? '-translate-y-full' : 'translate-y-0',
        ]"
    >
        <div
            class="flex w-full h-20 md:h-[100px] items-center justify-center bg-white/80 backdrop-blur-lg z-50 top-0 border-b border-secondary/20"
        >
            <div
                class="flex container max-w-screen-xl px-4 lg:px-16 justify-between items-center"
            >
                <div class="flex gap-6 md:gap-8 lg:gap-12 items-center">
                    <NuxtLink to="/">
                        <img
                            :src="`${$config.public.directusUrl}/assets/${globals.logo_short}`"
                            :alt="globals.logo_short.title"
                            class="min-w-40 w-40 lg:w-48 lg:min-w-48 shrink-0"
                        />
                    </NuxtLink>

                    <!-- PC Menu -->

                    <nav
                        v-if="navigation?.items"
                        class="hidden md:flex items-center"
                    >
                        <ul class="flex gap-4 lg:gap-6 font-medium text-base">
                            <li v-for="item in navigation.items" :key="item.id">
                                <NuxtLink
                                    :to="
                                        item.page?.permalink
                                            ? `/${item.page.permalink}`
                                            : item.url || '/'
                                    "
                                    class="text-secondary hover:text-primary transition-colors duration-300 ease-in-out"
                                >
                                    <span class="whitespace-nowrap">{{
                                        item.title
                                    }}</span>
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div
                    class="flex items-center gap-2 lg:gap-4 w-full justify-end pr-4"
                >
                    <div class="hidden xl:flex items-center gap-2 shrink-0">
                        <component
                            v-if="getIcon('phoneprimary')"
                            :is="getIcon('phoneprimary')"
                            class="hidden md:block w-6 h-6"
                        />
                        <a :href="`${telLink}`">
                            <span
                                class="text-primary font-medium text-lg lg:text-2xl"
                                ref="phoneElMain"
                                data-encoded=""
                            >
                                {{ reversedPhone }}
                            </span>
                        </a>
                    </div>

                    <ul
                        v-if="globals.social_links"
                        class="hidden min-[864px]:flex gap-4 pl-6"
                    >
                        <li
                            v-for="(item, idx) in globals.social_links"
                            :key="idx"
                        >
                            <NuxtLink :to="item.url" class="social-link">
                                <component
                                    :is="getIcon(item.service)"
                                    v-if="getIcon(item.service)"
                                    class="w-6 h-6"
                                />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <button
                    type="button"
                    class="md:hidden hover:cursor-pointer"
                    @click="isDrawerOpen = true"
                    aria-label="Открыть меню"
                >
                    <BaseIconsMenu />
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <Teleport to="body">
            <aside
                class="fixed md:hidden inset-y-0 bg-white top-0 left-0 w-full h-screen py-6 px-6 z-50 ease-in-out transition-transform duration-300"
                :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
            >
                <div class="flex justify-end">
                    <button type="button" @click="isDrawerOpen = false" aria-label="Закрыть меню">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="var(--color-secondary)"
                                d="M27.3135 6.10059L17.4141 16L27.3135 25.8994L25.8994 27.3135L16 17.4141L6.10059 27.3135L4.68652 25.8994L14.5859 16L4.68652 6.10059L6.10059 4.68652L16 14.5859L25.8994 4.68652L27.3135 6.10059Z"
                            />
                        </svg>
                    </button>
                </div>
                <div class="w-full flex items-center justify-center mt-10">
                    <img
                        :src="`${$config.public.directusUrl}/assets/${globals.logo_short}`"
                        class="h-8"
                        :alt="globals.logo_short.title"
                    />
                </div>
                <nav class="flex flex-col items-center h-full">
                    <ul
                        class="flex flex-col items-center justify-between text-lg h-full mt-12"
                    >
                        <li
                            v-for="(item, idx) in navigation.items"
                            :key="idx"
                            class="group relative"
                            @click="isDrawerOpen = false"
                        >
                            <NuxtLink
                                :to="
                                    item.page?.permalink
                                        ? `/${item.page.permalink}`
                                        : item.url || '/'
                                "
                            >
                                <span
                                    class="text-secondary hover:text-primary transition-colors duration-300 ease-in-out"
                                >
                                    {{ item.title }}
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                    <div
                        class="flex flex-col items-center justify-center mt-10 mb-42 border-t border-t-black/10 py-8"
                    >
                        <ul
                            class="text-base text-black/50 text-center items-center flex flex-col justify-center space-y-4"
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
                </nav>
            </aside>
        </Teleport>
    </header>
</template>

<style scoped></style>
