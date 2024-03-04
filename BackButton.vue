<script setup>
import { Link, usePage } from '@inertiajs/vue3'
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

const page = usePage();
const prefix = page.props.prefix || 'backend';

</script>

<template>
    <Link
        :href="route(`${ prefix }.${ $page.props.routeNameData }.index`)"
    >
        <ElButton severity="secondary" outlined :size="size">
            <slot />
        </ElButton>
    </Link>
</template>
