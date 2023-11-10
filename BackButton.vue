<script setup>
import { Link } from '@inertiajs/vue3'
import { ElButton } from 'element-plus';
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <Link
        :href="route(`backend.${ $page.props.routeNameData }.index`)"
    >
        <ElButton severity="secondary" outlined >
            <slot />
        </ElButton>
    </Link>
</template>
