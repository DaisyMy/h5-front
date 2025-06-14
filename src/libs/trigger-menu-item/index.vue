<template>
    <div class=" w-5 flex flex-col items-center justify-center mx-0.5" @click="onItemClick">
        <daisy-svg-icon :name="icon" :class="iconClass" class="size-2"></daisy-svg-icon>
        <p class=" text-sm mt-0.5">
            <slot></slot>
        </p>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    iconClass: {
        type: String,
    },
    textClass: {
        type: String,
        default: 'text-zinc-900 dark:text-zinc-200'
    },
    to: {
        type: String,
    }
})

const onItemClick = () => {
    if (!props.to) {
        return
    }
    router.push(props.to)
}
</script>
<style lang="scss" scoped></style>
