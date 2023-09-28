<template>
  <n-date-picker v-model:formatted-value="formattedValue" value-format="yyyy-MM-dd" type="date" clearable />
</template>

<script setup lang="ts">
type Props = {
  value: string
}

type Emits = {
  (event: 'update:value', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const formattedValue = computed({
  get: () => props.value,
  set: (value) => {
    return emits('update:value', value)
  },
})
</script>
