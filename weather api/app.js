const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const imageSrc = document.querySelector(".select-container img");
const btn = document.querySelector("#submit");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const finalMsg = document.querySelector(".msg");

// for (let code in dropdowns) {
//     console.log(code.name);
// }

//as queryselectorall returns node list so we need to iuse foreach instead of the for in loop,
dropdowns.forEach(select => {
    for (let curr in countryList) {
        let newOptn = document.createElement("option");
        newOptn.innerText = curr;
        newOptn.value = curr;
        if (select.name == "from" && curr === "USD") {
            newOptn.selected = "selected";
        } else if (select.name == "to" && curr === "INR") {
            newOptn.selected = "selected";
        }
        select.append(newOptn);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
});

const updateFlag = (target) => {
    let currCode = target.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let currImg = target.parentElement.querySelector("img");
    currImg.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate = async () => {
    let amount = document.querySelector("#amount");
    let moneyValue = amount.value;
    if (moneyValue === "" || moneyValue < 1) {
        moneyValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let totalRate = moneyValue * rate;
    finalMsg.innerText = `${moneyValue} ${fromCurr.value} = ${totalRate} ${toCurr.value}`;
};

window.addEventListener("load", () => {
    updateExchangeRate();
});


