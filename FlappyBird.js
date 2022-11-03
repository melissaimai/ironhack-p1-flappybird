export const FlappyBird = () => {
  const { jump, flappy, context } = globalThis
  const hasColision = (flappyBirdParams, floor) => {
    const flappyBirdY = flappyBirdParams.y + flappyBirdParams.height;
    const chaoY = floor.y;

    if (flappyBirdY >= chaoY) {
      return true;
    }

    return false;
  };

  return {
    width: 34,
    height: 24,
    x: 10,
    y: 50,
    jumpHeight: 4.6,
    gravity: 0.25,
    speed: 0,

    jump() {
      this.speed = -this.jumpHeight;
      jump.play()
    },

    update() {
      // if (hasColision(this, floor)) {
      //   hit_sound.play();
      //   changeScreen();
      //   return;
      // }


      this.speed = this.speed + this.gravity;
      this.y = this.y + this.speed;
      if (this.y >= 368 - this.height) {
        this.y = 368 - this.height
      }
    },

    draw() {
      context.drawImage(
        flappy,
        this.x,
        this.y,
        this.width,
        this.height
      );
    },
  };
};
