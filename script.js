// Expenses
const account1 = {
  owner: "Rudra Prasad Pal",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, -500, 6500],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Mahaveer Prasad Pal Manty",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, -700, 5500],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Mahadev Prasad Pal Janty",
  movements: [200, -200, 340, -300, -20, 50, 400, 460, 6450, -980, -1245],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Ashutosh Pal",
  movements: [430, 1000, 700, 50, 90, 2590, -1745, -250],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Suresh Kumar Behera",
  movements: [430, 1000, 1700, 50, 9000, -5460, -1800, 1400],
  interestRate: 1,
  pin: 5555,
};

const account6 = {
  owner: "Rajanikanta Majhi",
  movements: [430, 1000, 700, -50, -90, 5640, 6820, -2460, 450, -840, -150],
  interestRate: 1,
  pin: 6666,
};

const account7 = {
  owner: "Dibyaranjan Behera",
  movements: [4300, 1000, 700, 500, 900, -6500, -2340, 8450],
  interestRate: 1,
  pin: 7777,
};

const account8 = {
  owner: "Sambit Srichandan",
  movements: [430, 1000, 700, 450, -390, -160, 2700, 1980, -320],
  interestRate: 1,
  pin: 8888,
};

const account9 = {
  owner: "Kumarsen Parida",
  movements: [430, 1000, 700, -350, 950, 4500, -560, -110, 2450],
  interestRate: 1,
  pin: 9999,
};

const account10 = {
  owner: "Roshan Panigrahi",
  movements: [430, 1000, 700, 650, -590, -450, 9450, 1270, -645, -560],
  interestRate: 1,
  pin: 1010,
};

const accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
  account8,
  account9,
  account10,
];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".btn__login");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnLogout = document.querySelector(".btn__logout");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////////////////////////////////////////////////
// DISPLAYS
////////////////////////////////////////////////////////////

// Display the current date
const date = new Date();
document.querySelector(".date").innerHTML =
  date.toDateString() + " " + date.toLocaleTimeString();

// Display Movements
const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__value">${mov}₹</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Display Balance
const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} ₹`;
};

// Display Summary
const calcDisplaySummery = (account) => {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes} ₹`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} ₹`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest} ₹`;
};

// Create User Name
const createUserNames = (accs) => {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

// Udate UI
const updateUI = (currentAccount) => {
  displayMovements(currentAccount.movements);

  calcDisplayBalance(currentAccount);

  calcDisplaySummery(currentAccount);
};

////////////////////////////////////////////////////////////
// EVENT HANDLERS
////////////////////////////////////////////////////////////

// Event Login
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  // updateUI(currentAccount);

  if (inputLoginPin.value !== "" && inputLoginUsername.value !== "") {
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(" ")[0]
      }`;

      containerApp.style.opacity = 100;

      inputLoginUsername.style.opacity = 0;
      inputLoginPin.style.opacity = 0;
      btnLogin.style.opacity = 0;

      updateUI(currentAccount);
    } else {
      alert(`Account does not exist.\nWrong username or password. Try again.`);
    }
  } else {
    alert(`Please enter the credentials.`);
  }
});

// Event Transfer Money
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);

  const receiverAcocunt = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  if (
    transferAmount > 0 &&
    receiverAcocunt &&
    currentAccount.balance >= transferAmount &&
    receiverAcocunt?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-transferAmount);
    receiverAcocunt.movements.push(transferAmount);

    alert(
      `${transferAmount}₹ was successfully transfered to ${
        receiverAcocunt.owner.split(" ")[0]
      } ✅`
    );

    updateUI(currentAccount);
  } else {
    alert(`Insufficient balance ⛔`);
  }

  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();
});

// Event Loan Aplly
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    alert(`Loan amount of ${loanAmount}₹ has been approved ✅`);

    currentAccount.movements.push(loanAmount);

    updateUI(currentAccount);
  } else {
    alert(`You are not eligible for the requested loan amount ⛔`);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// Event sorting
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Event Close Account
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.userName === currentAccount.userName
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = "";

    alert(
      `Dear ${
        currentAccount.owner.split(" ")[0]
      }, your ccount has been closed ⛔`
    );
  }
});

// Event Log out
btnLogout.addEventListener("click", () => {
  containerApp.style.opacity = 0;

  inputLoginUsername.style.opacity = 100;
  inputLoginPin.style.opacity = 100;
  btnLogin.style.opacity = 100;

  inputLoginPin.value = "";
  inputLoginUsername.value = "";

  alert("You have successfully logged out.");
});
