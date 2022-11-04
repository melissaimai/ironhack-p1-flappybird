import { Background } from './Background.js';
import { Floor } from './Floor.js';
import { FlappyBird } from './FlappyBird.js';
import { Pipes } from './Pipes.js';
import { StartMessage } from './StartMessage.js';
import { GameOverMessage } from './GameOverMessage.js';
import { WinMessage } from './WinMessage.js'
import { Score } from './Score.js'


//Loading files
let frames = 0;
const hit_sound = new Audio();
hit_sound.src = './effects/hit.wav';
globalThis.hit_sound = hit_sound

const ponto = new Audio();
ponto.src = './effects/ponto.wav';
globalThis.ponto = ponto

const jump = new Audio();
jump.src = './effects/pulo.wav';
globalThis.jump = jump

const sprites = new Image();
sprites.src = './images/sprites.png';
globalThis.sprites = sprites

const gameOverImg = new Image();
gameOverImg.src = './images/gameover.png';
globalThis.gameOverImg = gameOverImg

const startImg = new Image();
startImg.src = './images/startbtn.png';
globalThis.startImg = startImg

const flappy = new Image();
flappy.src = './images/bird.png';
globalThis.flappy = flappy

const logo = new Image();
logo.src = './images/logo2.png';
globalThis.logo = logo

const win = new Image();
win.src = './images/youwin.png';
globalThis.win = win

//Canvas setup
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
      global.startMessage = StartMessage();

    },
    draw() {
      Background().draw();
      global.flappyBird.draw();
      global.floor.draw();
      global.startMessage.draw();
    },
    click() {
      changeScreen(Screens.IN_GAME);
    },
    keydown() {
      changeScreen(Screens.IN_GAME);
    },
    start() {
      changeScreen(Screens.IN_GAME);
    },
    update() {
      global.floor.update();
    },
  },
  IN_GAME: {
    init() {
      global.score = Score();
    },
    draw() {
      Background().draw();
      global.pipes.draw(global);
      global.floor.draw();
      global.flappyBird.draw();
      global.score.draw();
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
      global.flappyBird.update();
      global.score.update(frames, () =>
        changeScreen(Screens.WIN)
      );
    },
  },
  GAME_OVER: {
    draw() {
      GameOverMessage().draw();
      frames = 0;
    },
    update() {
    },
    start() {
      changeScreen(Screens.BEGIN);
    },
  },
  WIN: {
    draw() {
      WinMessage().draw();
    },
    update() {
    },
    start() {
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
  if (e.key === " ") {
    if (activeScreen.keydown) {
      activeScreen.keydown();
    }
  }
});

window.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    if (activeScreen.start) {
      activeScreen.start();
    }
  }
});



changeScreen(Screens.BEGIN);
loop();
