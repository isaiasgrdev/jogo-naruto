const mario = document.getElementById('mario');
const obstacle = document.getElementById('obstacle');
const pointsDisplay = document.getElementById('score');

let points = 0;
let speed = 2;

// Define a duração inicial da animação do obstáculo
obstacle.style.animationDuration = `${speed}s`;

// Mario pula ao pressionar uma tecla
document.addEventListener('keydown', () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); // Tempo do pulo em milissegundos
    }
});

// Loop do jogo
const gameLoop = setInterval(() => {
    const marioRect = mario.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Detectar colisão
    if (
        marioRect.left < obstacleRect.right &&
        marioRect.right > obstacleRect.left &&
        marioRect.bottom > obstacleRect.top &&
        marioRect.top < obstacleRect.bottom
    ) {
        alert('Game Over! Pontuação: ' + points);
        clearInterval(gameLoop);
        location.reload(); // Reinicia o jogo
    }

    // Incrementar pontuação e aumentar dificuldade
    if (obstacleRect.right < 0) { 
        points += 10;
        pointsDisplay.textContent = `Pontuação: ${points}`;

        if (points % 50 === 0) {
            speed -= 0.2; // Aumenta a dificuldade
            obstacle.style.animationDuration = `${speed}s`;
        }

        // Resetando a posição do obstáculo
        obstacle.style.right = '100%'; // Coloca o obstáculo fora da tela à direita
        obstacle.style.animationDuration = `${speed}s`; // Reinicia a animação
    }
}, 50);