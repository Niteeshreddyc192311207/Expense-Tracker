let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateBalance() {
  let balance = 0;

  transactions.forEach(item => {
    if (item.type === "income") {
      balance += Number(item.amount);
    } else {
      balance -= Number(item.amount);
    }
  });

  document.getElementById("balance").innerText = "₹" + balance;
}

function showTransactions() {
  const list = document.getElementById("transactions");
  list.innerHTML = "";

  transactions.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.type;
    li.innerHTML = `
      ${item.description}
      <span>₹${item.amount}</span>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateBalance();
}

function addTransaction() {
  const description = document.getElementById("description").value.trim();
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (description === "" || amount === "") {
    alert("Please enter description and amount");
    return;
  }

  transactions.push({ description, amount, type });
  showTransactions();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  showTransactions();
}

showTransactions();
