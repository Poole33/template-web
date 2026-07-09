<template>
    <t-form
        :data="formData"
        label-align="left"
        label-width="80px"
        autocomplete="off"
        @submit="onSubmit"
        class="pt-6"
    >
        <t-form-item
            label="手机号"
            name="phone"
            :rules="[
                { required: true, message: '请输入手机号！' },
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
            ]"
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

        <t-form-item
            label="确认密码"
            name="pwdCheck"
            :rules="[
                { required: true, message: '请确认密码!' },
                { validator: checkPwd, trigger: 'change' }
            ]"
        >
            <t-input
                v-model:value="formData.pwdCheck"
                type="password"
                placeholder="请输入密码"
                autocomplete="current-password"
            />
        </t-form-item>

        <t-form-item>
            <t-button class="submit-btn" theme="primary" type="submit">注册</t-button>
        </t-form-item>
    </t-form>
</template>

<script setup>
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import router from '@/router'
import { captcha, register } from '@/api/module/login.js'
// let emit = defineEmits(['success'])

const formData = ref({
    phone: '',
    pwd: '',
    pwdCheck: '',
})


function checkPwd(value) {
    if (value != formData.value.pwd) {
        return { result: false, message: '两次密码不一致，请检查', type: 'error' }
    }
    return true
}

async function onSubmit({ validateResult }) {
    if (validateResult !== true) return

    // 设置图形验证码
    const checkCode = await captcha()
    if (checkCode.code != 200) return
    formData.value.code = checkCode.data

    const res = await register(formData.value)
    if (res.code != 200) return

    MessagePlugin.success('注册成功')
    localStorage.setItem('phone', res.data.phone)
    localStorage.setItem('token', res.data.token)
    router.push('/')
    // emit('success', {  })
}
</script>

<style lang="scss" scoped>
.submit-btn {
    width: 100%;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    background: var(--theme-primary);
}
</style>
