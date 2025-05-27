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
    </div>
</template>
<script setup >
import { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
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
        console.log('offsetHeight',el.offsetHeight);
        itemHeights.push(el.offsetHeight)
    })
    useItemLocation()
}
const getItemLeft = () => {
    const column = getMinHeightColumn(columnHeightObj.value)
    const left = column * (columnWidth.value + props.columnSpacing) + containerLeft.value
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

onUnmounted(() => {
    props.data.forEach(item => {
        delete item._style
    })
})

watch(() => props.data, (newVal) => {
    const resetColumnHeight = newVal.every(item => !item._style)
    if (resetColumnHeight) {
        useColumnHeightObj()
    }
    nextTick(() => {
        console.log('picturePreReading',props.picturePreReading);
        if (props.picturePreReading) {
            console.log('@@@1');
            waitImgComplate()
        } else {
            console.log('@@@2');
            // waitImgComplate()
            useItemHeight()
        }
    })
}, {
    deep: true,
    immediate: true
})

const reset = () => {
    setTimeout(() => {
        console.log('setTimeout');
        useColumnWidth()
        props.data.forEach(item => {
            item._style = null
        })
    }, 1000)
}

watch(() => props.column, () => {
    if (props.picturePreReading) {
        columnWidth.value = 0
        nextTick(()=>{
            console.log('next');
            reset()
        })
    } else {
        reset()
    }
})

</script>
