import { BarChart } from "./components/BarChart"

const Home = () => {

  return (
    <div>
      <BarChart title={'三大框架满意度'}
        xData={['Vue', 'React', 'Angular']}
        sData={[2000, 5000, 1000]}>
      </BarChart>
      <BarChart title={'三大框架使用数量'}
        xData={['Vue', 'React', 'Angular']}
        sData={[112000, 115000, 111000]}
        style={{ width: '500px', height: '400px' }}>
      </BarChart>
    </div>
  )
}

export default Home