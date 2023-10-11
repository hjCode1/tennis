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
      <MatchTable :match-data="matchingObject" />
    </div>
  </section>

  <MatchModal v-model:visible="visible" @update:rank="updateRank" @update:match="updateMatch" />
</template>

<script setup lang="ts">
import { ref as FbRef, child, get, update, onValue } from 'firebase/database'
import type { matchPayloadType, rankPayloadType } from '../types/global'

type MatchData = {
  [date: string]: {
    [key: string]: any
  }
}

const message = useMessage()
const todayDate = ref(useTodayDate())
const visible = ref(false)
const dbRef = FbRef(db)
const spinShow = ref(false)
const matchData = ref<MatchData | null>(null)
const matchingObject = ref<Record<string, any> | null>(null)
const promiseRank = ref(false)
const promiseMatch = ref(false)

const fetchMatch = async () => {
  try {
    spinShow.value = true

    const snapshot = await get(child(dbRef, '/match'))

    if (snapshot.exists()) {
      matchData.value = snapshot.val()
      if (matchData.value) {
        matchingObject.value = matchData.value[unref(todayDate)]
      }
    }
    spinShow.value = false
  } catch (error) {
    console.error(error)
    spinShow.value = false
  }
}

async function updateRank(value: rankPayloadType[]) {
  try {
    spinShow.value = true
    const snapshot = await get(child(dbRef, '/members'))

    if (snapshot.exists()) {
      const updates = value.map((item) => {
        const existingObject = snapshot.val()[item.name]
        if (existingObject) {
          return {
            ...item,
            point: (parseInt(existingObject.point) + item.point).toString(),
          }
        }
        return item
      })

      const updatePromises = updates.map(async (payload) => {
        return update(child(dbRef, `/members/${payload.name}`), payload)
      })

      await Promise.all(updatePromises)
    }
  } catch (error) {
    console.error(error)
    message.error('저장에 실패했습니다')
  } finally {
    promiseRank.value = true
  }
}

async function updateMatch(value: matchPayloadType[]) {
  try {
    spinShow.value = true
    const date = unref(todayDate)

    if (!matchData.value) {
      await update(child(dbRef, `/match/${date}`), {})
    }

    const uid = Math.random().toString(16).slice(2)
    const payloads = value.map((item) => {
      return {
        ...item,
        score: item.score.toString(),
      }
    })

    const updatePromises = payloads.map(async (payload, idx) => {
      return update(child(dbRef, `/match/${unref(todayDate)}/${uid}/team${idx}`), payload)
    })

    await Promise.all(updatePromises)
  } catch (error) {
    console.error(error)
  } finally {
    promiseMatch.value = true
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
watch(
  () => [promiseRank.value, promiseMatch.value],
  (value) => {
    if (value.every((v) => v === true)) {
      message.success('매칭 결과가 저장됐습니다')
      spinShow.value = false
      visible.value = false
      fetchMatch()
    }
  }
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
