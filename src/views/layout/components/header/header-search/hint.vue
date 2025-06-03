<template>
    <div>
        <div v-for="(item, index) in hintData" :key="index"
            class=" py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
            @click="onItemClick(item)" v-html="highlightText(item)">
        </div>
    </div>
</template>
<script setup >
import { watchDebounced } from '@vueuse/core'
import { getHint } from '@/api/pexels';

const EMITS_ITEM_CLICK = 'itemClick'

const props = defineProps({
    searchText: {
        type: String,
        required: true,
    }
})

const emits = defineEmits([EMITS_ITEM_CLICK])

const hintData = ref([])
const getHintData = async () => {
    if (!props.searchText) return
    const { result } = await getHint(props.searchText)
    hintData.value = result
}

watchDebounced(() => props.searchText, getHintData, { immediate: true, debounce: 500 })

const onItemClick = (item) => {
    emits(EMITS_ITEM_CLICK, item)
}

const highlightText = (text) => {
    const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
    const reg = new RegExp(props.searchText, 'gi')
    return text.replace(reg, highlightStr)
}
</script>
<style lang="scss" scoped></style>
