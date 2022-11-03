export const FlappyBird = () => {
  const { sprites,  context } = globalThis
  const hasColision = (flappyBirdParams, floor) => {
    const flappyBirdY = flappyBirdParams.y + flappyBirdParams.height;
    const chaoY = floor.y;

    if (flappyBirdY >= chaoY) {
      return true;
    }

    return false;
  };

  return {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    jumpHeight: 4.6,
    gravity: 0.25,
    speed: 0,
    currentFrame: 0,

    jump() {
      this.speed = -this.jumpHeight;
    },

    update(floor, changeScreen) {
      if (hasColision(this, floor)) {
        hit_sound.play();
        changeScreen();
        return;
      }

      this.speed = this.speed + this.gravity;
      this.y = this.y + this.speed;
    },

    wingMoviment: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
      { spriteX: 0, spriteY: 26 },
    ],

    updateCurrentFrame() {
      const frameInterval = 10;
      const isIntervalDone = frames % frameInterval === 0;

      if (isIntervalDone) {
        const incrementBase = 1;
        const increment = incrementBase + this.currentFrame;
        const rate = this.wingMoviment.length;
        this.currentFrame = increment % rate;
      }
    },
    draw() {
      this.updateCurrentFrame();
      const { spriteX, spriteY } = this.wingMoviment[this.currentFrame];

      context.drawImage(
        sprites,
        spriteX,
        spriteY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    },
  };
};
