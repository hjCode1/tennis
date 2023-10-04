<template>
  <table class="match-table" v-if="matchData" v-for="(matchs, key) in matchData" :key="key">
    <tbody>
      <tr v-for="(match, key) in matchs" :key="key">
        <th class="names">
          <n-p style="margin: 0">{{ match.names }}</n-p>
          <n-tag v-if="match.result" :type="getTagType(match.result)">{{ match.result }}</n-tag>
        </th>
        <th class="score">{{ match.score }}</th>
      </tr>
    </tbody>
  </table>
  <n-result v-else status="500" title="NO RESULT!" size="huge" style="padding-top: 60px"> </n-result>
</template>

<script setup lang="ts">
type matchDataType = {
  [key: string]: {
    names: string
    score: string
    result?: string
  }[]
}

type Props = {
  matchData: matchDataType
}

const props = defineProps<Props>()

function compareScores(scores: { names: string; score: string; result?: string }[]) {
  const team1Score = parseInt(scores[0].score)
  const team2Score = parseInt(scores[1].score)

  if (team1Score > team2Score) {
    scores[0].result = 'WIN'
    scores[1].result = 'LOSE'
  } else if (team1Score < team2Score) {
    scores[0].result = 'LOSE'
    scores[1].result = 'WIN'
  }
}

function getTagType(type: string) {
  if (type === 'WIN') {
    return 'success'
  } else {
    return 'error'
  }
}

if (props.matchData) {
  Object.values(props.matchData).forEach(compareScores)
}
</script>

<style lang="scss" scoped>
.match-table {
  margin: 30px 0 0;
  width: 100%;
  table-layout: fixed;
  border-left: 15px solid green;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  th {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
    border: 1px solid rgba(0, 0, 0, 0.2);
    svg {
      display: block;
      width: 100% !important;
    }
  }
  .names {
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .score {
    width: 30%;
    color: #fff;
    background: green;
  }
}
</style>
