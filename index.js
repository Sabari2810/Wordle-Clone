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
updateGrid();

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of history) {
    drawAttempt(row, attempt, false);
    row = row.nextSibling;
  }
  drawAttempt(row, currentAttempt, true);
}

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  const key = e.key.toLowerCase();
  if (key === "enter") {
    if (currentAttempt.length != 5) {
      alert("not enough letters");
      return;
    }
    history.push(currentAttempt);
    currentAttempt = "";
    updateGrid();
    return;
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
    cell = row.childNodes[i];
    if (attempt[i] !== undefined) {
      cell.firstChild.innerText = attempt[i];
      cell.style.backgroundColor = isCurrent
        ? "#111"
        : getBgColor(attempt[i], i);
    } else {
      cell.firstChild.innerText = "";
      cell.style.backgroundColor = "#111";
    }
  }
}

function getBgColor(attempt, i) {
  if (guess.indexOf(attempt) === -1) return "#111";
  if (guess.indexOf(attempt) !== i) return "#b59f3b";
  return "#538d4e";
}
