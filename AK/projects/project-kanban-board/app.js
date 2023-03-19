console.log("Running");
// define variables
// ------------------------------//
const billLists = document.querySelectorAll(".bill-list");
const unpaidBills = document.querySelector("#unpaid .bill-list");
const formTitleInput = document.querySelector("#bill-title");
const formDueInput = document.querySelector("#bill-due");
const formAmountInput = document.querySelector("#bill-amount");
const submitButton = document.querySelector("#bill-submit");
const errorContainer = document.querySelector(".error-container");
const unpaidBillAmount = document.querySelectorAll(".billAmount-container");

let bills = [{
        id: 0,
        title: "Mortgage",
        dateDue: new Date().toLocaleDateString(),
        amountDue: 1000,
    },
    {
        id: 1,
        title: "HOA",
        dateDue: new Date().toLocaleDateString(),
        amountDue: 500,
    },
    {
        id: 2,
        title: "Electric",
        dateDue: new Date().toLocaleDateString(),
        amountDue: 125,
    },
];
// functions
// ------------------------------//

billLists.forEach((billList) => {
    billList.addEventListener("dragover", dragOver);
    billList.addEventListener("drop", dragDrop);
});

function createBill(id, title, dateDue, amountDue) {
    const billCard = document.createElement("div");
    const billCardHeader = document.createElement("div");
    const billTitle = document.createElement("p");
    const billDateContainer = document.createElement("div");
    const billDate = document.createElement("p");
    const billAmountContainer = document.createElement("div");
    const billAmount = document.createElement("p");
    const billDeleteContainer = document.createElement("p");

    billCard.classList.add("bill-container");
    billCardHeader.classList.add("bill-header");
    billDateContainer.classList.add("billDate-container");
    billAmountContainer.classList.add("billAmount-container");

    billTitle.textContent = title;
    billDate.textContent = dateDue;
    billAmount.textContent = "$" + amountDue;
    billDeleteContainer.textContent = "❌";

    billCard.setAttribute("draggable", true);
    billCard.setAttribute("id", id);

    billCard.addEventListener("dragstart", dragStart);
    billDeleteContainer.addEventListener("click", deleteBill);

    billCardHeader.append(billTitle);
    billCardHeader.append(billDeleteContainer);
    billDateContainer.append(billDate);
    billAmountContainer.append(billAmount);
    billCard.append(billCardHeader, billDateContainer, billAmountContainer);

    unpaidBills.append(billCard);
}

function addBills() {
    // bills.forEach((task) => createTask(task));
    bills.forEach((bill) =>
        createBill(bill.id, bill.title, bill.dateDue, bill.amountDue)
    );
}

addBills();

let billBeingDragged;

function dragStart() {
    billBeingDragged = this;
}

function dragOver(e) {
    e.preventDefault();
}

function addTitleBGColor(column) {
    let bgcolor;
    switch (column) {
        case "unpaid":
            bgcolor = "linear-gradient(to bottom, rgb(255, 0, 0), rgb(0, 0, 0)";
            break;
        case "pending":
            bgcolor = "linear-gradient(to bottom, rgb(255, 255, 0), rgb(0, 0, 0)";
            break;
        case "complete":
            bgcolor = "linear-gradient(to bottom, rgb(0, 255, 0), rgb(0, 0, 0)";
            break;
        default:
            bgcolor = "rgb(0,0,0)";
    }
    return bgcolor;
}

function dragDrop() {
    let columnId = this.parentNode.id;
    billBeingDragged.firstChild.style.background = addTitleBGColor(columnId);

    this.append(billBeingDragged);
}

function showError(message) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorContainer.append(errorMessage);
}

function addBill(e) {
    e.preventDefault();

    const filteredTitles = bills.filter((bill) => {
        return bill.title === formTitleInput.value;
    });

    if (!filteredTitles.length) {
        const newId = bills.length;

        bills.push({
            id: newId,
            title: formTitleInput.value,
            dateDue: formDueInput.value,
            amountDue: formAmountInput.value,
        });

        createBill(
            newId,
            formTitleInput.value,
            formDueInput.value,
            formAmountInput.value
        );

        formTitleInput.value = "";
        formDueInput.value = null;
        formAmountInput.value = null;
    }
    // else if () { }
    else {
        showError("Title must be unique");

        setTimeout(() => {
            errorContainer.textContent = "";
        }, 2000);
    }
}

function deleteBill() {
    console.log(this.parentNode.firstChild.textContent);
    const headerTitle = this.parentNode.firstChild.textContent;

    const filteredBills = bills.filter((bill) => {
        return bill.title === headerTitle;
    });

    const newBills = bills.filter((bill) => {
        return bill !== filteredBills[0];
    });

    console.log(newBills);
    bills = newBills;

    this.parentNode.parentNode.remove();
    console.log(amountDueTotals());
}
const totals = [];

function amountDueTotals() {
    for (let i = 0; i < bills.length; i++) {
        totals.push(bills[i].amountDue);
    }
    return totals.reduce((a, b) => a + b);
}

submitButton.addEventListener("click", addBill);