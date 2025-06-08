<template>
    <transition name="down" @after-leave="destroy">
        <div v-show="isVisable"
            class="main-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
            :class="styles[type].containerClass">
            <daisy-svg-icon :name="styles[type].icon" :fillClass="styles[type].fillClass"
                class="size-1.5 mr-1.5"></daisy-svg-icon>
            <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
        </div>
    </transition>
</template>
<script setup>
import { typeEnum, styles } from './Enum'
import daisySvgIcon from '../svg-icon/index.vue'
const props = defineProps({
    type: {
        type: String,
        required: true,
        validator(val) {
            const result = typeEnum.includes(val)
            if (!result) {
                throw new Error(`type属性值必须为${typeEnum.join('、')}`)
            }
            return result
        }
    },
    content: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    destroy: {
        type: Function,
    },
})

const isVisable = ref(false)

onMounted(() => {
    isVisable.value = true
    setTimeout(() => {
        isVisable.value = false
    }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
    transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
    transform: translate3d(-50%, -100px, 0);
    opacity: 0;
}
</style>
