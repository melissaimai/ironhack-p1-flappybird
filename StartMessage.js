export const StartMessage = () => {
  const { sprites, startImg, logo, context, canvas } = globalThis
  return {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: canvas.width / 2 - 174 / 2,
    y: 130,

    w2: 75,
    h2: 21,
    x2: canvas.width / 2 - 75 / 2,
    y2: canvas.height / 2 + 80,

    wl: 185,
    hl: 52,
    xl: canvas.width / 2 - 185 / 2,
    yl: canvas.height / 2 - 200,

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

      context.drawImage(
        startImg,
        this.x2,
        this.y2,
        this.w2,
        this.h2
      );

      context.drawImage(
        logo,
        this.xl,
        this.yl,
        this.wl,
        this.hl
      );

    },
  };
};
