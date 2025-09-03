function sma(data, period) {
  if (data.length < period) return 0;
  return data.slice(-period).reduce((a, b) => a + b, 0) / period;
}

function rsi(data, period = 14) {
  if (data.length < period + 1) return 50;
  let gains = 0, losses = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  const rs = gains / (losses || 1);
  return 100 - 100 / (1 + rs);
}

function getIndicatorScore(closes) {
  const ema20 = sma(closes, 20);
  const ema50 = sma(closes, 50);
  const rsi14 = rsi(closes, 14);

  let score = 50;
  if (ema20 > ema50) score += 20;
  else score -= 20;

  if (rsi14 > 70) score -= 15;
  else if (rsi14 < 30) score += 15;

  return Math.min(100, Math.max(0, score));
}

module.exports = { getIndicatorScore };
