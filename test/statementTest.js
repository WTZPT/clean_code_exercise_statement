const test = require('ava');
const {
  statement,statementHtml
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

test('Case3 BigCo Buy Tickets but hamlet audience less ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
        'playID': 'hamlet',
        'audience': 30,
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
    ` Hamlet: $400.00 (30 seats)\n` +
    ` As You Like It: $580.00 (35 seats)\n` +
    ` Othello: $500.00 (40 seats)\n` +
    `Amount owed is $1,480.00\n` +
    `You earned 22 credits \n`;
  //then
  t.is(result, expectResult);

});

test('Case4 BigCo Buy Tickets but as-like audience less ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
        'playID': 'hamlet',
        'audience': 30,
      },
      {
        'playID': 'as-like',
        'audience': 20,
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
    ` Hamlet: $400.00 (30 seats)\n` +
    ` As You Like It: $360.00 (20 seats)\n` +
    ` Othello: $500.00 (40 seats)\n` +
    `Amount owed is $1,260.00\n` +
    `You earned 14 credits \n`;
  //then
  t.is(result, expectResult);

});

test('statement case 8. Customer BigCo has three performances. ' +
    'Hamlet has 55 audiences. ' +
    'As You Like Is has 35 audiences. ' +
    'Othello has 40 audiences.outPutHTML ', t => {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
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
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n');
});