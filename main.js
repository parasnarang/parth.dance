const centerEl = document.querySelector('.center');
const spriteEl = document.querySelector('.sprite');
const valueEl = document.querySelector('.value');
const sliderEl = document.querySelector('.mood__slider');
let width, height, frame = 0;

resize();
window.addEventListener('resize', resize);

function resize(){
  height = centerEl.clientWidth/2;
  // width = centerEl.clientWidth;
  width = height * 540/960 ;
  // height = width * 601/338;
  spriteEl.style.height = `${height}px`;
  spriteEl.style.width = `${width}px`;
  // spriteEl.style.backgroundPositionY = `-${height*frame}px`;
  spriteEl.style.backgroundPositionX = `-${width*frame}px`;
}

const playSound = throttle(() => {
  const sound = new Audio('assets/click.mp3');
  sound.play();
}, 20, true);

const onSliderInput = e => {
  frame = sliderEl.value;
  // spriteEl.style.backgroundPositionY = `-${height*frame}px`;
  spriteEl.style.backgroundPositionX = `-${width*frame}px`;
  valueEl.textContent = (map(frame, 0, 30, 0, 1) * 10 / 10).toFixed(2);
  playSound();
}

sliderEl.addEventListener('input', onSliderInput);


// ===== Helpers

function map (value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

function throttle(fn, interval, callFirst) {
  let wait = false;
  let callNow = false;
  return () => {
    callNow = callFirst && !wait;
    let context = this;
    let args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(() => {
        wait = false;
        if (!callFirst) {
          return fn.apply(context, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, arguments);
    }
  };
}
