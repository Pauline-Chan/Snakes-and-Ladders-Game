document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollBtn = document.getElementById('rollBtn');
    const players = [{ position: 0, color: 'red' }, { position: 0, color: 'blue' }]; // Add more players as needed
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
            board.appendChild(tile);
        }

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


    function movePlayer(playerIndex, steps) {
        let newPosition = players[playerIndex].position + steps;

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
        players[playerIndex].position = newPosition > 100 ? 100 : newPosition;

        const currentPlayerToken = document.getElementById(`player${playerIndex}`);
        currentPlayerToken.style.top = `${(9 - Math.floor((players[playerIndex].position - 1) / 10)) * 50}px`; // Starting from bottom
        currentPlayerToken.style.left = `${((9 - (players[playerIndex].position - 1) % 10)) * 50}px`; // Starting from right
    }

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function checkWin(playerIndex) {
        if (players[playerIndex].position >= 100) {
            gameOver = true;
            alert(`Player ${playerIndex + 1} wins!`);
            rollBtn.disabled = true;
        }
    }

    function playTurn() {
        if (!gameOver) {
            const steps = rollDice();
            alert(`Player ${currentPlayer + 1} rolled ${steps}`);
            movePlayer(currentPlayer, steps);
            checkWin(currentPlayer);
            currentPlayer = (currentPlayer + 1) % players.length;
        }
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
