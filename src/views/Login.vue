<template>
    <div class="login-page">
        <section class="login-card">
            <div class="login-header">
                <div class="brand">demo.</div>
                <h1>{{ activeKey === 'register' ? '创建账号' : '欢迎登录' }}</h1>
                <p>{{ activeKey === 'register' ? '填写信息完成注册' : '请输入账号信息继续访问' }}</p>
            </div>

            <t-tabs v-model:value="activeKey">
                <t-tab-panel value="login" label="用户登录">
                    <t-form
                        :data="formData"
                        label-align="left"
                        label-width="64px"
                        @submit="onSubmit"
                        class="auth-form"
                    >
                        <t-form-item
                            label="手机号"
                            name="phone"
                            :rules="[{ required: true, message: '请输入手机号！' }]"
                        >
                            <t-input
                                v-focus
                                autocomplete="username"
                                v-model:value="formData.phone"
                                placeholder="请输入手机号"
                            />
                        </t-form-item>

                        <t-form-item
                            label="密码"
                            name="pwd"
                            :rules="[{ required: true, message: '请输入密码!' }]"
                        >
                            <t-input
                                v-model:value="formData.pwd"
                                type="password"
                                placeholder="请输入密码"
                                autocomplete="current-password"
                            />
                        </t-form-item>

                        <t-form-item>
                            <t-button class="submit-btn" theme="primary" type="submit">登录</t-button>
                        </t-form-item>
                    </t-form>
                </t-tab-panel>

                <t-tab-panel v-if="showRegister" value="register" label="注册">
                    <Register />
                </t-tab-panel>
            </t-tabs>
        </section>
    </div>
</template>

<script setup>
import { MessagePlugin } from 'tdesign-vue-next'
import { login } from '@/api/module/login.js'
import { useRouter, useRoute } from 'vue-router'
import Register from '@/components/Register.vue'

const router = useRouter()
const route = useRoute()

const formData = ref({
    phone: '',
    pwd: '',
})

async function onSubmit({ validateResult }) {
    if (validateResult !== true) return

    const res = await login(formData.value)
    if (res.code != 200) return

    MessagePlugin.success('登录成功')

    localStorage.setItem('phone', res.data.phone)
    localStorage.setItem('token', res.data.token)
    const redirect = route.query?.redirect
    router.push(redirect || '/')
}

// 默认选中
const activeKey = ref('login')

const showRegister = ref(false)
const key = route.query.key

if (key) {
    showRegister.value = key.includes('register')
    activeKey.value = 'register'
}
</script>

<style lang="scss" scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: var(--theme-color);
    background: var(--theme-bgSecondary);
}

.login-card {
    width: min(440px, 100%);
    padding: 32px;
    border: 1px solid var(--theme-bgTertiary);
    border-radius: 8px;
    background: var(--theme-background);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
}

.login-header {
    margin-bottom: 24px;

    h1 {
        margin: 18px 0 8px;
        color: var(--theme-color);
        font-size: 28px;
        font-weight: 700;
    }

    p {
        margin: 0;
        color: var(--theme-color);
        opacity: 0.58;
        font-size: 14px;
    }
}

.brand {
    color: var(--theme-primary);
    font-size: 24px;
    font-weight: 800;
}

.auth-form {
    padding-top: 22px;
}

.submit-btn {
    width: 100%;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
}

:deep(.t-tabs),
:deep(.t-tabs__content),
:deep(.t-tab-panel),
:deep(.t-tabs__nav) {
    background: transparent;
}

:deep(.t-tabs__content) {
    padding-top: 0;
    border: none;
}

:deep(.t-tabs__bar) {
    height: 2px;
    border-radius: 999px;
}

:deep(.t-tabs__nav-item) {
    height: 38px;
    color: var(--theme-color);
    opacity: 0.58;
    font-weight: 600;
}

:deep(.t-tabs__nav-item.t-is-active) {
    opacity: 1;
}

:deep(.t-form__label) {
    color: var(--theme-color);
    opacity: 0.82;
    font-weight: 600;
}

:deep(.t-input) {
    height: 44px;
    border-color: var(--theme-bgTertiary);
    border-radius: 6px;
    background: var(--theme-background);
    color: var(--theme-color);
    transition: border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

:deep(.t-input:hover),
:deep(.t-input.t-is-focused) {
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary) 14%, transparent);
}

:deep(.t-input__inner) {
    color: var(--theme-color);
}

:deep(.t-input__inner::placeholder) {
    color: var(--theme-color);
    opacity: 0.38;
}

:global(.dark) .login-card {
    border-color: var(--theme-bgSecondary);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
}

:global(.dark) :deep(.t-input) {
    background: var(--theme-bgTertiary);
    border-color: var(--theme-bgSecondary);
}

@media (max-width: 520px) {
    .login-page {
        padding: 16px;
    }

    .login-card {
        padding: 24px;
    }
}
</style>
