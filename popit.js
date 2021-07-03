const pop1 = document.querySelector('.sound1')
const pop2 = document.querySelector('.sound2')
let number = randomInteger(1, 2)
let pop = 'pop'

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


const buttons = document.querySelectorAll('.button')

function snd(number) {
  if (pop !== 'pop') {
    pop = 'pop'
  }
  pop1.pause();
  pop1.currentTime = 0;
  pop2.pause();
  pop2.currentTime = 0;
  pop += number
  if (number === 1) { pop1.play() }
  if (number === 2) { pop2.play() }
  navigator.vibrate(50)
}

buttons.forEach(button => button.addEventListener('click', () => { snd(randomInteger(1, 2)) }))