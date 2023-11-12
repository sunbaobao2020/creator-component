<script setup>
import { Link } from '@inertiajs/vue3'
import { ElButton } from 'element-plus';
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
    size: {
        type: String,
        default: 'default',
    },
});
</script>

<template>
    <Link
        :href="route(`backend.${ $page.props.routeNameData }.index`)"
    >
        <ElButton severity="secondary" outlined :size="size">
            <slot />
        </ElButton>
    </Link>
</template>
