<template>
      <mobile-navigation-vue v-if="isMobileTerminal" :data="categorysData"></mobile-navigation-vue>
</template>

<script setup>
import mobileNavigationVue from './mobile/index.vue'

import { ALL_CATEGORY_ITEM } from '@/constants/index.js'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'

const categorysData = ref([])

const getCategoryData = async () => {
      const { categorys } = await getCategory()
      categorysData.value = [ALL_CATEGORY_ITEM, ...categorys]
}
getCategoryData()
</script>