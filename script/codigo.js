   // Array con las cartas del juego
   const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        
   // Referencias a los elementos del DOM
   let gameBoard = document.getElementById('game-board');
   let message = document.getElementById('message');
   let timerDisplay = document.getElementById('timer');
   
   // Variables para el juego
   let firstCard, secondCard;
   let lockBoard = false;
   let matchedPairs = 0;
   let timer;
   let timeLeft = 60;

   // Función para mezclar el array de cartas
   function shuffle(array) {
       array.sort(() => Math.random() - 0.5);
   }

   // Función para crear el tablero de juego
   function createBoard() {
       shuffle(cardsArray); // Mezcla las cartas
       gameBoard.innerHTML = ''; // Limpia el tablero
       cardsArray.forEach((card) => { // Para cada carta en el array
           let cardElement = document.createElement('div'); // Crea un div para la carta
           cardElement.classList.add('card'); // Añade la clase 'card'
           cardElement.dataset.value = card; // Establece el valor de la carta
           cardElement.addEventListener('click', flipCard); // Añade el evento click
           gameBoard.appendChild(cardElement); // Añade la carta al tablero
       });
   }

   // Función para voltear una carta
   function flipCard() {
       if (lockBoard) return; // Si el tablero está bloqueado, no hace nada
       if (this === firstCard) return; // Si se clickea la misma carta, no hace nada

       this.classList.add('flipped'); // Añade la clase 'flipped'
       this.textContent = this.dataset.value; // Muestra el valor de la carta

       if (!firstCard) { // Si no hay una primera carta seleccionada
           firstCard = this; // Esta carta es la primera
           return;
       }

       secondCard = this; // Esta carta es la segunda
       checkForMatch(); // Verifica si hay coincidencia
   }

   // Función para verificar si las cartas coinciden
   function checkForMatch() {
       let isMatch = firstCard.dataset.value === secondCard.dataset.value; // Verifica si los valores son iguales
       isMatch ? disableCards() : unflipCards(); // Si coinciden, deshabilita las cartas, si no, las voltea
   }

   // Función para deshabilitar cartas emparejadas
   function disableCards() {
       firstCard.removeEventListener('click', flipCard); // Remueve el evento click de la primera carta
       secondCard.removeEventListener('click', flipCard); // Remueve el evento click de la segunda carta
       resetBoard(); // Resetea las variables
       matchedPairs++; // Incrementa el número de pares encontrados
       if (matchedPairs === cardsArray.length / 2) { // Si se encontraron todos los pares
           clearInterval(timer); // Detiene el temporizador
           message.textContent = 'Congratulations, you won!'; // Muestra mensaje de felicitaciones
       }
   }

   // Función para voltear cartas que no coinciden
   function unflipCards() {
       lockBoard = true; // Bloquea el tablero
       setTimeout(() => { // Espera un segundo antes de voltear las cartas
           firstCard.classList.remove('flipped'); // Remueve la clase 'flipped' de la primera carta
           secondCard.classList.remove('flipped'); // Remueve la clase 'flipped' de la segunda carta
           firstCard.textContent = ''; // Limpia el contenido de la primera carta
           secondCard.textContent = ''; // Limpia el contenido de la segunda carta
           resetBoard(); // Resetea las variables
       }, 1000);
   }

   // Función para resetear las variables del tablero
   function resetBoard() {
       [firstCard, secondCard, lockBoard] = [null, null, false]; // Resetea las variables
   }

   // Función para iniciar el temporizador
   function startTimer() {
       timer = setInterval(() => { // Cada segundo
           timeLeft--; // Decrementa el tiempo restante
           timerDisplay.textContent = `Time: ${timeLeft}`; // Actualiza la visualización del temporizador
           if (timeLeft === 0) { // Si el tiempo llega a cero
               clearInterval(timer); // Detiene el temporizador
               message.textContent = ' Game over, press reset.'; // Muestra mensaje de fin del juego
               lockBoard = true; // Bloquea el tablero
           }
       }, 1000);
   }

   // Función para reiniciar el juego
   function resetGame() {
       clearInterval(timer); // Detiene el temporizador
       timeLeft = 60; // Resetea el tiempo
       timerDisplay.textContent = `Time: ${timeLeft}`; // Actualiza la visualización del temporizador
       message.textContent = ''; // Limpia el mensaje
       matchedPairs = 0; // Resetea el número de pares encontrados
       createBoard(); // Crea un nuevo tablero
       startTimer(); // Inicia el temporizador
   }

   // Inicializar el juego
   createBoard(); // Crea el tablero
   startTimer(); // Inicia el temporizador