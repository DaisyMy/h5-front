<template>
    <div class=" w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
        :class="[sticky ? 'sticky top-0 left-0' : 'relative']">
        <div class="h-full w-5 absolute left-0 flex items-center justify-center" @click="onClickLeft">
            <slot name="left">
                <daisy-svg-icon name="back" class="size-2" fillClass="fill-zinc-900 dark:fill-zinc-200"></daisy-svg-icon>
            </slot>
        </div>
        <div class="h-full flex items-center justify-center m-auto font-bold text-base  text-zinc-900 dark:text-zinc-200">
            <slot></slot>
        </div>
        <div class="h-full w-5 absolute right-0 flex items-center justify-center" @click="onClickRight">
            <slot name="right">
            </slot>
        </div>
    </div>
</template>
<script setup >
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    clickLeft: {
        type: Function,
    },
    clickRight: {
        type: Function,
    },
    sticky: {
        type: Boolean,
    }
})

const onClickLeft = () => {
    if (props.clickLeft) {
        props.clickLeft()
        return
    }
    router.back()
}

const onClickRight = () => {
    if (props.clickRight) {
        props.clickRight()
        return
    }
    router.back()
}
</script>
<style lang="scss" scoped></style>
