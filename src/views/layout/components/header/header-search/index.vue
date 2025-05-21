<template>
  <div class=" w-full">
    <daisy-search v-model="inputValue">
      <template #dropdown>
        <div>
          dropdown
        </div>
      </template>
    </daisy-search>
  </div>
</template>
<script setup >
const inputValue = ref("")
</script>
<style lang="scss" scoped></style>
