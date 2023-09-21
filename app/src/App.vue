<template>
  <Transition @leave="onLeave">
    <Splash v-if="enterPage" />
  </Transition>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <template #default>
        <component :is="Component" :key="$route.path"></component>
      </template>
      <template #fallback>
        <Error />
      </template>
    </Suspense>
  </RouterView>
  <n-menu class="main_menu" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref, h } from 'vue'
import type { Component } from 'vue'

import { useCookies } from '@vueuse/integrations/useCookies'
import gsap from 'gsap'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  FormatListNumberedRound as RankIcon,
  EmojiPeopleRound as MemberIcon,
  SportsBaseballFilled as MatchIcon,
} from '@vicons/material'

import Error from './views/Error.vue'

const enterPage = ref(false)
const activeKey = ref(null)
const cookies = useCookies(['splash'])

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 1.5,
    y: '-100%',
    ease: 'elastic.inOut(2, 1)',
    opacity: 0,
    onComplete: done,
  })
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'rank',
          },
        },
        { default: () => 'RANK' }
      ),
    key: 'RANK',
    icon: renderIcon(RankIcon),
  },
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: {
  //           name: 'member',
  //         },
  //       },
  //       { default: () => 'MEMBER' }
  //     ),
  //   key: 'MEMBER',
  //   icon: renderIcon(MemberIcon),
  // },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'match',
          },
        },
        { default: () => 'MATCH' }
      ),
    key: 'MATCH',
    icon: renderIcon(MatchIcon),
  },
]

onMounted(() => {
  if (cookies.get('splash') !== 'enter') {
    enterPage.value = true
    setTimeout(() => {
      enterPage.value = false
    }, 4000)
  }

  cookies.set('splash', 'enter', {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 하루
  })
})
</script>

<style lang="scss">
.main_menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  justify-content: center;
  box-shadow: 0 5px 15px rgb(8 140 4 / 60%);
  font-weight: bold;
}
</style>
