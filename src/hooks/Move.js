const moveStart = (event, canvasRef, setIsMoving, setStartPosition) => {
  setIsMoving(true);
  const containerRect = canvasRef.current.getBoundingClientRect();
  const offsetX = event.clientX - containerRect.left;
  const offsetY = event.clientY - containerRect.top;
  setStartPosition({ x: offsetX, y: offsetY });
};

const move = (event, canvasRef, isMoving, startPosition, canvasScale) => {
  if (isMoving) {
    const offsetX = (canvasRef.current.width - canvasRef.current.width * canvasScale) / 2;
    const offsetY = (canvasRef.current.height - canvasRef.current.height * canvasScale) / 2;
    canvasRef.current.style.transform = `translate(${event.clientX - startPosition.x - offsetX}px, ${event.clientY - startPosition.y - offsetY - 60}px) scale(${canvasScale})`;
  };
};

const moveEnd = (setIsMoving) => {
  setIsMoving(false);
};

export { moveStart, move, moveEnd };