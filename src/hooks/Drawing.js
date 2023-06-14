// 그림 그리기

const startDrawing = (event, canvasRef, pencilColor, setIsDrawing) => {
  setIsDrawing(true);
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.strokeStyle = pencilColor;
  const { offsetX, offsetY } = event.nativeEvent;
  context.beginPath();
  context.moveTo(offsetX, offsetY);
};

const draw = (event, canvasRef, pencilColor, isDrawing) => {
  if (!isDrawing) return;
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.strokeStyle = pencilColor;
  const { offsetX, offsetY } = event.nativeEvent;
  context.lineTo(offsetX, offsetY);
  context.stroke();
};

export { startDrawing, draw };