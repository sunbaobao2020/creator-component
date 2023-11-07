<script setup>
import Button from 'primevue/button';
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <Button :type="type" class="mx-1 mb-4" size="small" severity="secondary">
        <slot />
    </Button>
</template>
