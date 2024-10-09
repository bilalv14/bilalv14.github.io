document.querySelectorAll('.choice').forEach(item => {
    item.addEventListener('click', (event) => {
        if (!playerHasChosen) {
            playerChoose(event.target.id);
        }
    });
});

let wins = 0;
let losses = 0;
let ties = 0;
let playerHasChosen = false;

function playerChoose(playerChoice) {
    playerHasChosen = true;
    highlightChoice(playerChoice);
    computerThrow(playerChoice);
}

function highlightChoice(choice) {
    document.querySelectorAll('.choice').forEach(el => {
        el.classList.remove('highlight');
    });
    document.getElementById(choice).classList.add('highlight');
}

function computerThrow(playerChoice) {
    let choices = ['rock', 'paper', 'scissors'];
    let intervalId = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * choices.length);
        let computerChoice = choices[randomIndex];
        let computerImage = document.getElementById('computer-choice');
        computerImage.src = 'images/' + computerChoice + '.PNG';
    }, 500);

    setTimeout(() => {
        clearInterval(intervalId);
        let finalChoice = choices[Math.floor(Math.random() * choices.length)];
        let computerImage = document.getElementById('computer-choice');
        computerImage.src = 'images/' + finalChoice + '.PNG';
        determineWinner(playerChoice, finalChoice);
        playerHasChosen = false;
    }, 3000);
}

function determineWinner(player, computer) {
    const outcomes = {
        rock: {rock: 'tie', paper: 'lose', scissors: 'win'},
        paper: {rock: 'win', paper: 'tie', scissors: 'lose'},
        scissors: {rock: 'lose', paper: 'win', scissors: 'tie'}
    };
    let result = outcomes[player][computer];
    document.getElementById('outcome').innerText = `You ${result}! Computer chose ${computer}.`;
    updateScore(result);
}

function updateScore(result) {
    if (result === 'win') {
        wins++;
        document.getElementById('wins').innerText = wins;
    } else if (result === 'lose') {
        losses++;
        document.getElementById('losses').innerText = losses;
    } else {
        ties++;
        document.getElementById('ties').innerText = ties;
    }
}

function resetGame() {
    document.querySelectorAll('.choice').forEach(el => {
        el.classList.remove('highlight');
    });
    document.getElementById('computer-choice').src = 'images/question-mark.PNG';
    document.getElementById('outcome').innerText = 'Choose your weapon!';
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById('wins').innerText = '0';
    document.getElementById('losses').innerText = '0';
    document.getElementById('ties').innerText = '0';
    playerHasChosen = false;
}


