let grid = document.getElementById("grid");

let guess = "horse";
let currentAttempt = "";
let history = [];

function buildGrid() {
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      let letter = document.createElement("p");
      cell.appendChild(letter);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

buildGrid();
buildKeyboard();
updateGrid();

function buildKeyboard() {
  buildKeyboardRow("qwertyuiop", false);
  buildKeyboardRow("asdfghjkl", false);
  buildKeyboardRow("zxcvbnm", true);
}

function buildKeyboardRow(letters, isEnter) {
  var row = document.createElement("div");
  row.className = "krow";
  if (isEnter) {
    createBtn(row, "enter", false);
  }
  for (let letter of letters) {
    createBtn(row, letter, false);
  }
  if (isEnter) {
    createBtn(
      row,
      "backspace",
      true,
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" style="width:70%;color:white !important;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>'
    );
  }
  document.getElementById("keyboard").appendChild(row);
}

function createBtn(row, letter, isBackspace, svg) {
  let btn = document.createElement("button");
  if (isBackspace) {
    btn.innerHTML = svg;
  } else {
    btn.innerText = letter;
  }
  if (letter == "enter" || letter == "backspace") {
    btn.style.width = "70px";
  }
  btn.onclick = () => {
    handleKeyboardClick(letter);
  };
  row.appendChild(btn);
}

function handleKeyboardClick(letter) {
  handleKeyDown(undefined, letter);
}

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of history) {
    drawAttempt(row, attempt, false);
    row = row.nextSibling;
  }
  drawAttempt(row, currentAttempt, true);
}

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e, k) {
  let key;
  if (e !== undefined) {
    key = e.key.toLowerCase();
  } else {
    key = k;
  }
  if (key === "enter") {
    if (currentAttempt.length != 5) {
      alert("not enough letters");
      return;
    }
    if (guess == currentAttempt) {
    }
    history.push(currentAttempt);
    currentAttempt = "";
  } else if (key === "backspace") {
    currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
    updateGrid();
    return;
  } else if (/[a-z]/.test(key) && key.length == 1) {
    if (currentAttempt.length < 5) {
      currentAttempt += key;
    }
  }
  updateGrid();
}

function drawAttempt(row, attempt, isCurrent) {
  for (let i = 0; i < 5; i++) {
    let cell = row.childNodes[i];
    if (attempt[i] !== undefined) {
      cell.firstChild.innerText = attempt[i];
      if (isCurrent) {
        cell.classList.add("contains");
      }
      cell.style.backgroundColor = isCurrent
        ? "#111"
        : getBgColor(attempt[i], i);
    } else {
      cell.firstChild.innerText = "";
      cell.classList.remove("contains");
      cell.style.backgroundColor = "#111";
    }
  }
}

function getBgColor(attempt, i) {
  if (guess.indexOf(attempt) === -1) return "#111";
  if (guess.indexOf(attempt) !== i) return "#b59f3b";
  return "#538d4e";
}
