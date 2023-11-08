<script setup>
import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'

import { ElInput, ElButton, ElTable, ElPagination } from 'element-plus';
import { Search, Refresh } from '@element-plus/icons-vue'

const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
})

const page = usePage();

const setting = {
    replace: true,
    preserveState: true
};

const emit = defineEmits(['search'])

const onPage = () => {
    onSearch();
}

const onRow = () => {
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
    emit('search', setting)
}

const onReset = () => {
    router.get(route(`backend.${page.props.routeNameData}.index`), {});
}

</script>

<template>
    <div class="flex mb-2">
        <el-button class="mr-4" size="large" @click="onReset" :icon="Refresh">
            {{ $page.props.langs.reset }}
        </el-button>
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
