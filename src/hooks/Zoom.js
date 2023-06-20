const zoomIn = (canvasRef, canvasScale, setCanvasScale) => {
  let translate = '';
  if (canvasRef.current.style.transform && canvasRef.current.style.transform.startsWith("translate")) translate = canvasRef.current.style.transform.split(" ")[0] + ' ' + canvasRef.current.style.transform.split(" ")[1];
  canvasRef.current.style.transform = `${translate} scale(${canvasScale + 0.2})`;
  setCanvasScale(canvasScale + 0.2);
};

const zoomOut = (canvasRef, canvasScale, setCanvasScale) => {
  let translate = '';
  if (canvasRef.current.style.transform && canvasRef.current.style.transform.startsWith("translate")) translate = canvasRef.current.style.transform.split(" ")[0] + ' ' + canvasRef.current.style.transform.split(" ")[1];
  canvasRef.current.style.transform = `${translate} scale(${canvasScale - 0.2})`;
  setCanvasScale(canvasScale - 0.2);
};

export { zoomIn, zoomOut };