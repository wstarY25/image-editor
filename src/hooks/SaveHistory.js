export const saveHistory = (canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const newImageData = new ImageData(imageData.data, imageData.width, imageData.height);
  setCanvasHistory((prevHistory) => [...prevHistory.slice(0, currentStateIndex + 1), newImageData]);
  setCurrentStateIndex(currentStateIndex + 1);
}