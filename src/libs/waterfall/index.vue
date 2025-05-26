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
import { nextTick } from 'vue';
import { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
import { get } from '@vueuse/core';
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
    console.log('columnWidth', columnWidth.value);
})

let itemHeights = []

const waitImgComplate = () => {
    itemHeights = []
    let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
    const imgElements = getImgElements(itemElements)
    const allImgs = getAllImg(imgElements)
    onComplateImgs(allImgs).then(() => {
        itemElements.forEach(el => {
            itemHeights.push(el.offsetHeight)
        })
        useItemLocation()
    })
}

const useItemHeight = () => {
    itemHeights = []
    let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
    itemElements.forEach(el => {
        itemHeights.push(el.offsetHeight)
    })
    useItemLocation()
}
const getItemLeft = () => {
    const column = getMinHeightColumn(columnHeightObj.value)
    const left = column * (columnWidth.value + props.columnSpacing) + containerLeft.value
    console.log('left', left);
    return left
}

const getItemTop = () => {
    return getMinHeight(columnHeightObj.value)
}

const increasingHeight = (index) => {
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}

const useItemLocation = () => {
    console.log('itemHeights', itemHeights);
    props.data.forEach((item, index) => {
        if (item._style) return
        item._style = {}
        item._style.left = getItemLeft()
        item._style.top = getItemTop()
        // 指定列高度自增
        increasingHeight(index)
    })

    containerHeight.value = getMaxHeight(columnHeightObj.value)
}



watch(() => props.data, (newVal) => {
    const resetColumnHeight = newVal.every(item => !item._style)
    if (resetColumnHeight) {
        useColumnHeightObj()
    }
    nextTick(() => {
        if (props.picturePreReading) {
            waitImgComplate()
        } else {
            useItemHeight()
        }
    })
}, {
    deep: true,
    immediate: true
})

onUnmounted(() => {
    props.data.forEach(item => {
        delete item._style
    })
})

</script>
