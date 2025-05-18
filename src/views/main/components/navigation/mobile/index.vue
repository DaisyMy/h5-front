<template>
    <div class=" bg-white sticky top-0 left-0 z-10">
        <ul ref="ulTarget" class=" relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
            <li ref="hamburger"
                class=" shadow-l-white z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shrink-0">
                <daisy-svg-icon class=" w-1.5 h-1.5" name="hamburger" @click="isOpenPopup = !isOpenPopup"></daisy-svg-icon>
            </li>
            <li ref="sliderTarget" class=" absolute h-[22px] bg-zinc-900 rounded-lg duration-200" :style="sliderStyle"></li>
            <li v-for="(item, index) in data" :key="item.id" :class="{ 'text-zinc-100': currentCategoryIndex === index }"
                class=" shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4" :ref="setItemRef"
                @click="handleItemClick(index)">{{ item.name }}</li>
        </ul>
        <daisy-popup v-model="isOpenPopup">
            <menu-vue :cagegorys="data" @onItemClick="handleItemClick" :currentIndex="currentCategoryIndex"></menu-vue>
        </daisy-popup>
    </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core';

import menuVue from '../../menu/index.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

let itemRefs = []

const isOpenPopup = ref(false)
const sliderStyle = ref({
    transform: 'translateX(0px)',
    width: '50px'
})
const currentCategoryIndex = ref(0)
const ulTarget = ref(null)
const hamburger = ref(null)

const setItemRef = (el) => {
    if (el) {
        itemRefs.push(el)
    }
}

const sliderScroll = (index) => {
    const tagretWidth = ulTarget.value.getBoundingClientRect().width - hamburger.value.getBoundingClientRect().width
    const { left: itemLeft, width: itemWidth } = itemRefs[index].getBoundingClientRect()
    if (itemLeft < 0) {
        let left = ulTarget.value.scrollLeft + itemLeft - 10
        ulTarget.value && ulTarget.value.scrollTo({ left, behavior: 'smooth' })
    } else if (itemLeft + itemWidth > tagretWidth) {
        let left = ulTarget.value.scrollLeft + itemLeft + itemWidth - tagretWidth
        ulTarget.value && ulTarget.value.scrollTo({ left, behavior: 'smooth' })
    }
}

const handleItemClick = (index) => {
    currentCategoryIndex.value = index
    isOpenPopup.value && (isOpenPopup.value = false)
    sliderScroll(index)
}

const { x: ulScrollLeft } = useScroll(ulTarget)

onBeforeMount(() => {
    itemRefs = []
})

watch(currentCategoryIndex, (newIndex) => {
    const { left, width } = itemRefs[newIndex].getBoundingClientRect()
    sliderStyle.value = {
        transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
        width: `${width}px`
    }
})


</script>