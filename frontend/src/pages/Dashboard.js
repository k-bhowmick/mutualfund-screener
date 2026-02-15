import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [funds, setFunds] = useState([]);

  const calculate = async () => {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + "/api/score",
      {
        weights: {
          sharpe: 0.4,
          expenseRatio: 0.2,
          volatility: 0.2,
          consistency: 0.2
        }
      }
    );
    setFunds(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mutual Fund Analyzer</h2>
      <button onClick={calculate}>Calculate Scores</button>
      <ul>
        {funds.map(f => (
          <li key={f._id}>
            {f.name} - {f.score?.toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  );
}
