// 封装存取方法
const TOKENKEY = 'token_key'

export const setToken = (token) => {
  return localStorage.setItem(TOKENKEY,token)
}

export const getToken = () => {
  return localStorage.getItem(TOKENKEY)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKENKEY)
}