import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";

const userStore=createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo=action.payload
    },
    removeUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

// 解构出actionCreater
const { setToken, setUserInfo, removeUserInfo } = userStore.actions

// 获取reducer
const userReducer = userStore.reducer
// 异步请求 获取token
const fetchLogin = (data) => {
  return async (dispatch) => {
    // 1.发送异步请求
    const res = await request.post('/authorizations', data)
    // 2.提交同步action进行token的存入
   dispatch(setToken(res.data.token))
  }
}

// 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    // 1.发送异步请求
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { setToken, removeUserInfo, fetchLogin, fetchUserInfo }

export default userReducer