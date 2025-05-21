<template>
    <div class=" relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
        <div ref="referenceTarget">
            <slot name="reference"></slot>
        </div>
        <transition name="slide">
            <div ref="contentTarget" v-show="isVisable && $slots.default && $slots.default().length > 0"
                :style="contentStyle" class=" absolute p-1 z-20 bg-white border rounded-md">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script setup >
import {
    placementEnum, PROP_TOP_LEFT,
    PROP_TOP_RIGHT,
    PROP_BOTTOM_LEFT,
    PROP_BOTTOM_RIGHT,
    DELAY_TILE
} from './Enum.js'

const props = defineProps({
    placement: {
        trye: String,
        default: 'bottom-left',
        validator: (value) => {
            const result = placementEnum.includes(value)
            if (!result) {
                throw new Error(`placement 属性必须是 ${placementEnum.join('或')}`)
            }
            return result
        }
    }
})

let timer = null
const isVisable = ref(false)
const referenceTarget = ref(null)
const contentTarget = ref(null)
const contentStyle = ref({
    top: 0,
    left: 0
})

const onMouseenter = () => {
    isVisable.value = true
    if (timer) clearTimeout(timer)
}

const onMouseleave = () => {
    timer = setTimeout(() => {
        isVisable.value = false
        timer = null
    }, DELAY_TILE)
}

const useElementSize = (target) => {
    if (!target) return {}
    return {
        width: target.offsetWidth,
        height: target.offsetHeight
    }
}

watch(isVisable, async (value) => {
    if (!value) return
    await nextTick()
    switch (props.placement) {
        case PROP_TOP_LEFT:
            contentStyle.value.top = 0
            contentStyle.value.left = useElementSize(contentTarget.value).width + 'px'
            break
        case PROP_TOP_RIGHT:
            contentStyle.value.top = 0
            contentStyle.value.left = -useElementSize(referenceTarget.value).width + 'px'
            break
        case PROP_BOTTOM_LEFT:
            contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
            contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
            break
        case PROP_BOTTOM_RIGHT:
            contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
            contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
            break
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.slide-enter-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(20px)
}
</style>
