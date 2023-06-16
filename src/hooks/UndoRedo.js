const undo = (canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex) => {
  setCurrentStateIndex(currentStateIndex - 1);
  const context = canvasRef.current.getContext('2d');
  context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  context.putImageData(canvasHistory[currentStateIndex - 1], 0, 0);
};

const redo = (canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex) => {
  setCurrentStateIndex(currentStateIndex + 1);
  const context = canvasRef.current.getContext('2d');
  context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  context.putImageData(canvasHistory[currentStateIndex + 1], 0, 0);
};

export { undo, redo };