<template>
    <div class=" relative" ref="containerTarget" :style="{ height: containerHeight + 'px' }">
        <template v-if="columnWidth && data.length">
            <div class=" m-waterfall-item absolute duration-300" v-for="(item, index) in data"
                :key="nodeKey ? item[nodeKey] : index" :index="index" :style="{
                    width: columnWidth + 'px', left: item._style?.left + 'px', top: item._style?.top + 'px'
                }">
                <slot :item="item" :width="columnWidth" :index="index"> </slot>
            </div>
        </template>
        <div v-else>加载中……</div>
    </div>
</template>
<script setup >
const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => [],
    },
    nodeKey: {
        type: String,
    },
    column: {
        type: Number,
        default: 2,
    },
    columnSpacing: {
        type: Number,
        default: 20,
    },
    rowSpacing: {
        type: Number,
        default: 20,
    },
    // 图片预读取
    picturePreReading: {
        type: Boolean,
        default: true,
    }
})

const containerHeight = ref(0)
const columnHeightObj = ref({})
const useColumnHeightObj = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
        columnHeightObj.value[i] = 0
    }
}

const containerTarget = ref()
const containerWidth = ref(0)
const containerLeft = ref(0)
const useContainerWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
    containerLeft.value = parseFloat(paddingLeft)
    containerWidth.value = containerTarget.value.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

const columnWidth = ref(0)
const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing
})
const useColumnWidth = () => {
    useContainerWidth()
    columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
    useColumnWidth()
    console.log(columnWidth.value);
})
</script>
