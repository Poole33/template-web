<template>
	<div class="flex h-screen">
		<!-- <section class="left h-full w-50% bg-cover bg-center bg-no-repeat bg-[url(@/assets/imgs/login-banner.png)]">
			<div class="m4 w-130px h-40px bg-cover bg-no-repeat bg-[url(@/assets/imgs/login-logo.png)]"></div>
		</section> -->
		<section class="right flex grow items-center justify-center">
			<div class="logo-text absolute right-12 top-16 text-2xl font-bold">demo.</div>
			<div class="login-box w-544px rounded-md px-8 py-12">
				<a-tabs v-model:activeKey="activeKey">
					<a-tab-pane key="login" tab="用户登录">
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
                                    // { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
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

							<a-form-item>
								<a-button class="h-12 w-full text-base" type="primary" html-type="submit">登录</a-button>
							</a-form-item>
						</a-form>
					</a-tab-pane>

                    <a-tab-pane key="register" tab="注册" v-if="showRegister">
                        <Register></Register>
                    </a-tab-pane>
				</a-tabs>
			</div>
		</section>
	</div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue'
import { login } from '@/api/module/login.js'
import { useRouter, useRoute } from 'vue-router'
import Register from '@/components/Register.vue';

const router = useRouter()
const route = useRoute()


const formData = ref({
  phone: '',
  pwd: '',
});

async function onFinish(values) {
	const res = await login(values)
	if (res.code != 200) return

    message.success('登录成功')

    localStorage.setItem('phone', res.data.phone)
    localStorage.setItem('token', res.data.token)
    // userStore.setPhone(res.data.phone)
    // console.log(userStore.phone, userStore.getPhone)
    let redirect = route.query?.redirect
    // console.log('redirect', redirect);
    router.push(redirect || '/')
}


// 默认选中
let activeKey = ref('login')


let showRegister = ref(false)
let key = route.query.key

if (key) {
    showRegister.value = key.includes('register')
    activeKey.value = 'register'
}
</script>

<style lang="scss" scoped>
.right {
    background: var(--theme-color);
}

.login-box {
    background: var(--theme-background);
}

.logo-text {
    color: var(--theme-background);;
}


</style>