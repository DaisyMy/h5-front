<template>
      <mobile-navigation-vue v-if="isMobileTerminal" :data="categorysData"></mobile-navigation-vue>
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'

import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'

const categorysData = ref([])

const getCategoryData = async () => {
      const { categorys } = await getCategory()
      categorysData.value = categorys
}
getCategoryData()
</script>