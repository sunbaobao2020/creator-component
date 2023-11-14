<script setup>
import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'

import { ElInput, ElButton, ElTable, ElPagination, ElDialog } from 'element-plus';
import { Search, Refresh, Filter } from '@element-plus/icons-vue'

const props = defineProps({
    data: { type: Object },
    filters: { type: Object },
    advanced: { type: Boolean, default: false },
    reset: { type: Function },
})

const page = usePage();

const setting = {
    replace: true,
    preserveState: true,
    preserveScroll: true
};

const dialogFormVisible = ref(false)

const emit = defineEmits(['search', 'reset'])

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
    emit('search', setting);
}

const onReset = () => {
    if(props.reset){
        props.reset();
    }else{
        router.get(route(`backend.${page.props.routeNameData}.index`), {});
    }
}

const onAdvancedSearch = () => {
    dialogFormVisible.value = false;
    onSearch();
}

</script>

<style>
.tableAuto.el-table .cell {
  white-space: nowrap;
}
</style>

<template>
    <div class="flex mb-2">
        <el-button v-if="advanced" size="large" @click="dialogFormVisible = true" :icon="Filter" plain />
        <el-button class="mr-4" size="large" @click="onReset" :icon="Refresh">
            {{ $page.props.langs.reset }}
        </el-button>
        <el-input ref="search" v-model="props.filters.obj.search" size="large" @input="onKeyWord" placeholder="search">
            <template #prepend>
                <el-button :icon="Search" />
            </template>
        </el-input>
    </div>

    <template v-if="advanced">
        <el-dialog
            v-model="dialogFormVisible"
            :title="$page.props.langs.advanced"
        >

            <form @submit.prevent="onAdvancedSearch" class="-mx-3">
                <div class="flex flex-wrap w-full mb-5 relative">
                    <slot name="advancedForm"></slot>
                </div>

            </form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $page.props.langs.cancel }}</el-button>
                    <el-button type="primary" @click="onAdvancedSearch">{{ $page.props.langs.submit }}</el-button>
                </span>
            </template>
        </el-dialog>
    </template>


    <el-table
        class="tableAuto"
        :data="data.data"
        :default-sort="{ prop: filters.obj.sortBy, order: filters.obj.sortOrder }"
        @sort-change="onSort"
        border
        highlight-current-row
        show-overflow-tooltip
        height="500"
        row-key="id"
        default-expand-all
    >
            <slot />
    </el-table>

    <el-pagination
        v-if="data.total"
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
