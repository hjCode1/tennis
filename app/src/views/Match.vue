<template>
  <section class="match wrapper">
    <h1 class="title">🤜🤛</h1>
    <DatePicker style="margin-top: 40px" />
    <MatchTable :match-data="matchData" />
  </section>
</template>

<script setup lang="ts">
import flag from '../components/icons/flag'

// api
const matchData = [
  {
    country: flag.ko_KR,
    names: '선수1, 선수2',
    score: 1,
  },
  {
    country: flag.ko_KR,
    names: '선수3, 선수4',
    score: 4,
  },
]
</script>

<style lang="scss">
//
</style>
