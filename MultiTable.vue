<script setup>
import { reactive } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ElInput, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { formatNumber, parseNumber } from '@/Services/NumberFormat'

const props = defineProps({
  data_key: { type: String },
  filters: { type: Object, default: { obj: {} }},
  columns: { type: Array },
  data: { type: Array, default: [] },
  add_data: { type: Boolean, default: true },
  max_height: { type: Number, default: 500 },
})

const page = usePage();

//emit
const emit = defineEmits(['add'])

const state = reactive({
  page: 1,
  limit: 15,
  total: props.data.length
})

const tableData = () => {
  return props.data.filter((item, index) => {
    return index >= (state.page - 1) * state.limit && index < state.page * state.limit
  })
}


const add = () => {
  emit('add');
}

const remove = (index) => {
  if (props.data) {
      props.data.splice(index, 1);
  }
}

const moveUp = (index) => {
  if (props.data && index > 0) {
    let rows = [props.data[index], props.data[index - 1]];
    props.data?.splice(index - 1, 2, rows[0], rows[1]);
  }
}

const moveDown = (index) => {
  if (props.data && index < (props.data.length - 1)) {
    let rows = [props.data[index], props.data[index+1]];
    props.data?.splice(index, 2, rows[1], rows[0]);
  }
}

const onSearch = () => {
    emit('search', setting);
}

const onSort = (value) => {
    props.filters.obj.sortBy = value.prop;
    props.filters.obj.sortOrder = value.order;
    onSearch();
}

const getRowKey = (row) => {
    return row.id;
}

const handleSelectionChange = (val) => {
    ids.value = val;
    emit('selectionChange', val);
}

const handleCurrentChange = (e) => {
  state.page = e
}

</script>

<style>
.MultiTable .cell{
  padding: 0px;
  text-align: center;
  white-space: nowrap;
}
</style>

<template>
  <el-table
    ref="dataTable"
    class="MultiTable"
    :data="tableData()"
    :default-sort="{ prop: filters.obj.sortBy, order: filters.obj.sortOrder }"
    @sort-change="onSort"
    border
    highlight-current-row
    show-overflow-tooltip
    :max-height="max_height"
    :row-key="getRowKey"
    :default-expand-all="false"
    @selection-change="handleSelectionChange"
  >
    <el-table-column  label="#" prop="id">
        <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
        </template>
    </el-table-column>
    <el-table-column
      v-for="(column, index) in props.columns"
      :key="column.key"
      :label="column.label"
      :sortable="column.sortable || false"
      :prop="column.key"
      :width="column.with"
    >
      <template #default="{ row }">
        <slot :name="'cell('+column.key+')'" :item="row" :index="index">
          <div v-if="column.type==='input'">
            <ElInput v-model="row[column.key]" :placeholder="column.label" class="w-full" :disabled="column.disabled || false" />
          </div>

          <div v-if="column.type==='number'">
            <ElInput v-model="row[column.key]" :placeholder="column.label" class="w-full" :disabled="column.disabled || false" :formatter="formatNumber" :parser="parseNumber" />
          </div>
        </slot>
        <p class="text-red-500 text-xs italic" v-if="$page.props.errors[`${ data_key }.${ index }.${ column.key }`]">
          {{ $page.props.errors[`${ data_key }.${ index }.${ column.key }`] }}
        </p>
      </template>
    </el-table-column>
    <el-table-column fixed="right">
        <template #default="scope">
          <ArrowUpCircleIcon
            class="inline-block h-[1.2rem] text-gray-500 cursor-pointer hover:text-primary-600"
            @click="moveUp(scope.$index)"
          />
          <ArrowDownCircleIcon
            class="inline-block h-[1.2rem] text-gray-500 cursor-pointer hover:text-primary-600"
            @click="moveDown(scope.$index)"
          />
        </template>
    </el-table-column>
    <el-table-column fixed="right">
        <template #header>
          <PlusIcon
            class="inline-block h-4 -mt-1 text-danger-500 cursor-pointer hover:bg-gray-200 hover:rounded-full"
            @click="add"
          />
        </template>
        <template #default="scope">
          <TrashIcon
            class="inline-block h-[1.1rem] text-gray-500 cursor-pointer hover:text-danger-600"
            @click="remove(scope.$index)"
          />
        </template>
    </el-table-column>
  </el-table>

  <el-pagination
      class="mt-5"
      v-model:current-page="filters.obj.page"
      v-model:page-size="filters.obj.rows"
      :default-page-size="15"
      :page-sizes="[15, 30, 50, 100]"
      layout="prev, pager, next"
      :total="data.length"
      @current-change="handleCurrentChange"
  />
</template>