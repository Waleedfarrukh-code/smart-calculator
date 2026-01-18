
// ================== BASIC SETUP ==================
let input = document.querySelector("input");
let buttons = document.querySelectorAll("button");

// initial value
input.value = "0";
function appendSmart(value) {
  if (input.value === "0") {
    input.value = value;
  } else {
    input.value += value;
  }
}

// ================== MAIN BUTTON LOGIC ==================
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.innerText;

    // ---------- CLEAR ONE ----------
    if (value === "C") {
      if (input.value.length > 1) {
        input.value = input.value.slice(0, -1);
      } else {
        input.value = "0";
      }
      return;
    }

    // ---------- CLEAR ALL ----------
    if (value === "AC") {
      input.value = "0";
      return;
    }

    // ---------- EQUAL ----------
    if (value === "=") {
      try {
        let expression = input.value
          .replace(/x/g, "*")
          .replace(/÷/g, "/")
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/ln\(/g, "Math.log(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/exp\(/g, "Math.exp(")
          .replace(/sqrt\(/g, "Math.sqrt(")
          .replace(/\^/g, "**")
          .replace(/e/g, "Math.E");

        let result = eval(expression);
        input.value = result.toString();
      } catch {
        input.value = "Error";
        setTimeout(() => input.value = "0", 1000);
      }
      return;
    }

    // ---------- BRACKETS ----------
    if (value === "()") {
      let open = (input.value.match(/\(/g) || []).length;
      let close = (input.value.match(/\)/g) || []).length;
      input.value += open > close ? ")" : "(";
      return;
    }

    // ---------- PLUS / MINUS ----------
    if (value === "+/-") {
      let num = Number(input.value);
      if (!isNaN(num)) input.value = String(num * -1);
      return;
    }

    // ---------- PERCENT ----------
    if (value === "%") {
      let num = Number(input.value);
      if (!isNaN(num)) input.value = String(num / 100);
      return;
    }

    // ---------- SCIENTIFIC ----------
   if (value === "sin") { appendSmart("sin("); return; }
if (value === "cos") { appendSmart("cos("); return; }
if (value === "tan") { appendSmart("tan("); return; }
if (value === "xl")  { appendSmart("ln(");  return; }
if (value === "log") { appendSmart("log("); return; }
if (value === "℮")   { appendSmart("exp("); return; }
if (value === "√")   { appendSmart("sqrt("); return; }
if (value === "e")   { appendSmart("e"); return; }
if (value.includes("y")) { appendSmart("^"); return; }


    // ---------- OPERATORS PROTECTION ----------
    const operators = ["+", "-", "x", "÷", "%"];
    let lastChar = input.value.slice(-1);
    if (operators.includes(value) && operators.includes(lastChar)) return;

    // ---------- DECIMAL PROTECTION ----------
    if (value === ".") {
      let lastNum = input.value.split(/[\+\-\x\÷]/).pop();
      if (lastNum.includes(".")) return;
    }

    // ---------- INPUT LENGTH LIMIT ----------
    if (input.value.length >= 10) return;

    // ---------- DEFAULT INPUT ----------
    if (input.value === "0") {
      input.value = value;
    } else {
      input.value += value;
    }
  });
});

// ================== SCIENTIFIC PANEL ==================
let backbtn = document.querySelector(".main .back-btn");
let scientificBtnBox = document.querySelector(".scientific-btns");

backbtn.addEventListener("click", () => {
  scientificBtnBox.classList.toggle("active");
});

// ================== THEME TOGGLE ==================
const lightmodebtn = document.getElementById("light-mode-btn");
const darkmodebtn = document.getElementById("dark-mode-btn");
const mainbox = document.querySelector(".main");

// default dark
darkmodebtn.style.display = "block";
lightmodebtn.style.display = "none";

darkmodebtn.addEventListener("click", () => {
  mainbox.classList.add("light-mode");
  darkmodebtn.style.display = "none";
  lightmodebtn.style.display = "block";
});

lightmodebtn.addEventListener("click", () => {
  mainbox.classList.remove("light-mode");
  lightmodebtn.style.display = "none";
  darkmodebtn.style.display = "block";
});

// ================== KEYBOARD SUPPORT ==================
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) simulate(key);
  if (key === "+") simulate("+");
  if (key === "-") simulate("-");
  if (key === "*") simulate("x");
  if (key === "/") simulate("÷");
  if (key === ".") simulate(".");
  if (key === "Enter") simulate("=");
  if (key === "Backspace") simulate("C");
  if (key === "Escape") simulate("AC");
});

function simulate(val) {
  buttons.forEach(btn => {
    if (btn.innerText === val) btn.click();
  });
}
