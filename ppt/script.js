let userScore = 0;
let cpuScore = 0;
let userStreak = 0;
let cpuStreak = 0;

const userWinSound = new Audio('/ppt/src/win.mp3');
const cpuWinSound = new Audio('/ppt/src/lose.mp3');
const gameSound = new Audio('/ppt/src/soundG.mp3');

const cursorLight = document.getElementById('cursor-light');

document.addEventListener("DOMContentLoaded", function() {
    resetChoices();
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorLight.style.left = `${x}px`;
        cursorLight.style.top = `${y}px`;
    });
    
    gameSound.play();

});

function resetChoices() {
    document.getElementById('user-choice-img').src = '/ppt/src/loadOption.gif';
    document.getElementById('user-choice-img').alt = 'Waiting for choice';
    document.getElementById('cpu-choice-img').src = '/ppt/src/loadOption.gif';
    document.getElementById('cpu-choice-img').alt = 'Waiting for choice';

    gameSound.play();    
}

function userChoice(choice) {
    const cpuChoices = ['rock', 'paper', 'scissors'];
    const cpuChoice = cpuChoices[Math.floor(Math.random() * cpuChoices.length)];

    resAnim('user-choice-img');
    resAnim('cpu-choice-img')

    document.getElementById('user-choice-img').src = `/ppt/src/${choice}.png`;
    document.getElementById('user-choice-img').alt = choice;
    document.getElementById('cpu-choice-img').src = `/ppt/src/${cpuChoice}.png`;
    document.getElementById('cpu-choice-img').alt = cpuChoice;

    addAnim('user-choice-img');
    addAnim('cpu-choice-img');

    dtrmnWinner(choice, cpuChoice);
}

function resAnim(id) {
    const element = document.getElementById(id);

    element.classList.remove('animated');
    void element.offsetWidth;
}

function addAnim(id) {
    const element = document.getElementById(id);

    element.classList.add('animated');
}

function dtrmnWinner(user, cpu) {
    if (user === cpu) {
        userStreak = 0;
        cpuStreak = 0;
        return;
    }

    if (
        (user === 'rock' && cpu === 'scissors') ||
        (user === 'paper' && cpu === 'rock') ||
        (user === 'scissors' && cpu === 'paper')
    ) {
        userScore++;
        userStreak++;
        cpuStreak = 0;
        document.getElementById('uScore').textContent = userScore;
    } else {
        cpuScore++;
        cpuStreak++;
        userStreak = 0;
        document.getElementById('cpu-score').textContent = cpuScore;
    }

    checkStreak();
}

function checkStreak() {
    if (userScore === 3) {
        showModal('You won!');
    } else if (cpuScore === 3) {
        showModal('You lose!');
    }
}

function showModal(message) {
    if (userScore === 3) {
        userWinSound.currentTime = 0.5;
        gameSound.pause();
        userWinSound.play()
    } else {
        userWinSound.currentTime = 0;
        gameSound.pause();
        cpuWinSound.play()
    }
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    resetChoices();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

function reloadGame() {
    userScore = 0;
    cpuScore = 0;
    userStreak = 0;
    cpuStreak = 0;
    document.getElementById('uScore').textContent = userScore;
    document.getElementById('cpu-score').textContent = cpuScore;
    resetChoices();
}

document.getElementById('reload').addEventListener('click', function() {
    document.body.classList.add('shake-anim');

    setTimeout(() => {
        document.body.classList.remove('shake-anim');
    }, 500);

    reloadGame();
});
