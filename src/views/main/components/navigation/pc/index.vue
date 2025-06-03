<template>
    <div class=" dark:bg-zinc-800 bg-white sticky top-0 left-0 w-full z-10">
        <ul class=" w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
            :class="[isOpenCategory ? '' : 'h-[56px]']">
            <li class=" dark:hover:bg-zinc-800 absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
                @click="triggerState">
                <daisy-svg-icon :name="isOpenCategory ? 'fold' : 'unfold'" class="size-1" fillClass="dark:fill-zinc-300"></daisy-svg-icon>
            </li>
            <li v-for="(item, index) in useCategroyStore().categoryList" :key="item.id"
                class="dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900 shrink-0 px-1 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
                :class="{ 'dark:text-zinc-500 dark:bg-zinc-900 text-zinc-900 bg-zinc-200': currentCategoryIndex === index }" @click="onItemClick(item,index)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>
<script setup >
import useCategroyStore from '@/store/modules/category'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const isOpenCategory = ref(false)
const triggerState = () => {
    isOpenCategory.value = !isOpenCategory.value
}

const currentCategoryIndex = ref(0)
const onItemClick = (item, index) => {
    currentCategoryIndex.value = index
    appStore.changeCurrentCategory(item)
}

</script>
<style lang="scss" scoped></style>
