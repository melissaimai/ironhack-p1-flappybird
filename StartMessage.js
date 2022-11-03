export const StartMessage = () => {
  const { sprites,  context, canvas } = globalThis
  return {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: canvas.width / 2 - 174 / 2,
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
