<template>
      <mobile-navigation-vue v-if="isMobileTerminal"></mobile-navigation-vue>
      <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'

import { isMobileTerminal } from '@/utils/flexible'
import useCategroyStore from '@/store/modules/category'

const categroyStore = useCategroyStore()

categroyStore.useCategoryData()

</script>