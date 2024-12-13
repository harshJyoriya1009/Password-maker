console.log("Password")


const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");



const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const getRandomSymbol = () => {
  const symbols = "@.!#&";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

const createNotification = (message) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

clipboardElement.addEventListener("click", () => {
  const password = resultElement.innerText;
  if (!password) 
  return;
  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  createNotification("Password copied to Keyboard!");
})

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;
  resultElement.innerText = generatePassword(hasLower , hasUpper , hasNumber , hasSymbol , length);
})

const generatePassword = (upper, lower , symbol, number, length) => {
  let generatedPassword = "";
  const typesCount = upper + lower + symbol + number;
  const typesArr = [{ upper }, { lower }, { symbol }, { number }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0)
     return "";
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunctions[funcName]()
    })
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
 