<template>
  <section class="match wrapper">
    <Header />
    <h1 class="title">🤜🤛</h1>
    <DatePicker v-model:value="todayDate" style="margin-top: 40px" />
    <n-text style="margin-top: 30px; font-size: 20px" strong code>{{ todayDate }}의 경기 결과</n-text>
    <MatchTable :match-data="matchData" />
    <n-button class="add-match-button" type="primary" strong size="large" ghost> 경기 결과 추가 🎾</n-button>
  </section>
</template>

<script setup lang="ts">
import flag from '../components/icons/flag'

const todayDate = ref(useTodayDate())

// api
// const matchData = []
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
.add-match-button {
  position: fixed;
  right: 25px;
  bottom: 70px;
  box-shadow: 0 0px 10px rgba(8, 140, 4, 0.3);
}
</style>
