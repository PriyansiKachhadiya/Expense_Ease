
import SummaryCard from "./SummaryCard";

function SummaryCardMenu({ summaryData }) {
  return (
    <div className="summary-card-menu">
      {summaryData.map((summary, idx) => (
        <SummaryCard 
          title={summary.title} 
          value={summary.value} 
          icon={summary.icon} 
          key={idx} 
        />
      ))}
    </div>
  );
}

export default SummaryCardMenu;
