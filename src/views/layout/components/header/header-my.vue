<template>
  <daisy-popover>
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100">
        <img class="w-3 h-3 rounded-sm"
          src="@/assets/logo.png"/>
        <daisy-svg-icon class="size-1.5 ml-0.5" name="down-arrow" fillClass=" fill-zinc-900"></daisy-svg-icon>
        <daisy-svg-icon class="size-1.5 absolute right-[16px] bottom-0" name="vip"></daisy-svg-icon>
      </div>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div class=" flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60" v-for="item in menuList"
        :key="item.id">
        <daisy-svg-icon :name="item.icon" class="size-1.5 mr-1" fillClass="fill-zinc-900"></daisy-svg-icon>
        <span class=" text-zinc-800 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </daisy-popover>
</template>
<script setup >
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
</script>
<style lang="scss" scoped></style>
