<template>
    <div>
        <slot>
            <p class=" text-sm">{{ showTime }}</p>
        </slot>
    </div>
</template>
<script>
const INTERVAL_COUNT = 1000
const EMITS_FINISH = 'finish'
const EMITS_CHANGE = 'change'
</script>
<script setup>
import dayjs from './utils'

const props = defineProps({
    time: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        default: 'HH:mm:ss'
    }
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

const showTime = computed(() => {
    return dayjs.duration(duration.value).format(props.format)
})

const start = () => {
    close()
    interval = setInterval(() => {
        durationFn()
    }, INTERVAL_COUNT)
}

const duration = ref(0)

const durationFn = () => {
    duration.value -= INTERVAL_COUNT
    emits(EMITS_CHANGE)
    if (duration.value <= 0) {
        duration.value = 0
        emits(EMITS_FINISH)
        close()
    }
}

let interval = null
const close = () => {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
}

watch(() => props.time, (val) => {
    duration.value = val
    start()
}, {
    immediate: true
})

onUnmounted(() => {
    close()
})
</script>
<style lang="scss" scoped></style>
