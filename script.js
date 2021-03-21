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

const displayMovements = (movements, sort = false) => {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.map((move, index) => {
        const type = move > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">${move}</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcAndDisplayBalance = (anyAccount) => {
    anyAccount.balance = anyAccount.movements.reduce((acc, curr) => acc + curr, 0);

    labelBalance.textContent = `${anyAccount.balance} EUR`;
}

const calcDisplaySummary = (anyAccount) => {
    const incomes = anyAccount.movements
        .filter(move => move > 0)
        .reduce((acc, curr) => acc + curr, 0);

    labelSumIn.textContent = `${incomes} EUR`;

    const out = anyAccount.movements.filter(move => move < 0)
        .reduce((acc, curr) => acc + curr);

    labelSumOut.textContent = `${Math.abs(out)} EUR`;

    const interest = anyAccount.movements
        .filter(move => move > 0)
        .map(deposit => (deposit * anyAccount.interestRate) / 100)
        .filter((element) => element >= 1)
        .reduce((acc, curr) => acc + curr);

    labelSumInterest.textContent = `${interest} EUR`;
};

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

const updateUI = (currentAcc) => {
    calcAndDisplayBalance(currentAcc);
    calcDisplaySummary(currentAcc);
    displayMovements(currentAcc.movements);
}

// const user = 'Steven Thomas Williams';
// //stw
// let username = user.toLowerCase().split(' ').map(name => name[0]).join('');
// console.log(username);
// let userName222 = user.toLowerCase().split(' ').map(n => n.slice(0, 1)).join('');
// console.log(userName222);

let currentAccount;

btnLogin.addEventListener('click', (event) => {
    event.preventDefault();

    currentAccount = accounts.find(acc =>
        acc.username === inputLoginUsername.value
    );
    console.log('currentAccount: ', currentAccount);


    if (currentAccount.pin && currentAccount.pin === Number(inputLoginPin.value)) {

        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        inputLoginUsername.value = '';
        inputLoginPin.value = '';
        inputLoginPin.blur();
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', (event) => {
    event.preventDefault();
    const amountToTransfer = Number(inputTransferAmount.value);

    const recriverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log('transfer button was clicked')
    console.log('person to transfer: ', recriverAccount);
    console.log('amount: ', amountToTransfer);

    inputTransferAmount.value = inputTransferTo.value = '';

    if (amountToTransfer > 0 && currentAccount.balance >= amountToTransfer
        && recriverAccount && recriverAccount !== currentAccount) {

        //doing the transfer
        currentAccount.movements.push(-amountToTransfer);
        recriverAccount.movements.push(amountToTransfer);

        updateUI(currentAccount);
    }

});

btnLoan.addEventListener('click', event => {
    event.preventDefault();
    console.log('loan was clicked');
    const loanAmount = Number(inputLoanAmount.value);
    if (loanAmount > 0 && currentAccount.movements.some(move => move >= (loanAmount) / 10)) {
        currentAccount.movements.push(Number(inputLoanAmount.value));
        updateUI(currentAccount);
        console.log('lone is approved');
    }

    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', (event) => {
    event.preventDefault();

    if (inputCloseUsername.value && +inputClosePin.value
        && inputCloseUsername.value === currentAccount.username
        && +inputClosePin.value === currentAccount.pin
    ) {
        console.log('user name & pin are valid');
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);
        containerApp.style.opacity = 0;

    }
    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', event => {
    event.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});
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


// const movementsDescriptions = movements.map((move, i, arr) => {
//     const type = move > 0 ? 'deposit' : 'withdrawal';
//     return `${i + 1} ${type} ${move} \n`;
// });

const movementsDescriptions = movements.map((move, i) =>
    `${i + 1} You ${move > 0 ? 'deposit' : 'withdrawal'} ${Math.abs(move)} \n`
);


///create array of deposits
const deposits = movements.filter(move => move > 0);
const withdrawals = movements.filter(move => move < 0);

//calculate balance
const balance = movements.reduce((acc, curr, index, arr) => acc + curr, 0);

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

//
const depositInUSD = (movements) => {
    return movements.filter(move => move > 0)
        .map(move => move * euroToUsd)
        .reduce((acc, curr) => acc + curr);
};

const firstWithdrawal = movements.find(move => move < 0);

const account = accounts.find(acc => acc.owner === 'Sarah Smith');
for (let acc of accounts) {
    if (acc.owner === 'Sarah Smith') {
        console.log(acc);
    }
}

console.log('>>>>>>>>>');
console.log(movements);
//equality
console.log(movements.includes(-130));
console.log('>>>>>>>>>');
//some condition
console.log(movements.some(mov => mov < 200));
console.log('>>>>>>>>>');
//every condition
console.log('>>>>> any condition >>>>');
console.log(movements.every(move => move > 0));
console.log(account4.movements.every(tr => tr > 0));
//separate callback
console.log('all movements >>>>>>>>>');
const allMovements = accounts.map(acc => acc.movements);
console.log(allMovements)
