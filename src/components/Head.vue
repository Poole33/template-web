<template>
    <header class="head-box flex h-16">
        <div class="flex h-full w-60 items-center justify-center">
            <!-- <div
                class="h-30px w-75px bg-contain bg-no-repeat bg-center bg-[url(@/assets/imgs/logo.png)]"
                @click="toHome"
            >
            </div> -->

            <div
                class="ml-3 text-2xl font-bold cursor-pointer mt-3px"
                @click="toHome"
            >
                demo.
            </div>
        </div>
        <div class="grow flex flex-justify-end items-center" v-if="!isHideRight">
            <!-- <a-popover trigger="click">
                <div class="bg-opacity-30 px-4 hover:bg-stone-700 h-full flex items-center text-xl text-white">
                    <BellOutlined />
                </div>

                <template #content>
                    <a-empty description="暂无数据" />
                </template>
            </a-popover> -->

            <!-- 主题切换 -->
            <a-switch
                v-model:checked="checked"
                @change="changeTheme"
                class="mr-3"
                checkedValue="light"
                unCheckedValue="dark"
            >
                <template #checkedChildren>
                    <span class="iconfont icon-sun"></span>
                </template>
                <template #unCheckedChildren>
                    <span class="iconfont icon-moon"></span>
                </template>
            </a-switch>

            <!-- 我的-下拉 -->
            <a-dropdown>
                <a-button type="text" class="mine-btn">
                    <template #icon>
                        <UserOutlined />
                    </template>
                    
                    {{ phone }}
                </a-button>

                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                        <a href="javascript:;" @click="toHome">返回首页</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="logout">退出登录</a>
                    </a-menu-item>
                  </a-menu>
                </template>
            </a-dropdown>
        </div>
    </header>
</template>

<script setup>
import router from '@/router'
import { UserOutlined, ExclamationCircleOutlined, } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { defineProps, ref, createVNode } from 'vue'
import { useThemeStore } from '@/store/theme'

defineProps({
    isHideRight: { type: Boolean, default: false },
})

let phone = localStorage.getItem('phone')


function logout() {
    Modal.confirm({
        title: '温馨提示 🧡',
        content: '是否确认退出登录？',
        icon: createVNode(ExclamationCircleOutlined),
        cancelText: '取消',
        okText: '确认',
        onOk() {
            localStorage.removeItem('token')
            message.success('退出登录成功！')
            router.push('/login')
        },
    })
}

function toHome() {
    router.push('/')
}

// 主题切换
const themeStore = useThemeStore()
let checked = ref(themeStore.theme)

function changeTheme(val) {
    localStorage.setItem('themeColor', val)
    themeStore.setTheme(val)
}

</script>

<style lang="scss" scoped>
.head-box {
    background-color: var(--theme-background);
}

.bg-black {
    background-color: black;
    color: white;
    .mine-btn {
        color: white;
    }
}

.ant-switch {
    line-height: 21px;
}

.ant-switch-checked {
    background-color: #ffad11;
}

.ant-switch-checked:hover {
    background-color: #ffcd6d !important;
}
</style>
