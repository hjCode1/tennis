<template>
  <section class="match wrapper">
    <Header />
    <h1 class="title">🤜🤛</h1>
    <DatePicker v-model:value="todayDate" style="margin-top: 40px" />
    <n-text style="margin-top: 30px; font-size: 20px" strong code>{{ todayDate }}의 경기 결과</n-text>
    <div style="margin-bottom: 40px">
      <MatchTable :match-data="matchDate" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { match } from '@/data/data.json'

const todayDate = ref(useTodayDate())
const matchingObject = computed(() => match.find((item) => item.date === unref(todayDate)))
const matchDate = ref()

watch(
  () => todayDate.value,
  () => {
    if (matchingObject.value) {
      const { date, ...rest } = matchingObject.value
      matchDate.value = rest
    } else {
      matchDate.value = null
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
//
</style>
