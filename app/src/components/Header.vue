<template>
  <n-switch v-model:value="active" class="darkmode-button" size="large" @update:value="handleChange">
    <template #checked> ☀️ </template>
    <template #unchecked> 🌙 </template>
  </n-switch>
</template>

<script setup lang="ts">
const { cookie } = useGlobalState()
const active = ref(false)

function handleChange(value: boolean) {
  cookie.set('ui-darkmode', value)
  active.value = value
}

onMounted(() => {
  active.value = cookie.get('ui-darkmode')
})
</script>

<style lang="scss">
.darkmode-button {
  position: absolute;
  right: 25px;
  top: 20px;
}
</style>
