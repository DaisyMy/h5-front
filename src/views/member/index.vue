<template>
    <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pl-1">
        <div
            class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
            <daisy-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">精选会员</daisy-navbar>
            <div class="py-2 px-1">
                <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>
                <p class="text-center text-lg text-yellow-500">升级精选VIP，畅享所有内容</p>
                <div
                    class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <pay-menu-item-vue v-for="item in vipPayListData" :key="item.id" :hot="item.isHot"
                        :select="item.id === currentPayData.id" :data="item"
                        @click="onChangeCurrentPay(item)"></pay-menu-item-vue>
                </div>
                <p class=" mt-1 text-sm text-zinc-500"> {{ currentPayData.desc }}</p>
            </div>
        </div>
        <daisy-count-down :time="1000 * 60"></daisy-count-down>
    </div>
</template>
<script>
export default {
    name: 'member'
}
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import payMenuItemVue from './components/pay-menu-item.vue';
import { useRouter } from 'vue-router';
import useAppStore from '@/store/modules/app';
import { getVipPayList } from '@/api/pay';

const router = useRouter();
const appStore = useAppStore();

const vipPayListData = ref([]);
const currentPayData = ref({});
const getVipPayListData = async () => {
    const res = await getVipPayList();
    vipPayListData.value = res;
    currentPayData.value = res[0];
}
getVipPayListData()

const onNavbarLeftClick = () => {
    appStore.changeRouterType('back');
    router.back();
}

const onChangeCurrentPay = (item) => {
    currentPayData.value = item;
}


</script>
<style lang="scss" scoped></style>
