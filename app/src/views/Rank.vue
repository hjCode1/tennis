<template>
  <section class="rank wrapper">
    <Header />
    <h1 class="title">🏆</h1>
    <n-spin :show="spinShow">
      <MemberList :members="members" />
      <template #description> Loading...🎾 </template>
    </n-spin>
  </section>
</template>

<script setup lang="ts">
import { ref as FbRef, child, get } from 'firebase/database'

type Member = {
  name: string
  point: string
  rank?: number
}

const spinShow = ref(false)
const dbRef = FbRef(db)
const members = ref<Member[] | []>([])

const fetchMembers = async () => {
  try {
    spinShow.value = true
    const snapshot = await get(child(dbRef, '/members'))

    if (snapshot.exists()) {
      members.value = Object.values(snapshot.val()) as Member[]

      if (members.value !== null) {
        members.value.sort((a, b) => parseInt(b.point) - parseInt(a.point))
        let rank = 1
        members.value.forEach((item, index) => {
          if (index > 0 && parseInt(item.point) !== parseInt(members.value![index - 1].point)) {
            rank = index + 1
          }
          item.rank = rank
        })
      }
      spinShow.value = false
    } else {
      members.value = []
      spinShow.value = false
    }
  } catch (error) {
    console.error(error)
    spinShow.value = false
  }
}

onMounted(() => fetchMembers())
</script>

<style lang="scss">
//
</style>
