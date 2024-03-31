import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

const BarChart = ({ title, xData, sData, style = { width: '300px', height: '400px' }}) => {

  const chartRef = useRef(null)
  useEffect(() => {
    // 保证dom可用 才进行图标的渲染
    // 渲染图表的dom节点
    const chartDom = chartRef.current
    // 图表初始化实例化对象
    const myChart = echarts.init(chartDom);
    // 图表参数
    const option = {
      title: {
        text:title
      },
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    };
    // 使用图标参数，完成渲染
    option && myChart.setOption(option);
    
  }, [title, xData, sData, style])

  return <div ref={chartRef} style={style}></div>
}

export { BarChart }
