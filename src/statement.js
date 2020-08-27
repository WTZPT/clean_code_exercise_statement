const {
  format
} = require('./format')
const { calculateData } = require('./calculateData')

function generatStatement(name,playItemsStatementInfo, totalAmount, volumeCredits) {
  let result = `Statement for ${name}\n`;
  result += playItemsStatementInfo;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function statement(invoice, plays) {

  let {
    playItemsStatementInfo,
    totalAmount,
    volumeCredits
  } = calculateData(invoice.performances, plays)

  return generatStatement(invoice.customer,playItemsStatementInfo, totalAmount, volumeCredits);
}

module.exports = {
  statement,
};