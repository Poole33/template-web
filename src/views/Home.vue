<template>
    <div class="h-full">
        home
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()


// 页面跳转
function toResult(tab) {
    router.push({
        path: '/result',
        query: {
            // prompt: prompt.value
            activeKey: tab
        }
    })
}

</script>

<style lang="scss" scoped>
.ant-btn-primary {
    background-color: #ff310099;
    &:hover {
        background-color: #cf130473;
    }
}
.vantaBox {
    width: calc(100vw - 8px);
    height: calc(100vh - 64px);
    position: fixed;
    z-index: 1;
    top: 64px;
    left: 0;
}

.homeBox {
    height: 100%;
    width: 100%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    color: #fff;
    position: relative;
}

.img-box {
    display: flex;
    height: 350px;
    width: 450px;
    align-items: end;
    justify-content: center;
    overflow: hidden;
}

.homeBox::-webkit-scrollbar-track {
    background-color: #000;
}
</style>