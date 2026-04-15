<script setup lang="ts"></script>

<template>
    <div class="relative">
        <div v-motion-fade-visible-once :delay="2000" class="circle2 h-[300px] w-[300px] md:h-[500px] md:w-[500px]"></div>
        <div v-motion-fade-visible-once :delay="1000" class="circle1 h-[300px] w-[300px] md:h-[400px] md:w-[400px]"></div>
    </div>
</template>

<style scoped>
.circle1 {
    position: relative;
    top: 50px;
    background-color: #e373ff;
    border-radius: 50%;
    opacity: 0.9;
    filter: blur(50px);
    /* mix-blend-mode: lighten; */
    animation: float 9s ease-in-out infinite;
}
.circle2 {
    position: absolute;
    top: 120px;
    background-color: #87d1ff;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.9 !important;
    mix-blend-mode: lighten;
    animation: float 10s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translate3D(0px, 0px, 0px);
    }
    50% {
        transform: translate3D(100px, -50px, 100px);
    }
    100% {
        transform: translate3D(0px, 0px, 0px);
    }
}
</style>
