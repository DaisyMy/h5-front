<template>
    <div class="h-screen dark:bg-zinc-800">
        <header-vue class="h-header"></header-vue>
        <div class="h-main">
            <main-vue></main-vue>
        </div>
        <floating-vue></floating-vue>
    </div>
</template>
<script setup >
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue';
import floatingVue from './components/floating/index.vue';
</script>
<style lang="scss" scoped></style>

