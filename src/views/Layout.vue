<template>
  <div class="h-full flex flex-col overflow-hidden">
    <Head class="shrink-0" />

    <div class="flex-1 flex h-full">
      <Aside />
      <div class="h-full flex-1 overflow-auto">
        <RouterView :key="route.path" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Aside from '@/components/Aside.vue'
import Head from '@/components/Head.vue'

const route = useRoute()
console.log('router', useRoute())
</script>

<style lang="scss" scoped>

</style>
