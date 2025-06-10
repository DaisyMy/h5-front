<template>
  <daisy-popover>
    <template #reference>
      <div v-if="userStore.token"
        class="guide-my dark:hover:bg-zinc-900 guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100">
        <img class="w-3 h-3 rounded-sm"
          :src="userStore.userInfo?.avatar ? userStore.userInfo?.avatar : '@/assets/logo.png'" />
        <daisy-svg-icon class="size-1.5 ml-0.5" name="down-arrow"
          fillClass=" dark:fill-zinc-300 fill-zinc-900"></daisy-svg-icon>
        <daisy-svg-icon v-if="userStore.userInfo?.vipLevel" class="size-1.5 absolute right-[16px] bottom-0"
          name="vip"></daisy-svg-icon>
      </div>
      <div v-else>
        <daisy-button class="guide-my" icon="profile" iconColor="#fff" @click="onToLogin"></daisy-button>
      </div>
    </template>

    <div v-if="userStore.token" class="w-[140px] overflow-hidden">
      <div class=" dark:hover:bg-zinc-800 flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in menuList" :key="item.id" @click="onItemClick(item.path)">
        <daisy-svg-icon :name="item.icon" class="size-1.5 mr-1"
          fillClass=" dark:fill-zinc-300 fill-zinc-900"></daisy-svg-icon>
        <span class=" dark:text-zinc-300 text-zinc-500 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </daisy-popover>
</template>
<script setup >
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { confirm } from '@/libs';

const userStore = useUserStore()
console.log(userStore);

const router = useRouter()
const menuList = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

const onToLogin = () => {
  router.push('/login')
}

const onItemClick = (path) => {
  if (path) {
    router.push(path)
    return
  }
  confirm('确定退出登录？').then(() => {
    userStore.logout()
  })
}
</script>
<style lang="scss" scoped></style>
