function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

function computeScores(funds, weights) {
  const stats = {
    minSharpe: Math.min(...funds.map(f => f.sharpeRatio)),
    maxSharpe: Math.max(...funds.map(f => f.sharpeRatio)),
    minExpense: Math.min(...funds.map(f => f.expenseRatio)),
    maxExpense: Math.max(...funds.map(f => f.expenseRatio)),
    minVol: Math.min(...funds.map(f => f.volatility)),
    maxVol: Math.max(...funds.map(f => f.volatility)),
    minCons: Math.min(...funds.map(f => f.consistency)),
    maxCons: Math.max(...funds.map(f => f.consistency)),
  };

  return funds.map(f => {
    const score =
      normalize(f.sharpeRatio, stats.minSharpe, stats.maxSharpe) * weights.sharpe +
      (1 - normalize(f.expenseRatio, stats.minExpense, stats.maxExpense)) * weights.expenseRatio +
      (1 - normalize(f.volatility, stats.minVol, stats.maxVol)) * weights.volatility +
      normalize(f.consistency, stats.minCons, stats.maxCons) * weights.consistency;

    return { ...f._doc, score };
  }).sort((a, b) => b.score - a.score);
}

module.exports = { computeScores };
