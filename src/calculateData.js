const {
  format
} = require('./format')

calculateAmountByPlayTypeAndAudience = (playType, audience) => {
  let thisAmount = 0;
  switch (playType) {
    case 'tragedy':
      thisAmount = 40000;
      if (audience > 30) {
        thisAmount += 1000 * (audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (audience > 20) {
        thisAmount += 10000 + 500 * (audience - 20);
      }
      thisAmount += 300 * audience;
      break;
    default:
      throw new Error(`unknown type: ${playType}`);
  }
  return {
    thisAmount
  }
}


const calculateData = (performances, plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let str = '';
  for (let perf of performances) {
    const play = plays[perf.playID];

    let {
      thisAmount
    } = calculateAmountByPlayTypeAndAudience(play.type, perf.audience)
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    //print line for this order
    str += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  return {
    str,
    totalAmount,
    volumeCredits
  }
}

module.exports = {
  calculateData
}