<template>
    <a-config-provider
        :theme="{
            algorithm: theme[themeStore.themeKey],
            token: myToken,
            components: myComponents
        }"
        :locale="zhCN"
    >
        <template #renderEmpty>
            <div style="text-align: center">
                <smile-outlined style="font-size: 20px" />
                <p>暂无数据</p>
            </div>
        </template>
        <Suspense>
            <RouterView />
        </Suspense>
        
    </a-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { SmileOutlined } from '@ant-design/icons-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'
import { useThemeStore } from '@/store/theme'


const myToken = {
    colorPrimary: '#e11b22',
}

const myComponents = {}

const themeStore = useThemeStore()
themeStore.setDefaultTheme() // 设置默认主题
</script>

<style scoped>

</style>
