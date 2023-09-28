<template>
  <table class="match-table">
    <tbody>
      <tr v-for="(match, index) in matchData" :key="index">
        <th class="country" v-html="match.country"></th>
        <th class="names">
          <n-p>{{ match.names }}</n-p>
        </th>
        <th class="score">{{ match.score }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
type matchDataType = {
  country: string
  names: string
  score: number
}

type Props = {
  matchData: matchDataType[]
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.match-table {
  margin: 30px 0 0;
  width: 100%;
  table-layout: fixed;
  border-left: 10px solid green;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  th {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
    svg {
      display: block;
      width: 100% !important;
    }
  }
  .names {
    text-align: left;
  }
  .country {
    width: 50px;
  }
  .score {
    width: 70px;
    color: #fff;
    background: green;
  }
}
</style>
