// 이미지 자르기

const startDrag = (event, setIsDragging, setStartPosition, canvasRef) => {
  setIsDragging(true);
  const { offsetX, offsetY } = event.nativeEvent;
  setStartPosition({ x: offsetX, y: offsetY });

  const canvas = canvasRef.current;
  const backupCanvas = document.createElement('canvas');
  backupCanvas.width = canvas.width;
  backupCanvas.height = canvas.height;
  const backupContext = backupCanvas.getContext('2d');
  backupContext.drawImage(canvas, 0, 0); // 기존 캔버스 이미지를 백업 캔버스로 복사

  canvasRef.current.backupCanvas = backupCanvas; // 백업 캔버스를 canvasRef에 저장
};

const handleDrag = (event, canvasRef, isDragging, startPosition) => {
  if (!isDragging) return;
  const { offsetX, offsetY } = event.nativeEvent;
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(canvasRef.current.backupCanvas, 0, 0); // 백업 캔버스를 그려줌
  context.strokeStyle = 'red';
  context.lineWidth = 2;
  const width = offsetX - startPosition.x;
  const height = offsetY - startPosition.y;
  context.strokeRect(startPosition.x, startPosition.y, width, height);
};

const cropAction = (event, canvasRef, isDragging, setIsDragging, startPosition) => {
  if (!isDragging) return;
  setIsDragging(false);
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const { x, y } = startPosition;
  const { offsetX, offsetY } = event.nativeEvent;
  const width = offsetX - x;
  const height = offsetY - y;

  const backupCanvas = canvasRef.current.backupCanvas; // 백업 캔버스 가져오기
  const backupContext = backupCanvas.getContext('2d');
  const imageData = backupContext.getImageData(x, y, width, height);

  // 자른 이미지를 새로운 Canvas에 그리기
  const newCanvas = document.createElement('canvas');
  newCanvas.width = width;
  newCanvas.height = height;
  const newContext = newCanvas.getContext('2d');
  newContext.putImageData(imageData, 0, 0);

  context.clearRect(0, 0, canvas.width, canvas.height); // 기존 캔버스 지우기
  canvas.width = width;
  canvas.height = height;
  context.drawImage(newCanvas, 0, 0); // 자른 이미지 그리기
};

export { startDrag, handleDrag, cropAction };