<template>
    <div class="h-full flex flex-col overflow-hidden">
        <Head class="shrink-0"></Head>
        
        <div class="flex-1 flex h-full">
            <Aside></Aside>
            <div class="h-full flex-1 overflow-auto">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>
import Head from '@/components/Head.vue'
import Aside from '@/components/Aside.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('router', useRoute())
</script>

<style lang="scss" scoped>

</style>
