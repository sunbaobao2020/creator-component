<script setup>
import { ref, watch } from "vue";
import { usePage } from '@inertiajs/vue3'
import { ElSelect, ElOption } from 'element-plus';
import axios from 'axios';

const props = defineProps({
    modelValue: { type: [Number, Array, String] },
    routeNameData: { type: String, default: 'select' },
    multiple: { type: Boolean, default: false },
    route_name: { type: String },
    option_value: { type: String, default: 'id'},
    option_label: { type: String, default: 'name'},
    customData: { type: Array },
})

const page = usePage();
const prefix = page.props.prefix || 'backend';

const dataValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue', 'callback'])

const ajaxData = ref([]);

const loadAjaxData = (query) => {
    if(props.customData){
        ajaxData.value = props.customData;
    }else{
        axios.get(route(`${ prefix }.${ props.route_name }.options`, { search: query }), ).then(({ data }) => {
            ajaxData.value = data;
        })
    }
}

loadAjaxData(null);

const changeData = (value) => {
    emit('update:modelValue', value);
    emit('callback', ajaxData.value);
}

watch(() => props.modelValue, (newValue) => {
    dataValue.value = newValue;
})

</script>
<template>
  <ElSelect
      v-model="dataValue"
      class="w-full"
      @change="value => changeData(value)"
      clearable
      :multiple="multiple"
  >
    <slot name="option" v-bind="props" :data="ajaxData" >
      <ElOption
          v-for="item in ajaxData"
          :key="item[option_value]"
          :label="item[option_label]"
          :value="item[option_value]"
      />
    </slot>
  </ElSelect>
</template>
