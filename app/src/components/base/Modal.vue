<template>
  <n-modal v-model:show="value" :mask-closable="false">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      closable="true"
      role="dialog"
      aria-modal="true"
      @close="() => $emit('update:visible', false)"
    >
      <!-- <template #header-extra> Oops! </template> -->
      <slot></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
type Props = {
  title: string
  visible: boolean
}
type Emits = {
  (event: 'update:visible', value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const value = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  },
})
</script>
