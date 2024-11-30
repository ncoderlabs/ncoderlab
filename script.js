const sampleText = document.getElementById("sample-text").textContent;
const typingArea = document.getElementById("typing-area");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");

let timerInterval;
let timeLeft = 8 * 60; // 8 minutes in seconds

// Start the competition
startButton.addEventListener("click", () => {
  typingArea.disabled = false;
  typingArea.focus();
  startButton.disabled = true;
  startTimer();
});

// Disable backspace key
typingArea.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    e.preventDefault();
  }
});

// Prevent pasting
typingArea.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Pasting is not allowed!");
});

// Highlight only incorrect words
typingArea.addEventListener("input", () => {
  const typedText = typingArea.value.trim(); // Get the typed input
  const sampleWords = sampleText.split(" "); // Split the sample text into words
  const typedWords = typedText.split(" "); // Split the typed text into words

  let highlightedHTML = "";

  for (let i = 0; i < typedWords.length; i++) {
    const typedWord = typedWords[i];
    const correctWord = sampleWords[i];

    // Highlight unmatched words only
    if (typedWord !== correctWord && typedWord !== undefined) {
      highlightedHTML += `<span style="color: red;">${typedWord}</span> `;
    } else {
      highlightedHTML += `<span style="color: black;">${typedWord || ""}</span> `;
    }
  }

  document.getElementById("highlight-preview").innerHTML = highlightedHTML.trim();

  // Enable submit button only if all words are correct
  if (typedWords.length === sampleWords.length && typedWords.every((word, index) => word === sampleWords[index])) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

// Timer countdown
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      typingArea.disabled = true;
      submitButton.disabled = true;
      resultElement.textContent = "Time's up!";
      resultElement.style.color = "red";
    }
    timeLeft--;
  }, 1000);
}

// Submit the typed text
submitButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  const typedText = typingArea.value;
  if (typedText.trim() === sampleText) {
    resultElement.textContent = "Success! You typed the text correctly.";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Incorrect typing. Please try again!";
    resultElement.style.color = "red";
  }
  typingArea.disabled = true;
});
