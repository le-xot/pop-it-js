class Swipe {
  constructor(element) {
      this.xDown = null;
      this.yDown = null;
      this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

      this.element.addEventListener('touchstart', function(evt) {
          this.xDown = evt.touches[0].clientX;
          this.yDown = evt.touches[0].clientY;
      }.bind(this), false);

  }

  onLeft(callback) {
      this.onLeft = callback;

      return this;
  }

  onRight(callback) {
      this.onRight = callback;

      return this;
  }

  onUp(callback) {
      this.onUp = callback;

      return this;
  }

  onDown(callback) {
      this.onDown = callback;

      return this;
  }

  handleTouchMove(evt) {
      if ( ! this.xDown || ! this.yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      this.xDiff = this.xDown - xUp;
      this.yDiff = this.yDown - yUp;

      if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { 
          if ( this.xDiff > 0 ) {
              this.onLeft();
          } else {
              this.onRight();
          }
      } else {
          if ( this.yDiff > 0 ) {
              this.onUp();
          } else {
              this.onDown();
          }
      }

      // Reset values.
      this.xDown = null;
      this.yDown = null;
  }

  run() {
      this.element.addEventListener('touchmove', (evt) => {
          this.handleTouchMove(evt)
      }, false);
  }
}

const swiper = new Swipe('.container')
const pop1 = document.querySelector('.sound1')
const pop2 = document.querySelector('.sound2')
let number = randomInteger(1, 2)

function randomInteger(min, max) {
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
  navigator.vibrate(135)
}

buttons.forEach(button => button.addEventListener('click', () => { snd(randomInteger(1, 2)) }))
document.querySelector('.flip').onclick = () => {
  const columns = document.querySelectorAll('.column')
  reverseColumns()
  buttons.forEach(button => button.classList.toggle('pressed'))
}

function flipPopit() {
  const columns = document.querySelectorAll('.column')
  reverseColumns()
  buttons.forEach(button => button.classList.toggle('pressed'))
}

swiper.onLeft(() => flipPopit())
swiper.onRight(() => flipPopit())
swiper.run()