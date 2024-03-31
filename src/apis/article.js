import { request } from "@/utils";

// 获取-所有频道
export const getChannelsAPI = () => request.get('/channels')

// 新增-文章
export const addArticleAPI = ({ draft, data }) => request.post(`/mp/articles?draft=${draft}`, data)

// 获取-文章列表
export const getArticleListAPI = (params) => request.get('/mp/articles', {params})