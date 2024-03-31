import { request } from "@/utils";

// 获取-所有频道
export const getChannelsAPI = () => request.get('/channels')