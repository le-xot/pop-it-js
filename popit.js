const pop1 = document.querySelector('.sound1')
const pop2 = document.querySelector('.sound2')
let number = randomInteger(1, 2)

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function reverseColumns() {
  const columns = document.querySelectorAll(".column")
  const popit = document.querySelector(".popit")

  for (let i = 1; i < columns.length; i++) {
    popit.insertBefore(columns[i], columns[i - 1])
  }
}

const buttons = document.querySelectorAll('.button')

function snd(number) {
  pop1.pause();
  pop1.currentTime = 0;
  pop2.pause();
  pop2.currentTime = 0;
  if (number === 1) { pop1.play() }
  if (number === 2) { pop2.play() }
  navigator.vibrate(100)
}

buttons.forEach(button => button.addEventListener('click', () => { snd(randomInteger(1, 2)) }))
document.querySelector('.flip').onclick = () => {

  const columns = document.querySelectorAll('.column')
  reverseColumns()
  buttons.forEach(button => button.classList.toggle('pressed'))
}


class Popit {
  constructor() {

  }


}

