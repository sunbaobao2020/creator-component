<script setup>
import { ref, watch } from 'vue';
import { ElInput } from 'element-plus';
import { useCurrencyInput } from 'vue-currency-input'

const props = defineProps({
  modelValue: { type: [String, Number] },
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
  precision: { type: Number, default: 2 },
  separator: { type: Boolean, default: true },
})

const data = ref(props.modelValue);

const options = {
  currency: "TWD",
  currencyDisplay: "hidden",
  autoDecimalDigits: false,
  useGrouping: props.separator,
  accountingSign: false,
  precision: props.precision,
}

const { inputRef, setValue, setOptions } = useCurrencyInput(options, false)

const emit = defineEmits(['update:modelValue'])

const emitUpdate = (value) => {
  emit('update:modelValue', value);
};

watch([() => props.modelValue], () => {
  setValue(props.modelValue);
})

// watch([() => options], () => {
//   setOptions(options);
// })
</script>

<template>
  <ElInput
    v-model="data"
    :placeholder="placeholder"
    class="w-full"
    :disabled="disabled"
    @input="emitUpdate"
    ref="inputRef"
  />
</template>
