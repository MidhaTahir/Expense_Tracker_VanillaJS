////// Project done by following Brad Traversy Tutorial //////

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.querySelector('#text');
const amount = document.querySelector('#amount');


// const dummyTransactions = [
//     {id : 1 , text : 'Flower' , amount : -20},
//     {id : 2 , text : 'Salary' , amount :  300},
//     {id : 3 , text : 'Book' , amount :  -10},
//     {id : 4 , text : 'Camera' , amount :  150},  
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')); //it will string so apply JSON parse to make it array

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];//if local storage is none set localStorageTransactions to empty array

//Add Transaction
function addTransaction(e){
    if(textInput.value.trim() === '' || amount.value.trim() === '') {
        alert('Enter Add Text and Amount First');
    }
    else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }

    e.preventDefault();
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}


//Add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = 
    `
    ${transaction.text}
    <span>${transaction.amount}</span>
    <button class="delete-btn" 
    onclick="removeTransaction(${transaction.id})">
    x</button>
    `;

//<span>${sign}${Math.abs(transaction.amount)}<.span>

    list.appendChild(item);
}

//Remove Transaction by Id
function removeTransaction(id){
    transactions = transactions.filter(transaction =>
    transaction.id !== id);
    
    updateLocalStorage();
    init();
}


//Update the balance ,income and expense
function updateValues(){
    
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);

    const expense = (amounts.
                        filter(item => item < 0).
                        reduce((acc,item) => (acc += item),0) * -1).
                        toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Update Local Storage Transaction
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

//Init app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);