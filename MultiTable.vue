<script setup>
import { usePage } from '@inertiajs/vue3'
import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ElInput } from 'element-plus';
import { formatNumber, parseNumber } from '@/Services/NumberFormat'

const props = defineProps({
  data_key: { type: String },
  columns: { type: Array },
  data: { type: Array, default: [] },
})

const page = usePage();

//emit
const emit = defineEmits(['add'])


const add = () => {
  emit('add');
}

const remove = (index) => {
  if (props.data) {
      console.log(props.data);
      props.data.splice(index, 1);
  }
}

const moveUp = (index) => {
  if (props.data && index>0) {
    let rows = [props.data[index], props.data[index-1]];
    props.data?.splice(index-1, 2, rows[0], rows[1]);
  }
}

const moveDown = (index) => {
  if (props.data && index < (props.data.length-1)) {
    let rows = [props.data[index], props.data[index+1]];
    props.data?.splice(index, 2, rows[1], rows[0]);
  }
}

</script>

<template>
  <div class="relative text-left">
    <table class="min-w-full divide-y divide-gray-200 bg-white mb-4">
      <thead class="bg-gray-100">
        <tr>
          <th v-for="(column, index) in props.columns" :key="column.key"
            :aria-colindex="index + 1"
            class="relative text-sm px-1.5 md:px-3 py-2.5 whitespace-nowrap"
            >
            <slot :name="'header_cell('+column.key+')'" :index="index">
              <div>{{ column.label }}</div>
            </slot>
          </th>
          <th class="w-14 text-center px-0">
          </th>
          <th class="w-9 lg:w-1 text-center px-2" >
            <PlusIcon
              class="inline-block h-4 -mt-1 text-danger-500 cursor-pointer hover:bg-gray-200 hover:rounded-full"
              @click="add"
            />
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 align-top">
        <tr
          v-for="(item, index) in props.data"
          :key="index"
        >
          <td v-for="column in columns"
            :key="column.key"
            >
            <slot :name="'cell('+column.key+')'" :item="item" :index="index">
              <div v-if="column.type==='input'">
                <ElInput v-model="item[column.key]" :placeholder="column.label" class="w-full" />
              </div>

              <div v-if="column.type==='number'">
                <ElInput v-model="item[column.key]" :placeholder="column.label" class="w-full" :formatter="formatNumber" :parser="parseNumber" />
              </div>
            </slot>
            <p class="text-red-500 text-xs italic" v-if="$page.props.errors[`${ data_key }.${ index }.${ column.key }`]">
              {{ $page.props.errors[`${ data_key }.${ index }.${ column.key }`] }}
            </p>
          </td>
          <td
            class="min-w-max text-center"
          >
            <ArrowUpCircleIcon
              class="inline-block h-[1.2rem] mt-1.5 text-gray-500 cursor-pointer hover:text-primary-600"
              @click="moveUp(index)"
            />
            <ArrowDownCircleIcon
              class="inline-block h-[1.2rem] mt-1.5 text-gray-500 cursor-pointer hover:text-primary-600"
              @click="moveDown(index)"
            />
          </td>
          <td
            class="min-w-max text-center"
          >
            <TrashIcon
              class="inline-block h-[1.1rem] mt-1.5 text-gray-500 cursor-pointer hover:text-danger-600"
              @click="remove(index)"
            />
          </td>
        </tr>

        <!-- placeholder if no rows -->
        <tr v-if="(!props.data || props.data.length==0)">
          <td :colspan="props.columns ? props.columns.length : 1">
            <div class="text-center py-10 italic text-gray-400">
              <span class="cursor-pointer" @click="add">{{ $page.props.langs.add_row }}</span>
            </div>
          </td>
        </tr>

      </tbody>
      <tfoot>
        <slot name="tfoot"></slot>
      </tfoot>
    </table>
  </div>
</template>