<script setup>
import { ref, watch } from "vue";
import { usePage } from '@inertiajs/vue3'
import { ElSelect, ElOption } from 'element-plus';
import axios from 'axios';

const props = defineProps({
    modelValue: { type: [Number, Array] },
    routeNameData: { type: String, default: 'select' },
    multiple: { type: Boolean, default: false },
    route_name: { type: String },
})

const page = usePage();
const prefix = page.props.prefix || 'backend';

const value = ref(props.modelValue);

const emit = defineEmits(['update:modelValue', 'callback'])

const ajaxData = ref([]);

const loadAjaxData = (query) => {
    axios.get(route(`${ prefix }.${ props.route_name }.options`, { search: query }), ).then(({ data }) => {
        ajaxData.value = data;
    })
}

loadAjaxData(null);

const changeData = (value) => {
    emit('update:modelValue', value);
    emit('callback', ajaxData.value);
}

watch(() => props.modelValue, (newValue) => {
    value.value = newValue;
})

</script>
<template>
  <ElSelect
      v-model="value"
      class="w-full"
      @change="value => changeData(value)"
      clearable
      :multiple="multiple"
  >
    <slot name="option" :data="ajaxData">
      <ElOption
          v-for="item in ajaxData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      />
    </slot>
  </ElSelect>
</template>
