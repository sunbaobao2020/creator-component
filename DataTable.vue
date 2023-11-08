<script setup>
import { ref, nextTick } from 'vue'
import { useForm, router, usePage, Link } from '@inertiajs/vue3'

import { ElInput, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { Search, Refresh } from '@element-plus/icons-vue'

import Column from 'primevue/column';

const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
})

const emit = defineEmits(['search'])

const onPage = (value) => {
    onSearch();
}

const onRow = (value) => {
    onSearch();
}

const onSort = (value) => {
    props.filters.obj.sortBy = value.prop;
    props.filters.obj.sortOrder = value.order;
    onSearch();
}

const search = ref(null);

const debounceTimeouts = {};
const onKeyWord = () => {
    clearTimeout(debounceTimeouts['keyWord']);
    debounceTimeouts['keyWord'] = setTimeout(() => {
        props.filters.obj.page = 1;
        onSearch();
    }, 350);
}

const onSearch = () => {
    emit('search')
}

nextTick(() => {
    search.value.focus();
});
</script>

<template>
    <div class="flex mb-2">
        <Link :href="route(`backend.${ $page.props.routeNameData }.index`)" class="mr-2">
            <el-button size="large" :icon="Refresh">
                {{ $page.props.langs.reset }}
            </el-button>
        </Link>
        <el-input ref="search" v-model="props.filters.obj.search" size="large" @input="onKeyWord" placeholder="search">
            <template #prepend>
                <el-button :icon="Search" />
            </template>
        </el-input>
    </div>


    <el-table
        :data="data.data"
        :default-sort="{ prop: filters.obj.sortBy, order: filters.obj.sortOrder }"
        @sort-change="onSort"
        border
        highlight-current-row
    >
            <slot />
    </el-table>

    <el-pagination
        class="mt-5"
        v-model:current-page="filters.obj.page"
        v-model:page-size="filters.obj.rows"
        :default-page-size="15"
        :page-sizes="[15, 30, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="data.total"
        @size-change="onRow"
        @current-change="onPage"
    />
</template>
