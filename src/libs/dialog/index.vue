<template>
    <div>
        <transition name="fade">
            <div v-if="isVisable" @click="close" class=" w-screen h-screen bg-zinc-900/80 fixed top-0 left-0"></div>
        </transition>
        <transition name="up">
            <div v-if="isVisable"
                class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm dark:border-x-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]">
                <div v-if="title" class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
                <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
                    <slot></slot>
                </div>
                <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
                    <daisy-button type="info" class="mr-2" @click="onCancelHandler">{{ cancelText }}</daisy-button>
                    <daisy-button type="primary" @click="onConfirmHandler">{{ confirmText }}</daisy-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: '标题'
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    cancelHandler: {
        type: Function,
    },
    confirmHandler: {
        type: Function,
    },
    close: {
        type: Function,
    }
})

const emit = defineEmits(['update:modelValue'])

const isVisable = useVModel(props, 'modelValue')


const onCancelHandler = () => {
    if (props.cancelHandler) {
        props.cancelHandler()
    }
    close()
}

const onConfirmHandler = () => {
    if (props.confirmHandler) {
        props.confirmHandler()
    }
    close()
}

const close = () => {
    isVisable.value = false
    if (props.close) {
        props.close()
    }
}
</script>
<style lang="scss" scoped>
.feade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
    transform: translate3d(-50%, 100px, 0);
}
</style>
