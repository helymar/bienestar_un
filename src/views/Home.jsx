import React, {useState} from 'react'
import InfoCard from 'components/Card/InfoCard';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)


const Dashboard = () => {

  const [data, setData]= useState({
    "labels": ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets:[
      {
        label: "Eventos abiertos",
        data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
        backgroundColor:'#33a1ff',
        borderColor:'#11009b',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      },
      {
        label: "Actividades internas",
        data: [51, 82, 31, 59, 61, 73, 91, 58],
        backgroundColor: '#FFa10f',
        borderColor: '#00dd00',
        tension: 0.4,
        fill: true,
        pointStyle: 'rect',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#0ff',
        showLine: true
      },
    ]
  })

    return (
        <div className='flex flex-col'>
            <div>
                <h2>Dashboard</h2>
            </div>
            <div className='flex justify-around mt-20'>
                <InfoCard/>
                <InfoCard/>
                <InfoCard/>
                <InfoCard/>
                <InfoCard/>
            </div>
            <div className='flex justify-around mt-10'>
              <div style={{width:'300px', height:'300px'}}>
            <h4>Categorías más frecuentadas</h4>
                <Line data={data}/>
              </div>
              <div style={{width:'300px', height:'300px'}}>
            <h4>Términos más utilizados</h4>
                <Line data={data}/>
              </div>
              <div style={{width:'300px', height:'300px'}}>
                <h4>Grupos Registrados en la plataforma</h4>
                <Line data={data}/>
              </div>
            </div>
        </div>
    )
}

export default Dashboard