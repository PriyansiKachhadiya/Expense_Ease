

import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);  
  
function CategoryChart({data}){
    return <div className="chartMenu">
    <div className='chartdiv'>
     <Doughnut data={data}></Doughnut>
    </div>
    </div>
}
export default CategoryChart;
