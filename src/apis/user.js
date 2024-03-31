import { request } from "@/utils";

// 登录
export const loginAPI = (data) => request.post('/authorizations', data)

// 获取用户信息
export const getUserInfoAPI = () => request.get('/user/profile')