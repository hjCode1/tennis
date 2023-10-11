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
    <n-spin :show="spinShow">
      <div style="margin-bottom: 40px">
        <MatchTable :match-data="matchingObject" />
      </div>
    </n-spin>
  </section>

  <MatchModal v-model:visible="visible" />
</template>

<script setup lang="ts">
import { ref as FbRef, child, get } from 'firebase/database'

type MatchData = {
  [date: string]: {
    [key: string]: any
  }
}

const todayDate = ref(useTodayDate())
const visible = ref(false)
const dbRef = FbRef(db)
const spinShow = ref(false)
const matchData = ref<MatchData | null>(null)
const matchingObject = ref<Record<string, any> | null>(null)

const fetchMatch = async () => {
  try {
    spinShow.value = true
    const snapshot = await get(child(dbRef, '/match'))

    if (snapshot.exists()) {
      matchData.value = snapshot.val()
    }
    spinShow.value = false
  } catch (error) {
    console.error(error)
    spinShow.value = false
  }
}

onMounted(() => fetchMatch())
watch(
  () => todayDate.value,
  () => {
    const date = unref(todayDate)
    if (matchData.value && matchData.value[date]) {
      matchingObject.value = matchData.value[date]
    } else {
      matchingObject.value = null
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
