import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function SummaryCard({title,value,icon}){
    return <>
    <Card className='summary-card'>
     <CardContent>
     <div className="card-icon">{icon}</div>
        <h4>{title}</h4>
        <p>{value}</p>
     </CardContent>
    </Card>
    </>
}

export default SummaryCard;