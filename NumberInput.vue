<script setup>
import { ref, watch } from 'vue';
import { ElInput } from 'element-plus';
import { formatNumber, parseNumber } from '@/Services/NumberFormat'

const props = defineProps({
  modelValue: { type: String },
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const data = ref(props.modelValue);

const emitUpdate = (value) => {
  emit('update:modelValue', value);
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
