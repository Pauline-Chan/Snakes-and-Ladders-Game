document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollBtn = document.getElementById('rollBtn');
    
    const players = [
        { position: 0, color: 'rgba(255, 0, 0, 0.5)' }, // Red color with 50% opacity
        { position: 0, color: 'rgba(0, 0, 255, 0.5)' } // Blue color with 50% opacity
];
    // Add more players as needed
    let currentPlayer = 0;
    let gameOver = false;

    // Define snake and ladder pairs
    const snakes = [
        { start: 99, end: 41 },
	    { start: 89, end: 53 },
        { start: 76, end: 58 },
        { start: 66, end: 45 },
        { start: 54, end: 31 },
        { start: 43, end: 18 },
        { start: 40, end: 3 },
        { start: 27, end: 5 }
    ];

    const ladders = [
        { start: 4, end: 25 },
        { start: 13, end: 46 },
        { start: 33, end: 49 },
        { start: 42, end: 63 },
        { start: 50, end: 69 },
        { start: 62, end: 81 },
        { start: 74, end: 92 }
    ];

function createBoard() {
    for (let i = 100; i >= 1; i--) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = i;
        
        // Check if the current tile number matches any special numbers
        if ([3, 40].includes(i)) {
            tile.classList.add('special-tile1a');
        }
 
           // Check if the current tile number matches any special numbers
        if ([5, 27].includes(i)) {
            tile.classList.add('special-tile1b');
        }      
            
    // Check if the current tile number matches any special numbers
        if ([43, 18].includes(i)) {
            tile.classList.add('special-tile1c');
        }                  

  // Check if the current tile number matches any special numbers
        if ([54, 31].includes(i)) {
            tile.classList.add('special-tile1d');
        }            

   // Check if the current tile number matches any special numbers
        if ([66, 45].includes(i)) {
            tile.classList.add('special-tile1e');
        }            
  
    // Check if the current tile number matches any special numbers
        if ([76, 58].includes(i)) {
            tile.classList.add('special-tile1f');
        }            
  
   // Check if the current tile number matches any special numbers
        if ([89, 53].includes(i)) {
            tile.classList.add('special-tile1g');
        }            
  
   // Check if the current tile number matches any special numbers
        if ([99, 41].includes(i)) {
            tile.classList.add('special-tile1h');
        }             
  
        
        // Check if the current tile number matches any other special numbers
        if ([4, 25].includes(i)) {
            tile.classList.add('special-tile2a');
        }
        
     
        // Check if the current tile number matches any other special numbers
        if ([13, 46].includes(i)) {
            tile.classList.add('special-tile2b');
        }
        
      // Check if the current tile number matches any other special numbers
        if ([33, 49].includes(i)) {
            tile.classList.add('special-tile2c');
        }
        
      // Check if the current tile number matches any other special numbers
        if ([42, 63].includes(i)) {
            tile.classList.add('special-tile2d');
        }
        
       // Check if the current tile number matches any other special numbers
        if ([50, 69].includes(i)) {
            tile.classList.add('special-tile2e');
        }
        
       // Check if the current tile number matches any other special numbers
        if ([62, 81].includes(i)) {
            tile.classList.add('special-tile2f');
        }
        
      // Check if the current tile number matches any other special numbers
        if ([74, 92].includes(i)) {
            tile.classList.add('special-tile2g');
        }             
                     
               board.appendChild(tile);
    }
    // Rest of the code...




        // Highlight snake tiles
        snakes.forEach(snake => {
            const snakeTile = document.querySelector(`.tile:nth-child(${snake.start})`);
            snakeTile.classList.add('snake');
        });

        // Highlight ladder tiles
        ladders.forEach(ladder => {
            const ladderTile = document.querySelector(`.tile:nth-child(${ladder.start})`);
            ladderTile.classList.add('ladder');
        });
    }
 
    const previousPositions = [[], []]; // Array to store previous positions of each player

    function movePlayer(playerIndex, steps) {
        let previousPosition = players[playerIndex].position;
        let newPosition = previousPosition + steps;
    
        // Check for snake and ladder positions
        snakes.forEach(snake => {
            if (newPosition === snake.start) {
                newPosition = snake.end;
                // Play sound effect for landing on snake's head
                const snakeSound = new Audio('snake_sound.mp3');
                snakeSound.play();
            }
        });
    
        ladders.forEach(ladder => {
            if (newPosition === ladder.start) {
                newPosition = ladder.end;
                // Play sound effect for landing on ladder's bottom
                const ladderSound = new Audio('ladder_sound.mp3');
                ladderSound.play();
            }
        });

  // Update player's position
  if (newPosition > 100) {
    // If newPosition exceeds 100, bounce back from 100
    newPosition = 100 - (newPosition - 100);
}

players[playerIndex].position = newPosition;

// Store previous position
previousPositions[playerIndex].unshift(previousPosition);
if (previousPositions[playerIndex].length > 2) {
    previousPositions[playerIndex].pop(); // Keep only the last two positions
}

const currentPlayerToken = document.getElementById(`player${playerIndex}`);
currentPlayerToken.style.top = `${(9 - Math.floor((players[playerIndex].position - 1) / 10)) * 50}px`; // Starting from bottom
currentPlayerToken.style.left = `${((9 - (players[playerIndex].position - 1) % 10)) * 50}px`; // Starting from right

// Display previous positions on the webpage
displayPreviousPositions();
}

function displayPreviousPositions() {
    const previousPositionsDiv = document.getElementById('previousPositions');
    previousPositionsDiv.innerHTML = ''; // Clear the previous positions display

    previousPositions.forEach((positions, index) => {
        const playerPrevPositionDiv = document.createElement('div');
        playerPrevPositionDiv.textContent = `Player ${index + 1} Previous Positions: ${positions.join(', ')}`;
        previousPositionsDiv.appendChild(playerPrevPositionDiv);
    });
}
  

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function checkWin(playerIndex) {
        if (players[playerIndex].position === 100) {
            gameOver = true;
            const winSound = new Audio('win_sound.mp3');
            winSound.play();
            const winnerDisplay = document.getElementById('winnerDisplay');
            const winnerText = document.getElementById('winnerText');
            winnerText.textContent = `Player ${playerIndex + 1} wins!`;
            winnerDisplay.style.display = 'block';
            rollBtn.style.display = 'none'; // Hide roll dice button
            restartBtn.style.display = 'inline-block'; // Display restart game button
        }
    }
    
    // Function to restart the game
    function restartGame() {
        // Reset player positions to zero
        players.forEach(player => {
            player.position = 0;
        });
    
        // Clear the current roll display
        clearCurrentRoll();
    
        // Clear the previous positions display
        clearPreviousPositions();
    
        // Update the player positions on the webpage
        updatePlayerPositions();
    
        // Reset game state and display settings
        gameOver = false;
        rollBtn.style.display = 'inline-block'; // Display roll dice button
        restartBtn.style.display = 'none'; // Hide restart game button
        const winnerDisplay = document.getElementById('winnerDisplay');
        winnerDisplay.style.display = 'none'; // Hide winner display
    }
    
    function clearCurrentRoll() {
        const currentRollDiv = document.getElementById('currentRoll');
        currentRollDiv.textContent = ''; // Clear the current roll display
    }
    
    function clearPreviousPositions() {
        const previousPositionsDiv = document.getElementById('previousPositions');
        previousPositionsDiv.innerHTML = ''; // Clear the previous positions display
    }
    
    
    
    // Add event listener for restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartGame);
    
    
    function updatePlayerPositions() {
        const playerPositionsDiv = document.getElementById('playerPositions');
        playerPositionsDiv.innerHTML = ''; // Clear the previous positions display
    
        players.forEach((player, index) => {
            const playerPositionDiv = document.createElement('div');
            playerPositionDiv.textContent = `Player ${index + 1} Current Position: ${player.position}`;
            playerPositionsDiv.appendChild(playerPositionDiv);
        });
    }
    
    function playTurn() {
        if (!gameOver) {
            const steps = rollDice();
            alert(`Player ${currentPlayer + 1} rolled ${steps}`);
            movePlayer(currentPlayer, steps);
            checkWin(currentPlayer);
    
            // Display current roll result and positions on the webpage
            displayCurrentRoll(steps);
            updatePlayerPositions();
    
            currentPlayer = (currentPlayer + 1) % players.length;
        }
    }
    
    function displayCurrentRoll(roll) {
        const currentRollDiv = document.getElementById('currentRoll');
        currentRollDiv.textContent = `Current Roll: ${roll}`;
    }
    

    rollBtn.addEventListener('click', playTurn);

    createBoard();

    // Create player tokens
    players.forEach((player, index) => {
        const playerToken = document.createElement('div');
        playerToken.classList.add('player');
        playerToken.id = `player${index}`;
        playerToken.style.backgroundColor = player.color;
        playerToken.style.top = '450px'; // Starting from bottom
        playerToken.style.left = '450px'; // Starting from right
        board.appendChild(playerToken);
    });
});
