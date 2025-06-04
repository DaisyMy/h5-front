<template>
    <div class="fixed bottom-10 right-2">
        <div
            class=" guide-start size-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg">
            <daisy-svg-icon name="guide" class="size-2" @click="onGuideClick"
                fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"></daisy-svg-icon>
        </div>
        <daisy-popover class="flex items-center guide-feedback" placement="top-left">
            <template #reference>
                <div
                    class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg">
                    <daisy-svg-icon name="feedback" class="w-2 h-2"
                        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "></daisy-svg-icon>
                </div>
            </template>

            <div class="w-[140px] overflow-hidden">
                <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
                    <daisy-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1"
                        fillClass="fill-zinc-900 dark:fill-zinc-300"></daisy-svg-icon>
                    <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
                </div>
            </div>
        </daisy-popover>
    </div>
</template>
<script setup >
import { driver } from 'driver.js'
import steps from './steps'
import 'driver.js/dist/driver.css'

let driverObj = null
onMounted(() => {
    driverObj = driver({
        allowClose: false,
        nextBtnText: '下一步',
        prevBtnText: '上一步',
        doneBtnText: '完成',
        closeBtnText: '关闭',
        steps
    })
})

const onGuideClick = () => {
    driverObj.drive()
}

</script>
<style lang="scss" scoped></style>
