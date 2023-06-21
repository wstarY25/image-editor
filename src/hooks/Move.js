const moveStart = (event, canvasRef, setIsMoving, setStartPosition, canvasScale) => {
  setIsMoving(true);
  const containerRect = canvasRef.current.getBoundingClientRect();
  const offsetX = event.clientX - containerRect.left;
  const offsetY = event.clientY - containerRect.top;
  setStartPosition({ x: offsetX, y: offsetY });
};

const move = (event, canvasRef, isMoving, startPosition, canvasScale) => {
  if (isMoving) {
    canvasRef.current.style.transform = `translate(${(event.clientX - startPosition.x) * canvasScale}px, ${(event.clientY - startPosition.y - 60) * canvasScale}px) scale(${canvasScale})`;
  };
};

const moveEnd = (setIsMoving) => {
  setIsMoving(false);
};

export { moveStart, move, moveEnd };