<template>
  <section class="login wrapper">
    <Header />
    <div class="form_wrapper">
      <n-form class="form" ref="formRef" :model="modelValue" :rules="rules" label-placement="top">
        <n-form-item path="id" label="ADMIN 아이디">
          <n-input
            type="text"
            size="large"
            :placeholder="MESSAGE_ID"
            v-model:value="modelValue.id"
            @keydown.enter.prevent
          ></n-input>
        </n-form-item>
        <n-form-item path="pw" label="ADMIN 비밀번호">
          <n-input
            type="password"
            size="large"
            :placeholder="MESSAGE_PW"
            v-model:value="modelValue.pw"
            @keydown.enter.prevent
          ></n-input>
        </n-form-item>
        <n-button block strong secondary type="primary" size="large" @click="handleSubmit"> 로그인 </n-button>
      </n-form>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'

const message = useMessage()
const { cookie } = useGlobalState()
const MESSAGE_ID = '아이디를 입력하세요'
const MESSAGE_PW = '비밀번호를 입력하세요'
const formRef = ref<FormInst | null>(null)
const model = ref({
  id: '',
  pw: '',
})
const { cloned: modelValue, sync } = useCloned(model, { manual: true })

const rules: FormRules = {
  id: [{ required: true, message: MESSAGE_ID, trigger: ['input', 'blur'] }],
  pw: [{ required: true, message: MESSAGE_PW, trigger: ['input', 'blur'] }],
}

function handleSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      checkAccount()
    } else {
      console.log(errors)
    }
  })
}

function checkAccount() {
  const { id, pw } = modelValue.value

  if (id === import.meta.env.VITE_ADMIN_ID && pw === import.meta.env.VITE_ADMIN_PW) {
    cookie.set('login', true, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    message.success('로그인 성공')
  } else {
    message.error('계정정보가 일치하지 않습니다')
  }
}
</script>
<style lang="scss" scope>
.form_wrapper {
  position: fixed;
  width: 100;
  width: calc(100% - 50px);
  top: 47%;
  transform: translateY(-50%);
}
</style>
