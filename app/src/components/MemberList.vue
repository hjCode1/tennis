<template>
  <n-data-table :columns="cols" :data="data" />
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import type { DataTableColumns } from 'naive-ui'

const data = [
  {
    Left: '1',
    Right: '1',
  },
  {
    Left: '2',
    Right: '2',
  },
]
const cols: DataTableColumns = reactive([
  {
    title: 'RANKING',
    key: 'RANKING',
    sorter: 'default',
    renderSorterIcon: ({ order }) => {
      const style = 'transform: translateY(-3px);'
      if (order === false) return h('div', { style }, ['🤔'])
      if (order === 'ascend') return h('div', { style }, ['👇'])
      if (order === 'descend') return h('div', { style }, ['👆'])
    },
  },
])
</script>
