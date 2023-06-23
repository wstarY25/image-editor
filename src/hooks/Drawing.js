const startDrawing = (event, canvasRef, pencilColor, setIsDrawing) => {
  setIsDrawing(true);
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  
  const context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.strokeStyle = pencilColor;
  context.beginPath();
  context.moveTo(offsetX, offsetY);
};

const draw = (event, canvasRef, pencilColor, isDrawing, canvasScale) => {
  if (!isDrawing) return;
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  
  const context = canvas.getContext('2d');
  const scale = 2 - canvasScale;
  context.lineWidth = 2 * scale;
  context.strokeStyle = pencilColor;
  context.lineTo(offsetX, offsetY);
  context.stroke();
};

export { startDrawing, draw };