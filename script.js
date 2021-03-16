'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = (movements) => {
    containerMovements.innerHTML = '';

    movements.map((move, index) => {
        const type = move > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">${move}</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });

};

displayMovements(account1.movements);

const calcAndDisplayBalance = (allMovements) => {
    const balance = allMovements.reduce((acc, curr) => acc + curr, 0);

    labelBalance.textContent = `${balance} EUR`;
}

calcAndDisplayBalance(account2.movements);

const calcDisplaySummary = (movements) => {
    const incomes = movements
        .filter(move => move > 0)
        .reduce((acc, curr) => acc + curr, 0);

    labelSumIn.textContent = `${incomes} EUR`;

    const out = movements.filter(move => move < 0)
        .reduce((acc, curr) => acc + curr);

    labelSumOut.textContent = `${Math.abs(out)} EUR`;

    const interest = movements
        .filter(move => move > 0)
        .map(deposit => deposit * 1.2 / 100)
        .filter((element) => element >= 1)
        .reduce((acc, curr) => acc + curr);

    labelSumInterest.textContent = `${interest} EUR`;
};

calcDisplaySummary(account1.movements);

const createUserName = (accountArr) => {
    accountArr.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};

createUserName(accounts);


// const user = 'Steven Thomas Williams';
// //stw
// let username = user.toLowerCase().split(' ').map(name => name[0]).join('');
// console.log(username);
// let userName222 = user.toLowerCase().split(' ').map(n => n.slice(0, 1)).join('');
// console.log(userName222);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// movements.forEach(move => {
//   if(move > 0){
//     console.log(`${move} was deposited `);
//   } else {
//     console.log(`${move} was withdrew`);
//   }
// });

// console.log("*******");
// for(const movement of movements){
//   if(movement > 0){
//     console.log(`${movement} was deposited `);
//   } else{
//     console.log(`${movement} was withdrew`);
//   }
// };

// console.log("*******");
// for(const [key, move] of movements.entries()){
//   if(move > 0){
//     console.log(`${key + 1} ${move} was deposited `);
//   } else{
//     console.log(`${key + 1} ${move} was withdrew`);
//   }
// };

// console.log("*******");
// movements.forEach((move, index, arr) => {
//   if(move > 0){
//     console.log(`${index + 1} ${move} was deposited `);
//   } else{
//     console.log(`${index + 1} ${move} was withdrew`);
//   }
// })

//map
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

// currencies.forEach((currency, key, map) => {
//   console.log(`key: ${key}, value: ${currency}`);
// });
//
// //set
// const newCurrencies = new Set(['USD', 'GBP', 'EUR']);
// console.log('set');
// newCurrencies.forEach((value, key, set) => {
//   console.log(`key: ${key}, value: ${value}`);
// })

const euroToUsd = 1.1;
const movementsUSD = movements.map(move => move * euroToUsd);
console.log(movements);
console.log(movementsUSD);


// const movementsDescriptions = movements.map((move, i, arr) => {
//     const type = move > 0 ? 'deposit' : 'withdrawal';
//     return `${i + 1} ${type} ${move} \n`;
// });

const movementsDescriptions = movements.map((move, i) =>
    `${i + 1} You ${move > 0 ? 'deposit' : 'withdrawal'} ${Math.abs(move)} \n`
);
console.log(movementsDescriptions);


///create array of deposits
const deposits = movements.filter(move => move > 0);
const withdrawals = movements.filter(move => move < 0);
console.log(deposits);
console.log(withdrawals);

//calculate balance
const balance = movements.reduce((acc, curr, index, arr) => acc + curr, 0);
console.log('balance', balance);

let res = 0;
console.log(movements.forEach(move => {
    res += move;
}));
console.log(res);

//calc maximum of the movements arr
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log("********");
const max = movements.reduce((acc, curr, index, arr) => {
    if (acc > curr) {
        return acc;
    } else {
        return curr;
    }
}, movements[0]);
console.log('max: ', max);

//
const depositInUSD = (movements) => {
    return movements.filter(move => move > 0)
        .map(move => move * euroToUsd)
        .reduce((acc, curr) => acc + curr);
};
console.log("deposit in usd", depositInUSD(movements));

const firstWithdrawal = movements.find(move => move < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Sarah Smith');
console.log('found account: ', account);
console.log('*******')
for (let acc of accounts) {
    if (acc.owner === 'Sarah Smith') {
        console.log(acc);
    }
}