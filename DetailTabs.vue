<script setup>
import { Link } from '@inertiajs/vue3'
const props = defineProps({
    action: {
        type: String,
        default: 'basic_data',
    },
    table: {
        type: String,
    },
    table_id: {
        type: [Number, String],
        default: null,
    },
});
</script>

<template>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
            <Link :href="table_id ? route(`backend.${ table }.edit`, table_id) : route(`backend.${ table }.create`)" :class="{
                'text-blue-600 dark:text-gray-200': action === 'basic_data',
                'border-blue-600 dark:border-gray-200': action === 'basic_data',
            }" class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-200">{{ $page.props.langs.basic_data }}</Link>
        </li>
        <li class="mr-2" v-if="table_id">
            <Link :href="route('backend.audits.index', { table: table, table_id: table_id })" :class="{
                'text-blue-600 dark:text-gray-200': action === 'audits',
                'border-blue-600 dark:border-gray-200': action === 'audits',
            }"  class="inline-block p-4 border-b-2 rounded-t-lg active dark:text-gray-500 dark:border-gray-500 dark:hover:text-gray-200 dark:hover:border-gray-200" aria-current="page">{{ $page.props.langs.audit }}</Link>
        </li>
    </ul>
    </div>
</template>