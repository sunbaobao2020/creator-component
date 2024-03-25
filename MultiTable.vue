<script setup>
import { ref, reactive } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ElInput, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { formatNumber, parseNumber } from '@/Services/NumberFormat'
import sortArray from 'sort-array'

const props = defineProps({
  data_key: { type: String },
  columns: { type: Array },
  data: { type: Array, default: [] },
  add_data: { type: Boolean, default: true },
  max_height: { type: Number, default: 500 },
})

const state = reactive({
  page: 1,
  rows: 5,
  total: props.data.length
})

const multiTable = ref(null);

const page = usePage();

//emit
const emit = defineEmits(['add'])

const tableData = () => {
  return props.data.filter((item, index) => {
    return index >= (state.page - 1) * state.rows && index < state.page * state.rows
  })
}

const add = () => {
  state.page = 1;
  multiTable.value.scrollTo(0);
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


const onSort = (value) => {
  state.sortBy = value.prop;
  state.sortOrder = value.order;

  sortArray(props.data, {
    by: value.prop,
    order: value.order === 'ascending' ? 'asc' : 'desc'
  })
}

const getRowKey = (row) => {
    return row.id;
}

const handleSelectionChange = (val) => {
    ids.value = val;
    emit('selectionChange', val);
}
</script>

<template>
  <el-table
    ref="multiTable"
    class="MultiTable"
    :data="tableData()"
    @sort-change="onSort"
    border
    highlight-current-row
    show-overflow-tooltip
    :max-height="max_height"
    :row-key="getRowKey"
    :default-expand-all="false"
    @selection-change="handleSelectionChange"
  >
    <el-table-column  label="#" prop="id" width="35">
        <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
        </template>
    </el-table-column>
    <el-table-column
      v-for="(column, index) in props.columns"
      :key="column.key"
      :label="column.label"
      :sortable="column.sortable || 'custom'"
      :prop="column.key"
      :width="column.width"
    >
      <template #header>
        <span>
          {{ column.label }}
          <span v-if="column.required" class="text-red-500">*</span>
        </span>
      </template>
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
      v-model:current-page="state.page"
      v-model:page-size="state.rows"
      :default-page-size="state.rows"
      :page-sizes="[5, 10, 15]"
      layout="sizes, prev, pager, next"
      :total="data.length"
  />
</template>