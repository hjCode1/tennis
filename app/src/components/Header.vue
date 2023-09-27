<template>
  <n-switch class="darkmode-button" size="large" @update:value="handleChange">
    <template #checked> ☀️ </template>
    <template #unchecked> 🌙 </template>
  </n-switch>
</template>

<script setup lang="ts">
const { cookie } = useGlobalState()

function handleChange(value: boolean) {
  cookie.set('ui-darkmode', value)
}
</script>

<style lang="scss">
.darkmode-button {
  position: absolute;
  right: 25px;
  top: 20px;
}
</style>
