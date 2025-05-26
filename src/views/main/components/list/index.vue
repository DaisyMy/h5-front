<template>
    <div>
        <daisy-waterfall :data="pexelsList" :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
            class="w-full px-1">
            <template v-slot="scope">
                <item-vue :data="scope.item" :width="scope.width"></item-vue>
            </template>
        </daisy-waterfall>
    </div>
</template>
<script setup >
import { getPexelsList } from '@/api/pexels';
import { isMobileTerminal } from '@/utils/flexible'
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

