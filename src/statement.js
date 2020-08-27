const {
  format
} = require('./format')
const { calculateData } = require('./calculateData')

function generatStatement(name,str, totalAmount, volumeCredits) {
  let result = `Statement for ${name}\n`;
  result += str;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function statement(invoice, plays) {

  let {
    str,
    totalAmount,
    volumeCredits
  } = calculateData(invoice.performances, plays)

  return generatStatement(invoice.customer,str, totalAmount, volumeCredits);
}

module.exports = {
  statement,
};