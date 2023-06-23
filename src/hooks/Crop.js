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

const handleDrag = (event, canvasRef, isDragging, startPosition, desiredAspectRatio) => {
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

  if (desiredAspectRatio === 0) {
    context.strokeRect(startPosition.x, startPosition.y, width, height);
  } else {
    const currentAspectRatio = Math.abs(width / height); // 현재 종횡비 계산

    // 종횡비에 맞게 너비 또는 높이 조정
    if (currentAspectRatio > desiredAspectRatio) {
      // 너비를 기준으로 높이 조정
      const adjustedHeight = Math.sign(height) * Math.abs(width) / desiredAspectRatio;
      context.strokeRect(startPosition.x, startPosition.y, width, adjustedHeight);
    } else {
      // 높이를 기준으로 너비 조정
      const adjustedWidth = Math.sign(width) * Math.abs(height) * desiredAspectRatio;
      context.strokeRect(startPosition.x, startPosition.y, adjustedWidth, height);
    }
  }
};

const cropAction = (event, canvasRef, isDragging, setIsDragging, startPosition, desiredAspectRatio) => {
  if (!isDragging) return;
  setIsDragging(false);
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const { x, y } = startPosition;
  const { offsetX, offsetY } = event.nativeEvent;
  const width = offsetX - x;
  const height = offsetY - y;

  if (desiredAspectRatio === 0) {
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
  } else {
    // 현재 가로 세로 비율 계산
    const currentAspectRatio = Math.abs(width / height);

    // 원하는 가로 세로 비율에 맞춰서 너비 또는 높이 조정
    let adjustedWidth, adjustedHeight;
    if (currentAspectRatio > desiredAspectRatio) {
      // 너비를 기준으로 높이 조정
      adjustedHeight = Math.sign(height) * Math.abs(width) / desiredAspectRatio;
      adjustedWidth = width;
    } else {
      // 높이를 기준으로 너비 조정
      adjustedWidth = Math.sign(width) * Math.abs(height) * desiredAspectRatio;
      adjustedHeight = height;
    }

    // 조정된 너비와 높이를 기준으로 자르기 시작점 계산
    const cropX = x + Math.min(0, width);
    const cropY = y + Math.min(0, height);

    const backupCanvas = canvasRef.current.backupCanvas; // 백업 캔버스 가져오기
    const backupContext = backupCanvas.getContext('2d');
    const imageData = backupContext.getImageData(cropX, cropY, Math.abs(adjustedWidth), Math.abs(adjustedHeight));

    // 자른 이미지를 새 캔버스에 그리기
    const newCanvas = document.createElement('canvas');
    newCanvas.width = Math.abs(adjustedWidth);
    newCanvas.height = Math.abs(adjustedHeight);
    const newContext = newCanvas.getContext('2d');
    newContext.putImageData(imageData, 0, 0);

    context.clearRect(0, 0, canvas.width, canvas.height); // 기존 캔버스 지우기
    canvas.width = Math.abs(adjustedWidth);
    canvas.height = Math.abs(adjustedHeight);
    context.drawImage(newCanvas, 0, 0); // 자른 이미지 그리기
  }
  
  const translateX = (window.innerWidth - canvas.width) / 2;
  const translateY = (window.innerHeight-60 - canvas.height) / 2;
  canvas.style.transform = `translate(${translateX}px, ${translateY}px)`;
};

export { startDrag, handleDrag, cropAction };