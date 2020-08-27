const test = require('ava');
const {
  statement
} = require('../src/statement');


test('Case1 BigCo Buy Tickets', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  //when
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n' +
    ` Hamlet: $650.00 (55 seats)\n` +
    ` As You Like It: $580.00 (35 seats)\n` +
    ` Othello: $500.00 (40 seats)\n` +
    `Amount owed is $1,730.00\n` +
    `You earned 47 credits \n`;
  //then
  t.is(result, expectResult);

});

test('Case2 Customer BigCo has one unknown performance.', t => {
  //given
  const plays = {
    'othello': {
      'name': 'Othello',
      'type': 'tragedy1',
    },
  };
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
      'playID': 'othello',
      'audience': 40,
    }, ],
  };
  //when
  //then
  try {
    statement(invoice, plays);
    t.fail();
  } catch (e) {
    t.is(e.message, 'unknown type: tragedy1');
  }
});

