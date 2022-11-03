export const Background = () => {
  const { sprites, canvas, context } = globalThis
  return {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,
    draw() {
      context.fillStyle = '#70c5ce';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        sprites,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      context.drawImage(
        sprites,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    },
  };
};
