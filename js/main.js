'use strict'

const words = ['takami chika', 'sakurauti riko', 'watanabe you', 'matuura kanan', 'kurosawa daiya', 'kurosawa ruby', 'ohara mari', 'kunikida hanamaru', 'yohane', 'tushima yosiko', 'kousaka honoka', 'sonoda umi', 'minami kotori', 'ayase eli', 'toujyo nozomi', 'yazawa niko', 'hosizora rinn', 'nishikino maki', 'koizumi hanayo', 'shiitake', 'wataame', 'utitti-', 'arupaka', 'kousaka yukiho', 'ayase arisa', 'kazuno seira', 'kazuno ria'];

let word = words[Math.floor(Math.random() * words.length)];

let loc = 0;
let score = 0;
let miss = 0;
const timeLimit = 10 * 1000;
let startTime;

const target = document.getElementById('target');
const timerLabel = document.getElementById('timer');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
let timeoutId;
let started = false;
let answer = "";

function upadateTarget() {
  let placeholder = '';
  for (let i = 0; i < loc; i++) {
    placeholder += '_';
  }
  target.textContent = placeholder + word.substring(loc);
}

function updateTimer() {
  const timeLeft = startTime + timeLimit - Date.now();
  timerLabel.textContent = (timeLeft / 1000).toFixed(2);
  timeoutId = setTimeout(function () {
    updateTimer();
  }, 10);

  console.log(word);
  console.log(answer);
  if (timeLeft < 0) {
    clearTimeout(timeoutId);
    alert('GAME SET');
  } else if (word === answer) {
    clearTimeout(timeoutId);
    alert('Complete');
    answer = "";
  }
}

window.addEventListener('click', () => {
  upadateTarget();
  startTime = Date.now();
  if (started === false) {
    started = true;
    updateTimer();
  }
});

window.addEventListener('keyup', e => {
  console.log(e.key);
  if (e.key === word[loc]) {
    console.log('score');
    loc++;
    answer += e.key;
    started = false;
    if (loc === words.length) {
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    score++;
    scoreLabel.textContent = score;
    upadateTarget();
  } else {
    console.log('miss');
    miss++;
    missLabel.textContent = miss;
  }
});