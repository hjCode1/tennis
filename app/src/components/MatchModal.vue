<template>
  <Modal v-model:visible="modalVisible" :title="`결과 추가`">
    <n-form ref="formRef" :model="modelValue" :rules="rules" label-placement="top">
      <n-form-item path="team1" label="team1 member">
        <n-input
          type="text"
          size="large"
          placeholder="팀원을 입력하세요 (ex. JKS, GUEST1)"
          v-model:value="modelValue.team1"
          @keydown.enter.prevent
        ></n-input>
      </n-form-item>
      <n-form-item path="score1" label="team1 score">
        <n-input-number
          size="large"
          style="width: 100%"
          :placeholder="WARING_MESSAGE_SCORE"
          v-model:value="modelValue.score1"
          @keydown.enter.prevent
        ></n-input-number>
      </n-form-item>
      <n-form-item path="team2" label="team2 member">
        <n-input
          type="text"
          size="large"
          placeholder="팀원을 입력하세요 (ex. JES, GUEST2)"
          v-model:value="modelValue.team2"
          @keydown.enter.prevent
        ></n-input>
      </n-form-item>
      <n-form-item path="score2" label="team2 score">
        <n-input-number
          size="large"
          style="width: 100%"
          :placeholder="WARING_MESSAGE_SCORE"
          v-model:value="modelValue.score2"
          @keydown.enter.prevent
        ></n-input-number>
      </n-form-item>
    </n-form>

    <template #footer>
      <n-button block strong secondary type="primary" size="large" :loading="loading" @click="handleClickAddMatch">
        확인
      </n-button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { matchPayloadType, rankPayloadType } from '../types/global'

type Props = {
  visible: boolean
}
type Emits = {
  (event: 'update:visible', value: boolean): void
  (event: 'update:match', value: matchPayloadType[]): void
  (event: 'update:rank', value: rankPayloadType[]): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)
const WARNING_MESSAGE_TEAM = '팀원을 입력하세요 (ex. JKS, JES)'
const WARING_MESSAGE_SCORE = '점수를 입력하세요'
const model = ref({
  team1: '',
  score1: '',
  team2: '',
  score2: '',
})
const { cloned: modelValue, sync } = useCloned(model, { manual: true })

const rules: FormRules = {
  team1: [
    {
      required: true,
      message: WARNING_MESSAGE_TEAM,
      trigger: ['input', 'blur'],
    },
  ],
  score1: [
    {
      required: true,
      type: 'number',
      message: WARING_MESSAGE_SCORE,
      trigger: ['input', 'blur', 'change'],
    },
  ],
  team2: [
    {
      required: true,
      message: WARNING_MESSAGE_TEAM,
      trigger: ['input', 'blur'],
    },
  ],
  score2: [
    {
      required: true,
      type: 'number',
      message: WARING_MESSAGE_SCORE,
      trigger: ['input', 'blur', 'change'],
    },
  ],
}

const modalVisible = computed({
  get: () => props.visible,
  set: (value) => emits('update:visible', value),
})

function handleClickAddMatch() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
      handleSubmit()
    } else {
      console.log(errors)
    }
  })
}

function setPlayerPoint(players: string[]) {
  const filteredPlayers = players
    .filter((player) => !player.includes('guest'))
    .map((player) => ({
      name: player.trim(),
      point: 10,
    }))

  return filteredPlayers
}

function calculateMatchResult(score1: string, score2: string) {
  const result = parseInt(score1) > parseInt(score2) ? 'WIN' : 'LOSE'
  return [result, result === 'WIN' ? 'LOSE' : 'WIN']
}

function handleSubmit() {
  const { team1, team2, score1, score2 } = modelValue.value

  const team1Name = team1.toUpperCase()
  const team2Name = team2.toUpperCase()
  const [team1Result, team2Result] = calculateMatchResult(score1, score2)

  const matchPayload: matchPayloadType[] = [
    {
      names: team1Name,
      score: score1,
      result: team1Result,
    },
    {
      names: team2Name,
      score: score2,
      result: team2Result,
    },
  ]

  const team1Players = team1Name.split(',')
  const team2Players = team2Name.split(',')

  const rankPayload = setPlayerPoint(team1Result === 'WIN' ? team1Players : team2Players)

  emits('update:match', matchPayload)
  emits('update:rank', rankPayload)
}

whenever(modalVisible, () => sync())
</script>
