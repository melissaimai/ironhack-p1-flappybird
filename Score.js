export const Score = () => {
  const { ponto, canvas, context } = globalThis

  const score = {
    points: 0,
    primeiroPonto: 0,
    draw() {
      context.font = '35px "VT323"';
      context.textAlign = 'right';
      context.fillStyle = 'white';
      context.fillText(`${score.points}`, canvas.width - 10, 35);
    },

    update(frames, changeScreen) {
      const intervaloDeFrames = 100;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        score.points = score.points + 1;
        ponto.play()
      }

      if (score.points >= 4) {
        changeScreen()
      }
    }
  }
  return score;
}