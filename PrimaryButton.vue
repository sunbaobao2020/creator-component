<script setup>
import { ElButton } from 'element-plus';
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <ElButton class="mx-1 mb-4" type="primary" :native-type="type">
        <slot />
    </ElButton>
</template>
