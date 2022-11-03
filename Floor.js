export function Floor() {
  const { sprites, canvas, context } = globalThis
  return {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    update() {
      const groundMovement = 1;
      const repeatIn = this.width / 2;
      const displacement = this.x - groundMovement;

      this.x = displacement % repeatIn;
    },
    draw() {
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
}
