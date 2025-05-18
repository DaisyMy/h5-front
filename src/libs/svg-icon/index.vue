<template>
    <svg aria-hidden="true">
        <use :class="fillClass" :xlink:href="symbolid" :fill="color" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    fillClass: {
        type: String,
    }
})

const symbolid = computed(()=>`#icon-${props.name}`)
</script>