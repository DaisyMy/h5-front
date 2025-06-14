<template>
    <div class=" overflow-auto flex flex-col items-center">
        <daisy-svg-icon v-if="isMobileTerminal" name="close" class="size-3 p-0.5 m-0 ml-auto"
            fillClass="fill-zinc-900 dark:fill-zinc-200" @click="close"></daisy-svg-icon>
        <img ref="imageTarget" :src="blob">
        <daisy-button class="mt-4 w-[80%] xl:w-1/2" :loading="loading" @click="onConfirmClick">确定</daisy-button>
    </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getOssClient } from '@/utils/sts'
import { putProfile } from '@/api/sys'
import { message } from '@/libs'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const EMITS_CLOSE = 'close'

// 移动端配置对象
const mobileOptions = {
    // 将裁剪框限制在画布的大小
    viewMode: 1,
    // 移动画布，裁剪框不动
    dragMode: 'move',
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1,
    // 裁剪框不可移动
    cropBoxMovable: false,
    // 不可调整裁剪框大小
    cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1
}
let cropper = null
const imageTarget = ref(null)
const loading = ref(false)

defineProps({
    blob: {
        type: String,
        required: true
    }
})

const emits = defineEmits([EMITS_CLOSE])

const close = () => {
    emits(EMITS_CLOSE)
}

const onConfirmClick = () => {
    loading.value = true
    // 获取裁剪后的图片
    cropper.getCroppedCanvas().toBlob((blob) => {
        // 裁剪后的 blob 地址
        // console.log(URL.createObjectURL(blob))
        putObjectToOSS(blob)
    })
}

let ossClient = null
const putObjectToOSS = async (file) => {
    if (!ossClient) {
        ossClient = await getOssClient()
    }
    try {
        const fileTypeArr = file.type.split('/')
        const fileName = `${userStore.userInfo.userName}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]}`
        const res = await ossClient.put(`images/${fileName}`, file)
        onChangeProfile(res.url)
    } catch (e) {
        message('error', e)
    }
}

const onChangeProfile = async (avatar) => {
    userStore.setUserInfo({
        ...userStore.userInfo,
        avatar
    })
    await putProfile(userStore.userInfo)
    message('success', '头像更新成功')
    loading.value = false
    close()
}

onMounted(() => {
    cropper = new Cropper(
        imageTarget.value,
        isMobileTerminal.value ? mobileOptions : pcOptions
    )
})
</script>
<style lang="scss" scoped></style>
