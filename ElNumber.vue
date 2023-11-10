<script setup>
import { ref, watch } from 'vue';
import { ElInput } from 'element-plus';

const props = defineProps({
    modelValue: { type: [String, Number] },
    placeholder: { type: String, default: '' },
});

const data = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumber = (value) => {
    return value.replace(/,/g, '');
};

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
    :formatter="formatNumber"
    :parser="parseNumber"
    @input="emitUpdate($event)"
  />
</template>