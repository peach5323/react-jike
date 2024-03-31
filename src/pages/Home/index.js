import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

const Home = () => {

  const chartRef=useRef(null)
  useEffect(() => {
    // 保证dom可用 才进行图标的渲染
    // 渲染图表的dom节点
    const chartDom = chartRef.current
    // 图表初始化实例化对象
    const myChart = echarts.init(chartDom);
    // 图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    // 使用图标参数，完成渲染
    option && myChart.setOption(option);
})

  return <div><div ref={chartRef} style={{width:'500px',height:'500px'}}></div></div>
}

export default Home