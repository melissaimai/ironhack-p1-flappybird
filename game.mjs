import { Background } from './Background.js';
import { Floor } from './Floor.js';
import { FlappyBird } from './FlappyBird.js';
import { Pipes } from './Pipes.js';
import { StartMessage } from './StartMessage.js';
import { GameOverMessage } from './GameOverMessage.js';

let frames = 0;
const hit_sound = new Audio();
hit_sound.src = './effects/hit.wav';
globalThis.hit_sound = hit_sound

const sprites = new Image();
sprites.src = './sprites.png';
globalThis.sprites = sprites

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
globalThis.canvas = canvas
globalThis.context = context

const global = {};
let activeScreen = {};

function changeScreen(newScreen) {
  activeScreen = newScreen;
  if (activeScreen.init) {
    activeScreen.init();
  }
}

const Screens = {
  BEGIN: {
    init() {
      global.flappyBird = FlappyBird();
      global.floor = Floor();
      global.pipes = Pipes();
    },
    draw() {
      Background().draw();
      global.flappyBird.draw();
      global.floor.draw();
      StartMessage().draw();
    },
    click() {
      changeScreen(Screens.IN_GAME);
    },
    keydown() {
      changeScreen(Screens.IN_GAME);
    },
    update() {
      global.floor.update();
    },
  },
  IN_GAME: {
    init() {
    },
    draw() {
      Background().draw();
      global.pipes.draw(global);
      global.floor.draw();
      global.flappyBird.draw();
    },
    click() {
      global.flappyBird.jump();
    },
    keydown() {
      global.flappyBird.jump()
    },
    update() {
      global.pipes.update(frames, global, () =>
        changeScreen(Screens.GAME_OVER)
      );
      global.floor.update();
      global.flappyBird.update(global.floor, () =>
        changeScreen(Screens.BEGIN)
      );
    },
  },
  GAME_OVER: {
    draw() {
      GameOverMessage().draw();
    },
    update() {
    },
    click() {
      changeScreen(Screens.BEGIN);
    },
    keydown() {
      changeScreen(Screens.BEGIN);
    },


  },
};

function loop() {
  activeScreen.draw();
  activeScreen.update();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

canvas.addEventListener('click', function () {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

window.addEventListener('keydown', function (e) {
  console.log(e)
  if (e.key === " ") {
    if (activeScreen.keydown) {
      activeScreen.keydown();
    }
  }

});

changeScreen(Screens.BEGIN);
loop();
