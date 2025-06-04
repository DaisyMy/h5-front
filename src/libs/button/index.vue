<template>
    <button class=" text-sm text-center rounded duration-150 flex justify-center items-center" :class="[
        typeEnum[type],
        sizeEnum[sizeKey].button,
        { 'active:scale-105': isActiveAnim },
    ]">
        <!-- loading -->
        <daisy-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></daisy-svg-icon>
        <!-- icon btn -->
        <daisy-svg-icon v-if="icon" :name="icon" class=" m-auto" :class="sizeEnum[sizeKey].icon" :color="iconColor"
            :fillClass="iconClass"></daisy-svg-icon>
        <!-- text btn -->
        <slot v-else></slot>
    </button>
</template>
<script setup >
import { typeEnum, sizeEnum } from './Enum'
import daisySvgIcon from '../svg-icon/index.vue'

const props = defineProps({
    icon: {
        type: String
    },
    iconColor: {
        type: String
    },
    iconClass: {
        type: String
    },
    type: {
        type: String,
        default: 'main',
        validator(val) {
            const keys = Object.keys(typeEnum)
            const valid = keys.includes(val)
            if (!valid) {
                throw new Error(`type必须是 ${keys.join('、')} 中的一个`)
            }
            return valid
        }
    },
    size: {
        type: String,
        default: 'default',
        validator(val) {
            const keys = Object.keys(sizeEnum)
            const valid = keys.includes(val)
            if (!valid) {
                throw new Error(`size必须是 ${keys.join('、')} 中的一个`)
            }
            return valid
        }
    },
    // 是否显示动画
    isActiveAnim: {
        type: Boolean,
        default: true
    },
    // 加载状态
    loading: {
        type: Boolean,
        default: false
    }

})

// 如果是icon图标按钮，则使用icon-前缀
const sizeKey = computed(() => {
    return props.icon ? 'icon-' + props.size : props.size
})
</script>
<style lang="scss" scoped></style>
