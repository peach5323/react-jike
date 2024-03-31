import { useEffect, useState } from 'react'
import { getChannelsAPI } from '@/apis/article'

export const useChannel = () => {
  // 获取频道列表
  const [channels, setChannels] = useState([])

  useEffect(() => {
    // 封装函数，在函数体内调用接口
    const getChannels = async () => {
      const res = await getChannelsAPI()
      setChannels(res.data.channels)
    }
    // 调用函数
    getChannels()
  }, [])
  // 把组件要用的数据return出去
  return {channels}
}