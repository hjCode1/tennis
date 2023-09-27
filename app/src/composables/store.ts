import { createGlobalState } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useGlobalState = createGlobalState(() => {
  const cookie = useCookies()

  return { cookie }
})
