<template>
    <div>
        <div class="flex items-center text-xs mb-1 text-zinc-400">
            <span>最近搜索</span>
            <daisy-svg-icon name="delete" class=" size-2.5 ml-1 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
                fillClass="fill-zinc-400" @click="onDeleteAllClick"></daisy-svg-icon>
        </div>

        <div class="flex flex-wrap">
            <div v-for="(item, index) in searchStore.historys" :key="item" @click="onItemClick(item)"
                class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-sm font-bold rounded-sm hover:bg-zinc-200 duration-300">
                <span>{{ item }}</span>
                <daisy-svg-icon name="input-delete"
                    class=" size-2.5 p-0.5 ml-1 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
                    @click.stop="onDeleteClick(index)"></daisy-svg-icon>
            </div>
        </div>
    </div>
</template>
<script setup >
import useSearchStore from '@/store/modules/search';

const searchStore = useSearchStore();

const EMITS_ITEM_CLICK = 'item-click';

const emits = defineEmits([EMITS_ITEM_CLICK]);

const onDeleteClick = (index) => {
    searchStore.deleteHistory(index);
}

const onDeleteAllClick = () => {
    confirm('确认清空全部历史记录吗？').then(() => {
        searchStore.deleteAllHistory();
    })
}

const onItemClick = (item) => {
    emits(EMITS_ITEM_CLICK, item);
}
</script>
<style lang="scss" scoped></style>
