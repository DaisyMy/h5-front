<template>
    <div>
        <daisy-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
            <daisy-waterfall :data="pexelsList" :column="isMobileTerminal ? 2 : 5" :picturePreReading="false"
                class="w-full px-1">
                <template v-slot="scope">
                    <item-vue :data="scope.item" :width="scope.width" @click="onToPins"></item-vue>
                </template>
            </daisy-waterfall>
        </daisy-infinite-list>
        <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
        </transition>
    </div>
</template>
<script setup >
import gsap from 'gsap'
import { getPexelsList } from '@/api/pexels';
import { isMobileTerminal } from '@/utils/flexible'
import { useEventListener } from '@vueuse/core'
import itemVue from './item.vue';
import pinsVue from '@/views/pins/components/pins.vue';

import useAppStore from '@/store/modules/app';
import useSearchStore from '@/store/modules/search';

const appStore = useAppStore()
const searchStore = useSearchStore()

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

const resetQuery = (newQuery) => {
    query = { ...query, ...newQuery }
    isFinished.value = false
    pexelsList.value = []
}

watch(() => appStore.currentCategory, (currentCategory) => {
    resetQuery({
        page: 1,
        categoryId: currentCategory.id
    })
})

watch(() => searchStore.searchText, (searchText) => {
    resetQuery({
        page: 1,
        searchText
    })
})

const isVisiblePins = ref(false)
const currentPins = ref({})

const onToPins = (item) => {
    history.pushState(null, null, `/pins/${item.id}`)
    currentPins.value = item
    isVisiblePins.value = true
}

const beforeEnter = (el) => {
    gsap.set(el, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: '0 0',
        translateX: currentPins.value.location?.translateX,
        translateY: currentPins.value.location?.translateY,
        opacity: 0
    })
}

const enter = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        translateX: 0,
        translateY: 0,
        onComplete: done
    })
}


const leave = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        x: currentPins.value.location?.translateX,
        y: currentPins.value.location?.translateY,
    })
}

useEventListener(window, 'popstate', () => {
    isVisiblePins.value = false
})
</script>

