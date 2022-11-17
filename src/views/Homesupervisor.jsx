import React, {useState} from 'react'
import InfoCard from 'components/Card/InfoCard';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)


const Homesupervisor = () => {

  const [data, setData]= useState({
    labels:["Semana 1"," Semana 2", "Semana 3", "Semana 4"],
    datasets:[
      {
        label:"Dataset",
        data:[3,4,4,3],
        backgroundColor:'#33a1ff',
        borderColor:'#11009b',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  })

    return (
        <div className='flex flex-col'>
            <div>
                <h2>Dashboard</h2>
            </div>
            <div className='flex justify-around mt-10'>
              <div style={{width:'500px', height:'500px'}}>
                <h4>Horas realizadas en las ultimas 3 semanas</h4>
                <Line data={data}/>
              </div>
            </div>
        </div>
    )
}

export default Homesupervisor