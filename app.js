const words = ["cocodrilo", "gato", "raton", "elefante", "jirafa", "tigre", "leon"];
const maxWords = 3; // Límite de palabras
let score = 0;
let currentWord = '';
let scrambledWord = '';
let wordsPlayed = 0;
let incorrectWords = 0; // Contador de palabras incorrectas
let incorrectWordsList = []; // Lista de palabras incorrectas

const scoreDisplay = document.getElementById('score');
const scrambledWordDisplay = document.getElementById('scrambled-word');
const wordInput = document.getElementById('word-input');
const checkButton = document.getElementById('check-button');
const messageDisplay = document.getElementById('message');
const nextButton = document.getElementById('next-button');
const resetButton = document.getElementById('reset-button'); // Añadir el botón de reinicio

// Función para mezclar las letras de la palabra
function scrambleWord(word) {
  const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
  return shuffled;
}

// Función para empezar el juego con una nueva palabra
function startGame() {
  if (wordsPlayed >= maxWords || words.length === 0) {
    showFinalResult();
    return;
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambledWord = scrambleWord(currentWord);

  words.splice(randomIndex, 1); // Eliminar la palabra usada
  wordsPlayed++;

  scrambledWordDisplay.textContent = scrambledWord;
  wordInput.value = '';
  messageDisplay.textContent = '';
  checkButton.disabled = false;
  wordInput.disabled = false;
  nextButton.style.display = 'none';
  wordInput.focus();
}

// Función para mostrar el resultado final
function showFinalResult() {
  const incorrectWordsText = incorrectWordsList.join(', ');
  messageDisplay.innerHTML = `¡Juego terminado! Has completado ${wordsPlayed} palabras con una puntuación de ${score}.<br>Palabras incorrectas: ${incorrectWords} (${incorrectWordsText}).`;
  checkButton.disabled = true;
  nextButton.disabled = true;
  resetButton.style.display = 'inline'; // Mostrar el botón de reinicio
}

// Función para reiniciar el juego
function resetGame() {
  score = 0;
  wordsPlayed = 0;
  incorrectWords = 0; // Reiniciar el contador de palabras incorrectas
  incorrectWordsList = []; // Reiniciar la lista de palabras incorrectas
  currentWord = '';
  scrambledWord = '';
  words.push("cocodrilo", "gato", "raton", "elefante", "jirafa", "tigre", "leon"); // Restaurar las palabras originales

  scoreDisplay.textContent = score;
  scrambledWordDisplay.textContent = '';
  wordInput.value = '';
  messageDisplay.textContent = '';
  checkButton.disabled = false;
  wordInput.disabled = false;
  nextButton.style.display = 'none';
  resetButton.style.display = 'none'; // Ocultar el botón de reinicio
  startGame();
}

// Comprobar la respuesta del jugador
checkButton.addEventListener('click', () => {
  const userAnswer = wordInput.value.trim().toLowerCase();

  if (userAnswer === '') {
    messageDisplay.textContent = "Por favor, ingresa una palabra.";
    messageDisplay.style.color = "orange";
    return;
  }

  if (userAnswer === currentWord) {
    messageDisplay.textContent = "¡Correcto!";
    messageDisplay.style.color = "green";
    score += 100; // Sumar 100 puntos por respuesta correcta
    scoreDisplay.textContent = score;
    wordInput.disabled = true;
    checkButton.disabled = true;
    nextButton.style.display = 'inline';
    nextButton.disabled = false;
  } else {
    messageDisplay.textContent = "Incorrecto. Intenta de nuevo.";
    messageDisplay.style.color = "red";
    incorrectWords++; // Incrementar el contador de palabras incorrectas
    incorrectWordsList.push(currentWord); // Añadir la palabra incorrecta a la lista
    score -= 50; // Restar 50 puntos por respuesta incorrecta
    scoreDisplay.textContent = score;
    wordInput.value = ''; // Limpiar el campo de entrada para permitir otro intento
    wordInput.focus();
  }
});

// Siguiente palabra
nextButton.addEventListener('click', startGame);

// Reiniciar el juego
resetButton.addEventListener('click', resetGame);

// Iniciar el juego
startGame();
