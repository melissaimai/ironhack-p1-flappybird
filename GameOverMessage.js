export const GameOverMessage = () => {
  const {sprites, canvas, context} = globalThis
  return {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: canvas.width / 2 - 226 / 2,
    y: 50,
    draw() {
      context.drawImage(
        sprites,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    },
  };
};
