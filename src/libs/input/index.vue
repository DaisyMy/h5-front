<template>
    <div class=" relative">
        <input v-if="type === TYPE_TEXT" type="text" v-model="text" :maxlength="max"
            class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full" />
        <textarea v-if="type === TYPE_TEXTAREA" v-model="text" :maxlength="max" rows="5"
            class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"></textarea>
        <span v-if="max" class="absolute right-1 bottom-0.5 text-xs text-zinc-400"
            :class="{ 'text-red-700': currentNumber >= parseInt(max) }">{{ currentNumber }}/{{ max }}</span>
    </div>
</template>
<script setup>
import { useVModel } from '@vueuse/core'

const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: TYPE_TEXT,
        validator(val) {
            const arr = [TYPE_TEXT, TYPE_TEXTAREA]
            const res = arr.includes(val)
            if (!res) {
                throw new Error(`type属性值必须为${arr.join('、')}`)
            }
            return res
        },
    },
    max: {
        type: [Number, String],
    }
})

const text = useVModel(props)

const currentNumber = computed(() => {
    return text.value.length
})
</script>
<style lang="scss" scoped></style>
