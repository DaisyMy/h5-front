<template>
    <div>
        <slot></slot>
        <div ref="loadingTarget" class=" h-6 py-4">
            <daisy-svg-icon v-show="loading" class="size-4 mx-auto animate-spin" name="infinite-load"></daisy-svg-icon>
            <p v-if="isFinished" class="text-center text-base text-zinc-400">已经没有更多数据了！</p>
        </div>
    </div>
</template>
<script setup >
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
    modelValue: {
        type: Boolean,
        requited: true
    },
    isFinished: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue', 'onLoad'])

const loadingTarget = ref(null)
const loading = useVModel(props)
const targetIsIntersecting = ref(false)
const emitLoad = () => {
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
        loading.value = true
        emits('onLoad')
    }
}

useIntersectionObserver(loadingTarget, ([{ isIntersecting }], observerElement) => {
    targetIsIntersecting.value = isIntersecting
    emitLoad()
})

watch(loading, (val) => {
    setTimeout(() => {
        emitLoad()
    }, 100)
})

</script>
<style lang="scss" scoped></style>
