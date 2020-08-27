const {
  format
} = require('./format')
const {
  calculateData
} = require('./calculateData')

function generatStatement(name, playItemsStatementInfo, totalAmount, volumeCredits) {
  let result = `Statement for ${name}\n`;
  result += playItemsStatementInfo;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function generatStatementHtml(name, playItemsStatementInfo, totalAmount, volumeCredits) {
  let statementHtml = `<h1>${name}</h1>\n` +
  '<table>\n' +
  '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
  ` <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n` +
  ` <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n` +
  ` <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n` +
  '</table>\n' +
  `<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n` +
  `<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
  return statementHtml;
}

function statement(invoice, plays) {

  let {
    playItemsStatementInfo,
    totalAmount,
    volumeCredits
  } = calculateData(invoice.performances, plays)

  return generatStatement(invoice.customer, playItemsStatementInfo, totalAmount, volumeCredits);
}

function statementHtml(invoice, plays) {
  let {
    playItemsStatementInfo,
    totalAmount,
    volumeCredits
  } = calculateData(invoice.performances, plays)
  
 
  return generatStatementHtml(invoice.customer,playItemsStatementInfo, totalAmount, volumeCredits);

}

module.exports = {
  statement,
  statementHtml
};