<template>
  <section class="rank wrapper">
    <Header />
    <h1 class="title">🏆</h1>
    <MemberList :members="members" />
  </section>
</template>

<script setup lang="ts">
import { members } from '@/data/data.json'
</script>

<style lang="scss">
//
</style>
