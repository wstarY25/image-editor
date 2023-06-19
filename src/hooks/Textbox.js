export const textbox = (event, canvasRef, textColor, textContent) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  const { offsetX, offsetY } = event.nativeEvent;

  context.fillStyle = 'rgba(0, 0, 0, 0)';
  context.fillRect(offsetX, offsetY, 500, 40);

  context.font = '20px Arial';
  context.fillStyle = textColor;
  context.fillText(textContent, offsetX, offsetY);
}