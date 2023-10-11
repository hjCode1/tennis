<template>
  <n-data-table :columns="cols" :data="members" striped />
</template>

<script setup lang="ts">
type Member = {
  point: string
  name: string
  rank: number
}

type Props = {
  members: Member
}

defineProps<Props>()

const cols = [
  {
    title: 'RANKING',
    key: 'rank',
    width: '40%',
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
    title: 'POINTS',
    key: 'point',
  },
]
</script>
