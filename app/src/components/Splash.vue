<template>
  <section class="splash">
    <h1 class="splash__wrap">
      <span class="splash__title">T</span>
      <span class="splash__title">E</span>
      <span class="splash__title">N</span>
      <span class="splash__title">N</span>
      <span class="splash__title">I</span>
      <span class="splash__title">S</span>
      <span class="splash__title purple">T</span>
      <span class="splash__title purple">O</span>
      <span class="splash__title purple">W</span>
      <span class="splash__title purple">N</span>
    </h1>
    <span class="line line-left"></span>
    <span class="line line-right"></span>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline()
  const chars = document.querySelectorAll('.splash__title')

  tl.fromTo(
    chars,
    {
      opacity: 0,
      y: -80,
    },
    {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'back.inOut(1.7)',
      stagger: 0.05,
    }
  )
})
</script>

<style lang="scss" scoped>
.splash {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #8af10e 0%, #9cf2b4 100%);
  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 150px;
    text-align: center;
    transform: translate(-50%, -50%) rotate(-10deg);
  }
  &__title {
    display: inline-block;
    font-size: 40px;
    color: green;
    font-weight: bold;
    transform: skew(-10deg);
    text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
    &.purple {
      color: #c800ff;
    }
  }
  .line {
    position: absolute;
    width: 10px;
    height: 100%;
    background: #fff;
    &.line-left {
      left: 30px;
    }
    &.line-right {
      right: 30px;
    }
  }
}
</style>
