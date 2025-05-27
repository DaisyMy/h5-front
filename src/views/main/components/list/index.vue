<template>
    <div>
        <daisy-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
            <daisy-waterfall :data="pexelsList" :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
                class="w-full px-1">
                <template v-slot="scope">
                    <item-vue :data="scope.item" :width="scope.width"></item-vue>
                </template>
            </daisy-waterfall>
        </daisy-infinite-list>
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
const isLoading = ref(false)
const isFinished = ref(false)
const pexelsList = ref([])
const getPexelsData = async () => {
    if (isFinished.value) return

    const res = await getPexelsList(query)
    if (query.page === 1) {
        pexelsList.value = res.list
    } else {
        pexelsList.value.push(...res.list)
    }
    if (pexelsList.value.length === res.total) {
        isFinished.value = true
    } else {
        pexelsList.value.length && query.page++
    }
    isLoading.value = false
}
</script>

