<template>
  <section class="match wrapper">
    <Header />
    <h1 class="title">🤜🤛</h1>
    <DatePicker v-model:value="todayDate" style="margin-top: 40px" />
    <div class="info-wrapper">
      <n-text v-show="todayDate" style="margin-top: 30px; font-size: 20px" strong code>
        {{ todayDate }}의 경기 결과
      </n-text>
      <n-button strong secondary type="primary" class="add-match-button" @click="visible = true">결과 추가</n-button>
    </div>
    <div style="margin-bottom: 40px">
      <MatchTable :match-data="matchDate" />
    </div>
  </section>

  <MatchModal v-model:visible="visible" />
</template>

<script setup lang="ts">
import { match } from '@/data/data.json'

const todayDate = ref(useTodayDate())
const matchDate = ref()
const matchingObject = computed(() => match.find((item) => item.date === unref(todayDate)))
const visible = ref(false)

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

<style lang="scss" scoped>
.info-wrapper {
  position: relative;
  .add-match-button {
    position: absolute;
    right: 0;
    top: 30px;
  }
}
</style>
