import { createGlobalState } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useGlobalState = createGlobalState(() => {
  const cookie = useCookies()

  const isLogin = computed(() => cookie.get('login'))

  return { cookie, isLogin }
})
