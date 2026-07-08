<template>
  <t-config-provider
    :global-config="globalConfig"
  >
    <Suspense>
      <RouterView />
    </Suspense>
  </t-config-provider>
</template>

<script setup>
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/store/theme'

const globalConfig = {
  ...zhConfig,
}

const themeStore = useThemeStore()
themeStore.setDefaultTheme() // 设置默认主题
</script>

<style scoped>

</style>
