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

            <!-- 主题切换 -->
            <t-switch
                v-model:value="checked"
                @change="changeTheme"
                class="mr-3"
                :customValue="['light', 'dark']"
                size="large"
                :label="[() => createVNode(SunBoldIcon, {height: '1em'}), () => createVNode(MoonBoldIcon, {height: '1em'})]"
            >
            </t-switch>

            <!-- 我的-下拉 -->
            <t-dropdown
              trigger="click"
            >
                <t-button variant="text" class="mine-btn">
                    <template #icon>
                        <UserBoldIcon height="1em" />
                    </template>
                    
                    {{ phone }}
                </t-button>

                  <t-dropdown-menu>
                    <t-dropdown-item>
                        <t-button variant="text" @click="toHome">返回首页</t-button>
                    </t-dropdown-item>
                    <t-dropdown-item>
                        <t-button variant="text" @click="logout">退出登录</t-button>
                    </t-dropdown-item>
                  </t-dropdown-menu>
            </t-dropdown>
        </div>
    </header>
</template>

<script setup>
import router from '@/router'
import { ref, createVNode } from 'vue'
import { useThemeStore } from '@/store/theme'
import UserBoldIcon from '@iconify-vue/solar/user-bold';
import SunBoldIcon from '@iconify-vue/solar/sun-bold';
import MoonBoldIcon from '@iconify-vue/solar/moon-bold';

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
