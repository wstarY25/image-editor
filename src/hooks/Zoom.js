const zoomIn = (canvasRef, canvasScale, setCanvasScale) => {
  const currentTransform = new DOMMatrix(window.getComputedStyle(canvasRef.current).getPropertyValue('transform'));
  canvasRef.current.style.transform = `translate(${currentTransform.e}px, ${currentTransform.f}px) scale(${canvasScale + 0.1})`;
  setCanvasScale(canvasScale + 0.1);
};

const zoomOut = (canvasRef, canvasScale, setCanvasScale) => {
  const currentTransform = new DOMMatrix(window.getComputedStyle(canvasRef.current).getPropertyValue('transform'));
  canvasRef.current.style.transform = `translate(${currentTransform.e}px, ${currentTransform.f}px) scale(${canvasScale - 0.1})`;
  setCanvasScale(canvasScale - 0.1);
};

export { zoomIn, zoomOut };