export const Pipes = () => {
  const { hit_sound, sprites, canvas, context } = globalThis
  return {
    pairs: [],
    width: 52,
    height: 400,
    floor: {
      spriteX: 0,
      spriteY: 169,
    },
    sky: {
      spriteX: 52,
      spriteY: 169,
    },

    draw(global) {
      this.pairs.forEach(function (pair) {
        const yRandom = pair.y;
        const spaceBetweenPipes = 90;

        const skyPipeX = pair.x;
        const skyPipeY = yRandom;

        context.drawImage(
          sprites,
          global.pipes.sky.spriteX,
          global.pipes.sky.spriteY,
          global.pipes.width,
          global.pipes.height,
          skyPipeX,
          skyPipeY,
          global.pipes.width,
          global.pipes.height
        );

        const floorPipeX = pair.x;
        const floorPipeY =
          global.pipes.height + spaceBetweenPipes + yRandom;

        context.drawImage(
          sprites,
          global.pipes.floor.spriteX,
          global.pipes.floor.spriteY,
          global.pipes.width,
          global.pipes.height,
          floorPipeX,
          floorPipeY,
          global.pipes.width,
          global.pipes.height
        );

        pair.skyPipe = {
          x: skyPipeX,
          y: global.pipes.height + skyPipeY,
        };
        pair.floorPipe = {
          x: floorPipeX,
          y: floorPipeY,
        };
      });
    },

    hasBirdColision(pair, global) {
      const birdHead = global.flappyBird.y;
      const birdFeet = global.flappyBird.y + global.flappyBird.height;
      if (global.flappyBird.x + global.flappyBird.width >= pair.x) {
        if (birdHead <= pair.skyPipe.y) {
          return true;
        }

        if (birdFeet >= pair.floorPipe.y) {
          return true;
        }
      }
      return false;
    },

    update(frames, global, changeScreen) {
      const is100FramesDone = frames % 100 === 0;

      if (is100FramesDone) {
        global.pipes.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      global.pipes.pairs.forEach(function (pair) {
        pair.x = pair.x - 2;

        if (global.pipes.hasBirdColision(pair, global)) {
          hit_sound.play();
          changeScreen();
        }

        if (pair.x + global.pipes.width <= 0) {
          global.pipes.pairs.shift();
        }
      });
    },
  };
};
