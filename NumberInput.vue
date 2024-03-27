<script setup>
import { ref, watch } from 'vue';
import { ElInput } from 'element-plus';

const props = defineProps({
  modelValue: { type: [String, Number] },
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const data = ref(props.modelValue);

const emitUpdate = (value) => {
  emit('update:modelValue', value);
};

const formatNumber = (value) => {
  return value ? parseFloat(value).toLocaleString('en-US') : '0';
};

const parseNumber = (value) => {
  return (parseFloat(value.replace(/,/g, '')) || 0).toString();
};

watch([() => props.modelValue], () => {
  data.value = props.modelValue;
})
</script>

<template>
  <ElInput
    v-model="data"
    :placeholder="placeholder"
    class="w-full"
    :disabled="disabled"
    :formatter="formatNumber"
    :parser="parseNumber"
    @input="emitUpdate"
  />
</template>
