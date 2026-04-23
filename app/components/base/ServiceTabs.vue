<script setup lang="ts">
// Определяем типы для пропсов
// 1. Четко определяем интерфейсы
interface ListItem {
    item?: string;
    step?: string;
}

interface ServiceData {
    details?: string;
    symptoms?: ListItem[];
    process?: ListItem[];
    methods?: string;
}

const props = defineProps<{
    service: ServiceData;
}>();

const activeTab = ref<string>("");

// 2. Создаем отдельный интерфейс для конфигурации вкладки, чтобы избежать объединения типов внутри массива
interface TabConfig {
    key: string;
    label: string;
    data: ListItem[] | string | null | undefined; // Данные могут быть массивом или строкой
    type: "list" | "steps" | "text";
}

const tabsConfig = computed<TabConfig[]>(() => {
    const rawConfig: TabConfig[] = [
        {
            key: "details",
            label: "Описание",
            data: props.service.details,
            type: "text"
        },
        {
            key: "symptoms",
            label: "Когда это необходимо",
            data: props.service.symptoms,
            type: "list",
        },
        {
            key: "process",
            label: "Как проходит услуга",
            data: props.service.process,
            type: "steps",
        },
    ];

    // Фильтрация: оставляем только вкладки с данными
    const validTabs = rawConfig.filter((tab) => {
        if (tab.type === "text") {
            return typeof tab.data === "string" && tab.data.trim().length > 0;
        }
        return Array.isArray(tab.data) && tab.data.length > 0;
    });

    // Исправление ошибки "possibly undefined": проверяем длину перед доступом
    if (validTabs.length > 0 && !activeTab.value) {
        activeTab.value = validTabs?.[0]?.key as string;
    }

    return validTabs;
});

const container = ref<HTMLElement | null>(null)

const setActiveTab = async (key: string) => {
  activeTab.value = key
  await nextTick()

  if (!container.value) return

  const y = window.scrollY + container.value.getBoundingClientRect().top

  const offset = window.innerWidth >= 768 ? 0 : 75

  window.scrollTo({
    top: y - offset,
    behavior: 'smooth',
  })
}

// Хелпер для безопасного получения данных текущей вкладки
const getCurrentTabData = () => {
    return tabsConfig.value.find((t) => t.key === activeTab.value);
};

</script>

<template>
    <div id="container" ref="container" class="w-full mx-auto bg-white rounded-smooth">
        <!-- Навигация по вкладкам -->
        <div class="sticky top-0 md:relative bg-white/80 backdrop-blur-md z-20 flex flex-wrap justify-center md:justify-start md:rounded-smooth px-4 md:px-6 py-4 gap-2 rounded-smooth">
            <button
                v-for="tab in tabsConfig"
                :key="tab.key"
                @click="setActiveTab(tab.key)"
                :class="[
                    'rounded-smooth px-6 py-3 md:py-4 text-base md:text-lg transition-all duration-300 hover:cursor-pointer',
                    activeTab === tab.key
                        ? 'text-white bg-primary'
                        : 'text-secondary-dark bg-primary/10 hover:text-accent hover:bg-primary/20',
                ]"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Контент -->
        <div class="relative px-6 md:px-8 pb-6 md:pb-8 pt-2 md:pt-4 min-h-[100px]">

            <div v-if="activeTab === 'details'" class="animate-fade-in">
                <div
                    class="max-w-none text-lg v-html-content" 
                    v-html="getCurrentTabData()?.data"
                ></div>
            </div>

            <!-- Рендерим симптомы -->
            <div
                v-else-if="activeTab === 'symptoms'"
                class="animate-fade-in"
            >
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li
                        v-for="(entry, idx) in (getCurrentTabData()?.data as ListItem[])"
                        :key="idx"
                        :class="[
                            'flex items-center gap-3 p-4 rounded-smooth transition-colors duration-400 ease-in-out',
                            {
                                'bg-sky-50 hover:bg-sky-100': activeTab === 'symptoms',
                            }
                        ]"
                    >
                        <span
                            :class="[
                                'shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold',
                                {
                                    'bg-sky-200 text-sky-600': activeTab === 'symptoms',    
                                }
                            ]"
                        >
                            {{ idx + 1 }}
                        </span>
                        <!-- Теперь TS знает, что entry - это ListItem, поэтому .item доступен -->
                        <span class="text-black text-base md:text-lg v-html-content" v-html="entry.item"></span>
                    </li>
                </ul>
            </div>

            <!-- Логика рендеринга шагов (Process) -->
            <div v-else-if="activeTab === 'process'" class="animate-fade-in">
                <div
                    class="relative border-l-2 border-blue-200 border-dashed ml-3 space-y-8 pb-4"
                >
                    <div
                        v-for="(entry, index) in (getCurrentTabData()?.data as ListItem[])"
                        :key="index"
                        class="relative flex flex-col pl-8"
                    >
                        <span
                            class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary"
                        ></span>
                        <div id="step" class="w-fit rounded-lg px-3 py-1 text-base uppercase font-semibold text-secondary-dark/60 mb-2 leading-4 bg-primary/20">
                            Шаг {{ index + 1 }}
                        </div>
                        <p class="text-black v-html-content" v-html="entry.step"></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Простая анимация появления контента */
.animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
