<template>
    <div
        class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl">
        <div class="flex items-center h-5 text-left px-1 mb-1">
            <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
            <daisy-svg-icon name="refresh" fillClass="fill-zinc-900 dark:fill-zinc-200"
                class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
                @click="onReset"></daisy-svg-icon>
            <daisy-svg-icon name="close" fillClass="fill-zinc-900 dark:fill-zinc-200"
                class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
                @click="onClose"></daisy-svg-icon>
        </div>
        <div id="captcha"></div>
    </div>
</template>

<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import { getCaptcha } from '@/api/sys'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])
let captcha = null
onMounted(() => {
    captcha = sliderCaptcha({
        id: 'captcha',
        async onSuccess(arr) {
            const res = await getCaptcha({ behavior: arr })
            if (res) {
                emits(EMITS_SUCCESS)
            }
        },
        onFail() {
            console.log('验证失败')
        },
        verify() {
            return true
        }
    })
})
const onClose = () => {
    emits(EMITS_CLOSE)
}

const onReset = () => {
    captcha.reset()
}
</script>