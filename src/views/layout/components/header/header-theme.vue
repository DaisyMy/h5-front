<template>
  <daisy-popover>
    <template #reference>
      <daisy-svg-icon :name="svgIconName"
        class="guide-theme  dark:hover:bg-zinc-900 guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        fillClass=" dark:fill-zinc-300 fill-zinc-900"></daisy-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div class="dark:hover:bg-zinc-800 flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in themeList" :key="item.id" @click="onChangeTheme(item.type)">
        <daisy-svg-icon :name="item.icon" class=" size-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"></daisy-svg-icon>
        <span class=" text-zinc-500 dark:text-zinc-300 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </daisy-popover>
</template>
<script setup >
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import useThemeStore from '@/store/modules/theme'

const themeStore = useThemeStore()
// 构建渲染数据源
const themeList = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const onChangeTheme = (type) => {
  themeStore.changeThemeType(type)
}

const svgIconName = computed(() => {
  const findName = themeList.find(item => {
    return item.type === themeStore.theme
  })
  return findName?.icon || 'theme-light'
})
</script>
<style lang="scss" scoped></style>
