<script setup>
import { ref } from 'vue'
import 'element-plus/dist/index.css'
import { ElUpload, ElButton, ElIcon, ElDialog } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
    modelValue: { type: [Object, Array], default: null },
    multiple: { type: Boolean, default: false },
    limit: { type: Number, default: 1 },
})

const fileList = props.modelValue ? [] : [];
const imageUrl = ref('')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const emit = defineEmits(['update:modelValue'])

const changeData = (list) => {
    if(props.multiple){
        emit('update:modelValue', list.map(item => item.raw))
    }else{
        emit('update:modelValue', list[0]?.raw)
    }
}

const onUpload = (response, data, list) => {
    if(!props.multiple){
        imageUrl.value = response;
    }
    changeData(list);
};

const onRemove = (data, list) => {
    changeData(list);
};

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

</script>

<template>
    <el-upload
        :file-list="fileList"
        multiple
        :show-file-list="multiple ? true : false"
        :action="route('backend.upload.store')"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="onUpload"
        :on-remove="onRemove"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
