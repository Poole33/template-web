<template>
    <div>
        <Head></Head>
        
        <div class="content-box">
            <Aside></Aside>
            <div class="grow">
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
console.log('router', useRoute());
</script>

<style lang="scss" scoped>
.content-box {
    height: calc(100vh - 64px);
    overflow-y: auto;
    display: flex;
}
</style>
