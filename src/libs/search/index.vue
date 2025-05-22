<template>
    <div ref="containerTarget" class=" group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
        <div>
            <!-- 图标 -->
            <daisy-svg-icon class=" w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2" name="search"
                color="#707070"></daisy-svg-icon>
            <!-- 输入框 -->
            <input
                class="dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700 block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
                type="text" placeholder="搜索" v-model="inputValue" @focus="onFocusHandler" @blur="onBlurHandler" />
            <!-- 清空icon -->
            <daisy-svg-icon v-show="inputValue" @click="handleClear" name="input-delete"
                class=" h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer" fillClass="dark:fill-zinc-300"></daisy-svg-icon>
            <!-- 分割线 -->
            <div
                class=" opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100 dark:bg-zinc-700">
            </div>
            <!-- 搜索btn -->
            <daisy-button @click="handleSearch"
                class=" absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
                icon="search" iconColor="#ffffff"></daisy-button>
        </div>
        <!-- 下拉 -->
        <transition name="slide">
            <div v-if="$slots.dropdown" v-show="isFocus"
                class="dark:bg-zinc-800 dark:border-zinc-600 max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 hover:shadow-3xl">
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>
<script setup >
import { useVModel, onClickOutside } from '@vueuse/core'

// 更新事件
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})
const emits = defineEmits([
    EMIT_UPDATE_MODELVALUE,
    EMIT_CLEAR,
    EMIT_INPUT,
    EMIT_FOCUS,
    EMIT_BLUR,
    EMIT_SEARCH
])

const inputValue = useVModel(props)
const isFocus = ref(false)

const handleClear = () => {
    emits(EMIT_UPDATE_MODELVALUE, '')
}
const handleSearch = () => {
    isFocus.value = false
    emits(EMIT_SEARCH)
}

const onFocusHandler = () => {
    isFocus.value = true
    emits(EMIT_FOCUS)
}

const onBlurHandler = () => {
    emits(EMIT_BLUR)
}

const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
    isFocus.value = false
})
</script>
<style lang="scss" scoped>
.slide-enter-active {
    transition: all 0.5s;
}

.slide-leave-active {
    transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(40px);
    opacity: 0;
}
</style>
