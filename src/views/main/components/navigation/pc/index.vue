<template>
    <div class=" bg-white sticky top-0 left-0 w-full z-10">

        <ul class=" w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
            :class="[isOpenCategory ? '' : 'h-[56px]']">
            <li class=" absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
                @click="triggerState">
                <daisy-svg-icon :name="isOpenCategory ? 'fold' : 'unfold'" class="size-1" fillClass></daisy-svg-icon>
            </li>
            <li v-for="(item, index) in useCategroyStore().categoryList" :key="item.id"
                class=" shrink-0 px-1 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
                :class="{ 'text-zinc-900 bg-zinc-200': currentCategoryIndex === index }" @click="onItemCLick(index)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>
<script setup >
import useCategroyStore from '@/store/modules/category'

const isOpenCategory = ref(false)
const triggerState = () => {
    isOpenCategory.value = !isOpenCategory.value
}

const currentCategoryIndex = ref(0)
const onItemCLick = (index) => {
    currentCategoryIndex.value = index
}

</script>
<style lang="scss" scoped></style>
