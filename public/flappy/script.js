/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable prefer-template */
document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

        let birdLeft = 220;
        let birdBottom = 100;
        let gravity = 2;
        let isGameOver = false;
        let gap = 430;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    let gameTimerId = setInterval(startGame, 20);

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + ' px';
        console.log(birdBottom);
    }

    function control(e) {
       if (e.keyCode === 32) {
          jump();
        }
    }

    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            topObstacle.classList.add('topObstacle');
            obstacle.classList.add('obstacle')
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';

      function moveObstacle() {
        obstacleLeft -= 2;
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.left = obstacleLeft + 'px';
        if (obstacleLeft === -60) {
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
            gameDisplay.removeChild(topObstacle);
        }

        if (
            obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220
            && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 190)
            || birdBottom === 0
            ) {
            gameOver();
            clearInterval(timerId);
        }
      }
      let timerId = setInterval(moveObstacle, 20);
      if (!isGameOver) setTimeout(generateObstacle, 3000);

    }
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        console.log('game over');
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }
});