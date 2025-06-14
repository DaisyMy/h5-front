<template>
    <router-view v-slot="{ Component }">
        <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
            <keep-alive>
                <component :is="Component" :class="{ 'fixed top-0 w-screen z-50': isAnimation }"
                    :name="mainComponentName"></component>
            </keep-alive>
        </transition>
    </router-view>
</template>
<script>
// 无需监听路由的各种状态（在 PC 端下）
const NONE = 'none'
// 路由进入
const PUSH = 'push'
// 路由退出
const BACK = 'back'
// 路由跳转的 enum
const ROUTER_TYPE_ENUM = [NONE, PUSH, BACK]
</script>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    routerType: {
        type: String,
        dafault: NONE,
        validator(val) {
            const res = ROUTER_TYPE_ENUM.includes(val)
            if (!res) {
                throw new Error(`routerType 必须是 ${ROUTER_TYPE_ENUM.join('、')}`)
            }
            return res
        }
    },
    mainComponentName: {
        type: String,
        required: true
    }
})

const virtualTaskStack = ref([props.mainComponentName])
const isAnimation = ref(false)
const transitionName = ref('')

const beforeEnter = (el) => {
    isAnimation.value = true
}

const afterLeave = (el) => {
    isAnimation.value = false
}

router.beforeEach((to, from) => {
     transitionName.value = props.routerType
    if (props.routerType === PUSH) {
        virtualTaskStack.value.push(to.name)
    } else if (props.routerType === BACK) {
        virtualTaskStack.value.pop()
    }
    if (to.name === props.mainComponentName) {
        clearTask()
    }
})

const clearTask = () => {
    virtualTaskStack.value = [props.mainComponentName]
}

</script>
<style lang="scss" scoped>
.push-enter-active {
    animation-name: push-in;
    animation-duration: 0.4s;
}

.push-leave-active {
    animation-name: push-out;
    animation-duration: 0.4s;
}

@keyframes push-in {
    0% {
        transform: translate(100%, 0);
    }

    100% {
        transform: translate(0, 0);
    }
}

@keyframes push-out {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-500%, 0);
    }
}

.back-enter-active {
    animation-name: back-in;
    animation-duration: 0.4s;
}

.back-leave-active {
    animation-name: back-out;
    animation-duration: 0.4s;
}

@keyframes back-in {
    0% {
        width: 100%;
        transform: translate(-100%, 0);
    }

    100% {
        width: 100%;
        transform: translate(0, 0);
    }
}

@keyframes back-out {
    0% {
        width: 100%;
        transform: translate(0, 0);
    }

    100% {
        width: 100%;
        transform: translate(50%, 0);
    }
}
</style>
