<template>
    <div class=" py-2 h-[80vh] flex flex-col">
        <h2 class=" text-xl text-zinc-900 font-bold mb-2 px-1">所有分类{{ currentIndex }}</h2>
        <ul ref="cagegoryList" class=" overflow-y-scroll" id="menu_cagegory_list">
            <li v-for="(item, index) in cagegorys" :key="item.id"
                class="text-lg  px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
                :class="{ 'text-amber-50 bg-gray-900': index === currentIndex, 'text-zinc-900': index !== currentIndex }"
                @click="handleClick(index)">{{
                    item.name }}</li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    cagegorys: {
        type: Array,
        required: true
    },
    currentIndex: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits(['onItemClick'])

const cagegoryList = ref(null)

const handleClick = (index) => {
    emits('onItemClick', index)
}

const listScroll = () => {
    let dom = document.querySelector('#menu_cagegory_list>li')
    if (dom) {
        let itemHeigth = dom.offsetHeight
        cagegoryList.value.scrollTop = itemHeigth * (props.currentIndex - 1)
    }
}

onMounted(() => {
    listScroll()
})
</script>