import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore=createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:''
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token=action.payload
    }
  }
})

// 解构出actionCreater
const { setToken } = userStore.actions

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

export { setToken, fetchLogin }

export default userReducer