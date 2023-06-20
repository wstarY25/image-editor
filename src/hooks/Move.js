const moveStart = (event, canvasRef, setIsMoving, setMouseOffset, canvasScale) => {
  setIsMoving(true);
  const containerRect = canvasRef.current.getBoundingClientRect();
  const offsetX = event.clientX - containerRect.left;
  const offsetY = event.clientY - containerRect.top;
  setMouseOffset({ x: offsetX, y: offsetY });
};

const move = (event, canvasRef, isMoving, mouseOffset, canvasScale) => {
  if (isMoving) {
    canvasRef.current.style.transform = `translate(${(event.clientX - mouseOffset.x) * canvasScale}px, ${(event.clientY - mouseOffset.y - 60) * canvasScale}px) scale(${canvasScale})`;
  };
};

const moveEnd = (setIsMoving) => {
  setIsMoving(false);
};

export { moveStart, move, moveEnd };