<template>
  <div class="guide-search  w-full">
    <daisy-search v-model="inputValue" @search="onSearchHandler" @clear="onSearchHandler">
      <template #dropdown>
        <div>
          <hint-vue :search-text="inputValue" v-show="inputValue" @itemClick="onSearchHandler"></hint-vue>
          <history-vue v-show="!inputValue" @itemClick='onSearchHandler'></history-vue>
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </daisy-search>
  </div>
</template>
<script setup >
import hintVue from './hint.vue';
import historyVue from './history.vue';
import themeVue from './theme.vue';
import useSearchStore from '@/store/modules/search'

const searchStore = useSearchStore()

const inputValue = ref("")

const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    searchStore.addHistory(val)
    searchStore.changeSearchText(val)
  }
}
</script>
<style lang="scss" scoped></style>
