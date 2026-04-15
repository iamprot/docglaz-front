<script setup lang="ts">
interface HeadlineProps {
    headline?: string | null;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'form_header';
}

const props = withDefaults(defineProps<HeadlineProps>(), {
    as: 'h2',
});

// Классы для разных типов заголовков
const headlineClasses = computed(() => {
    const classes = {
        h1: 'text-primary text-4xl md:text-[44px] lg:text-[54px] font-bold leading-tight',
        h2: 'text-secondary-dark text-3xl md:text-[36px] lg:text-[44px] font-semibold',
        h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
        h4: 'text-2xl md:text-2xl lg:text-3xl font-semibold',
        form_header: 'text-3xl font-bold lg:text-[44px] lg:font-semibold text-primary'
    };
    return classes[props.as] || classes.h2;
});
</script>

<template>
	<component
		:is="as"
		v-if="headline"
		:class="headlineClasses"
	>
		{{ headline }}
	</component>
</template>