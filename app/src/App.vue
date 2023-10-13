<template>
  <Transition @leave="onLeave">
    <Splash v-if="enterPage" />
  </Transition>
  <n-config-provider :theme="isDarkMode ? darkTheme : lightTheme" :theme-overrides="themeOverridesRef">
    <n-message-provider>
      <RouterView v-slot="{ Component }">
        <div v-if="error">
          <ErrorPage />
        </div>
        <Suspense v-else>
          <template #default>
            <KeepAlive>
              <component :is="Component" :key="$route.path"></component>
            </KeepAlive>
          </template>
          <template #fallback>
            <LoadingPage />
          </template>
        </Suspense>
      </RouterView>
      <n-menu class="main_menu" mode="horizontal" :options="menuOptions" />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import gsap from 'gsap'
import { NIcon, darkTheme, lightTheme } from 'naive-ui'
import type { GlobalTheme, MenuOption, GlobalThemeOverrides } from 'naive-ui'
import {
  FormatListNumberedRound as RankIcon,
  SportsBaseballFilled as MatchIcon,
  AccountCircleRound as AdminIcon,
} from '@vicons/material'

import ErrorPage from './views/Error.vue'
import LoadingPage from './views/Loading.vue'

const { cookie, isLogin } = useGlobalState()

const enterPage = ref(false)
const error = ref(false)
const theme = ref<GlobalTheme | null>(null)
const isDarkMode = computed(() => cookie.get('ui-darkmode'))

const themeOverridesRef = computed((): GlobalThemeOverrides => {
  const themeColorText = unref(isDarkMode) ? '#fff' : '#000'

  return {
    Menu: {},
  }
})

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

const menuOptions: MenuOption[] = !isLogin.value
  ? [
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
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'admin',
              },
            },
            { default: () => 'ADMIN' }
          ),
        key: 'ADMIN',
        icon: renderIcon(AdminIcon),
      },
    ]
  : [
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

watch(
  () => isDarkMode.value,
  (value) => {
    if (value) {
      document.querySelector('body')?.setAttribute('class', 'darkmode')
    } else {
      document.querySelector('body')?.removeAttribute('class')
    }
  },
  { immediate: true }
)

watch(
  () => isLogin.value,
  (value) => {
    if (value) {
    } else {
    }
  }
)

onErrorCaptured((e) => {
  console.error(e)
  error.value = true
  return false
})

onMounted(() => {
  if (cookie.get('splash') !== 'enter') {
    enterPage.value = true
    setTimeout(() => {
      enterPage.value = false
    }, 4000)
  }

  cookie.set('splash', 'enter', {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 하루
  })
})
</script>

<style lang="scss">
.n-menu.n-menu--horizontal .n-menu-item-content {
  padding: 0 10px;
}
</style>
