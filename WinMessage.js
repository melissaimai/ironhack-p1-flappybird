export const WinMessage = () => {
  const { win, canvas, context } = globalThis
  return {
    w: 195,
    h: 40,
    x: canvas.width / 2 - 195 / 2,
    y: canvas.height / 2 - 80,

    w2: 75,
    h2: 21,
    x2: canvas.width / 2 - 75 / 2,
    y2: canvas.height / 2 - 21,

    draw() {
      context.drawImage(
        win,
        this.x,
        this.y,
        this.w,
        this.h
      );
      context.drawImage(
        startImg,
        this.x2,
        this.y2,
        this.w2,
        this.h2
      );
    },
  };
};
