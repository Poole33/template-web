import request from '@/api/index'

export function login(req) {
    return request.post('/v1/account/login', req)
}

export function register(req) {
    return request.post('/v1/account/register', req)
}

export function captcha() {
    return request.get('/v1/account/captcha')
}
