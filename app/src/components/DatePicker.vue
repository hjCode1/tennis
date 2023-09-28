<template>
  <n-date-picker v-model:formatted-value="formattedValue" value-format="yyyy-MM-dd" type="date" clearable />
  {{ formattedValue }}
</template>

<script setup lang="ts">
const formattedValue = ref(useTodayDate())
</script>
