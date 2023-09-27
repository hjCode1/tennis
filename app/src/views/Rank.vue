<template>
  <section class="rank wrapper">
    <h1 class="title">🏆</h1>
    <MemberList :members="members" />
  </section>
</template>

<script setup lang="ts">
// api

const members = [
  {
    rank: 1,
    name: '조코비치',
    point: 3000,
  },
  {
    rank: 2,
    name: '페더러',
    point: 2500,
  },
  {
    rank: 3,
    name: '나달',
    point: 2200,
  },
]
</script>

<style lang="scss">
//
</style>
