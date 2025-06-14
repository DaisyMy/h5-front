<template>
  <div class=" h-screen fixed top-0 left-0 w-screen">
    <!-- <router-view></router-view> -->
    <daisy-transition-router-view mainComponentName="home"
      :routerType="useAppStore().routerType"></daisy-transition-router-view>
  </div>
</template>

<script setup>
import useAppStore from '@/store/modules/app';

</script>

<style scoped></style>
