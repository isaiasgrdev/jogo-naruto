const naruto = document.getElementById('naruto');
const obstacle = document.getElementById('obstacle');
const pointsDisplay = document.getElementById('points');
const iniciarMsg = document.querySelector('.iniciar'); // Referência para a mensagem de iniciar
const container_jogo = document.querySelector('.container');

let points = 0;
let speed = 2;
let gameStarted = false; // Variável para controlar se o jogo foi iniciado

// Define a duração inicial da animação do obstáculo
obstacle.style.animationDuration = `${speed}s`;

// Função para iniciar o jogo
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        iniciarMsg.style.display = 'none'; // Esconde a mensagem de iniciar
        container_jogo.style.display = 'flex'; // Exibe o jogo
        gameLoop(); // Inicia o loop do jogo
    }
}

// Inicia o jogo ao pressionar qualquer tecla
document.addEventListener('keydown', startGame);

// Loop do jogo
function gameLoop() {
    const loopInterval = setInterval(() => {
        if (!gameStarted) return; // Se o jogo não foi iniciado, não faz nada

        const narutoRect = naruto.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Detectar colisão
        if (
            narutoRect.left < obstacleRect.right &&
            narutoRect.right > obstacleRect.left &&
            narutoRect.bottom > obstacleRect.top &&
            narutoRect.top < obstacleRect.bottom
        ) {
            fim_jogo();
            // clearInterval(loopInterval); // Para o loop
            // location.reload(); // Reinicia o jogo
        }

        // Incrementar pontuação e aumentar dificuldade
        if (obstacleRect.right < 0) {
            points += 10;
            pointsDisplay.textContent = `${points}`; // Atualiza a pontuação corretamente

            if (points % 50 === 0) {
                speed -= 0.2; // Aumenta a dificuldade
                obstacle.style.animationDuration = `${speed}s`; // Atualiza a duração da animação
            }

            // Resetando a posição do obstáculo
            obstacle.style.right = '0'; // Coloca o obstáculo fora da tela à direita
            obstacle.style.animationDuration = `${speed}s`; // Reinicia a animação
        }
    }, 50);
}

// naruto pula ao pressionar uma tecla
document.addEventListener('keydown', () => {
    if (!naruto.classList.contains('jump')) {
        naruto.classList.add('jump');
        setTimeout(() => {
            naruto.classList.remove('jump');
        }, 500); // Tempo do pulo em milissegundos
    }
});

function fim_jogo() {
    const game_over = document.querySelector('.game_over');
    const msg_GameOver = document.querySelector('.msg_GameOver');

    game_over.style.display = 'flex';
    msg_GameOver.innerText = `Sua pontuação é: ${points}`;

    iniciarMsg.style.display = 'none'; // Esconde a mensagem de iniciar
    container_jogo.style.display = 'none'; // Exibe o jogo
}
