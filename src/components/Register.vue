<template>
    <a-form
        :model="formData"
        name="basic"
        :label-col="{ span: 4 }"
        labelAlign="left"
        autocomplete="off"
        @finish="onFinish"
    >
        <a-form-item
            label="手机号"
            name="phone"
            :rules="[
                { required: true, message: '请输入手机号！' },
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
            ]"
        >
            <a-input
                v-focus
                autocomplete="username"
                v-model:value="formData.phone"
                placeholder="请输入手机号"
            />
        </a-form-item>

        <a-form-item
            label="密码"
            name="pwd"
            :rules="[{ required: true, message: '请输入密码!' }]"
        >
            <a-input-password
                v-model:value="formData.pwd"
                placeholder="请输入密码"
                autocomplete="current-password"
            />
        </a-form-item>

        <a-form-item
            label="确认密码"
            name="pwdCheck"
            :rules="[
                { required: true, message: '请确认密码!' },
                { validator: checkPwd, tirgger: 'change' }
            ]"
        >
            <a-input-password
                v-model:value="formData.pwdCheck"
                placeholder="请输入密码"
                autocomplete="current-password"
            />
        </a-form-item>

        <a-form-item>
            <a-button class="h-12 w-full text-base" type="primary" html-type="submit">注册</a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { register, captcha } from '@/api/module/login.js'
import { message } from 'ant-design-vue'
import router from '@/router';
// let emit = defineEmits(['success'])

let formData = ref({})


function checkPwd(rule, value, callback) {
    if (value != formData.value.pwd) callback('两次密码不一致，请检查')
    callback()
}

async function onFinish() {
    // 设置图形验证码
    const checkCode = await captcha()
    if (checkCode.code != 200) return
    formData.value.code = checkCode.data

    const res = await register(formData.value)
    if (res.code != 200) return

    message.success('注册成功')
    localStorage.setItem('phone', res.data.phone)
    localStorage.setItem('token', res.data.token)
    router.push('/')
    // emit('success', {  })
}
</script>

<style lang="scss" scoped>

</style>
