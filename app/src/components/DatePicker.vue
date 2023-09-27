<template>
  <n-date-picker v-model:formatted-value="formattedValue" value-format="yyyy-MM-dd" type="datetime" clearable />
</template>

<script setup lang="ts">
const formattedValue = ref('2023-09-28')
</script>
