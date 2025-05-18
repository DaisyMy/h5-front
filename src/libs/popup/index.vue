<template>
    <div class="">
        <teleport to='body'>
            <transition name="fade">
                <div v-if="modelValue" class=" w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
                    @click="$emit('update:modelValue', false)"></div>
            </transition>
            <transition name="popup-down-up">
                <div v-if="modelValue" v-bind="$attrs" class=" w-screen bg-white z-50 fixed bottom-0">
                    <slot></slot>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    }
})

const emits = defineEmits(['update:modelValue'])

const isLocked = useScrollLock(document.body)

watch(() => props.modelValue, (val) => {
    isLocked.value = val
}, { immediate: true })

</script>

<style lang="scss" scoped>
// transition 动画
.fade-enter-active {
    transition: all 0.3s;
}

.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
    transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
    transform: translateY(100%);
}
</style>
