<template>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
        ref="containerTarget">
        <navigation-vue></navigation-vue>
        <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
            <list-vue></list-vue>
        </div>
        <daisy-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
            <daisy-trigger-menu-item icon="home"
                iconClass="fill-zinc-900 dark:fill-zinc-200">首页</daisy-trigger-menu-item>
            <daisy-trigger-menu-item v-if="userStore.token" icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:text-zinc-500" @click="onVipClick">VIP</daisy-trigger-menu-item>
            <daisy-trigger-menu-item icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:text-zinc-500" @click="onMyClick">{{ userStore.token
                    ? '我的' : '登录' }}</daisy-trigger-menu-item>
        </daisy-trigger-menu>
    </div>
</template>
<script>
export default {
    name: 'home'
}
</script>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import useUserStore from '@/store/modules/user'
import useAppStore from '@/store/modules/app'
import { useScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'


const appStore = useAppStore()
const router = useRouter()
/**
 * VIP 按钮点击事件
 */
const onVipClick = () => {
    // 配置跳转方式
    appStore.changeRouterType('push')
    router.push('/member')
}
/**
 * 我的按钮点击事件
 */
const onMyClick = () => {
    // 配置跳转方式
    appStore.changeRouterType('push')
    if (userStore.token) {
        router.push('/profile')
    } else {
        router.push('/login')
    }
}

const contailerTarget = ref(null)
const { y: contailerTargetScrollY } = useScroll(contailerTarget)

onActivated(() => {
    if (!contailerTarget.value) {
        return
    }
    contailerTarget.value.scrollTop = contailerTargetScrollY.value
})

const userStore = useUserStore()
</script>
