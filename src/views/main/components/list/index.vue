<template>
    <div>
        <daisy-waterfall :data="pexelsList">
            <template v-slot="scope">
                <item-vue :data="scope.item"></item-vue>
            </template>
        </daisy-waterfall>
    </div>
</template>
<script setup >
import { getPexelsList } from '@/api/pexels';
import itemVue from './item.vue';


let query = {
    page: 1,
    size: 20
}
const pexelsList = ref([])
const getPexelsData = async () => {
    const res = await getPexelsList(query)
    pexelsList.value = res.list
}
getPexelsData()
</script>

