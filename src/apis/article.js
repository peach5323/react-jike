import { request } from "@/utils";

// 获取-所有频道
export const getChannelsAPI = () => request.get('/channels')

// 新增-文章
export const addArticleAPI = ({ draft, data }) => request.post(`/mp/articles?draft=${draft}`, data)

// 获取-文章列表
export const getArticleListAPI = (params) => request.get('/mp/articles', { params })

// 删除-文章
export const delArticleAPI = (id) => request.delete(`mp/articles/${id}`)

// 获取-文章详情
export const getArticleDetailAPI = (id) => request.get(`mp/articles/${id}`)

// 编辑-文章
export const editArticleAPI = ({ id, data }) => request.put(`mp/articles/${id}`,data)