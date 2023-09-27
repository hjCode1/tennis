<template>
  <n-data-table :columns="cols" :data="members" striped />
</template>

<script setup lang="ts">
// import type { DataTableColumns } from 'naive-ui'

type Member = {
  rank: number
  name: string
  point: number
}

type Props = {
  members: Member[]
}

const props = defineProps<Props>()

const cols = [
  {
    title: 'RANKING',
    key: 'rank',
    sorter: 'default',
    renderSorterIcon: ({ order }: { order: boolean | string }) => {
      const style = 'transform: translateY(-3px);'

      if (order === false) return h('div', { style }, ['🤔'])
      if (order === 'ascend') return h('div', { style }, ['👇'])
      if (order === 'descend') return h('div', { style }, ['👆'])
    },
  },
  {
    title: 'NAME',
    key: 'name',
  },
  {
    title: 'POINT',
    key: 'point',
  },
]
</script>
