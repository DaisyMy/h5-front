<template>
    <div class=" bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1" @click="onToPinsClick">
        <div class="relative w-full rounded cursor-zoom-in group" :style="{
            backgroundColor: randomRGB()
        }">
            <img v-lazy ref="imgTarget" class=" w-full rounded bg-transparent" :src="data.photo" :style="{
                height: (width / data.photoWidth) * data.photoHeight + 'px'
            }">
            <div
                class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block">
                <daisy-button class=" absolute top-1.5 left-1.5">分享</daisy-button>
                <daisy-button class=" absolute top-1.5 right-1.5" type="info" icon="heart"
                    iconClass="fill-zinc-900 dark:fill-zinc-200" />
                <daisy-button class=" absolute bottom-1.5 left-1.5 bg-zinc-100/70" type="info" size="small" icon="download"
                    iconClass="fill-zinc-900 dark:fill-zinc-200" @click.stop="onDownload" />
                <daisy-button class=" absolute bottom-1.5 right-1.5 bg-zinc-100/70" type="info" size="small" icon="full"
                    iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onImgFullScreen" />
            </div>
        </div>
        <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1">{{ data.title }}</p>
        <div class=" flex items-center mt-1 px-1">
            <img v-lazy :src="data.avatar" class="w-2 h-2 rounded-full" />
            <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
        </div>
    </div>
</template>
<script setup >
import { randomRGB } from '@/utils/color'
import { message } from '@/libs'
import { useFullscreen, useElementBounding } from '@vueuse/core'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    width: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits(['click'])
const imgTarget = ref(null)
const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
} = useElementBounding(imgTarget)

const imgContainerCenter = computed(() => {
    return {
        translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
        translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
    }
})

const onDownload = () => {
    message('success', '图片开始下载')
}


const { enter: onImgFullScreen } = useFullscreen(imgTarget)

const onToPinsClick = () => {
    emits('click', { id: props.data.id, location: imgContainerCenter.value })
}
</script>
