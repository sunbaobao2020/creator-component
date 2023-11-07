<script setup>
import { Link } from '@inertiajs/vue3'
import Button from 'primevue/button';
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
        <Button class="mx-1 mb-4" size="small" severity="secondary" outlined >
            <slot />
        </Button>
    </Link>
</template>
