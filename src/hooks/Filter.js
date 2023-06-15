// 이미지 필터

export const filter = (canvasRef, effect) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  const dataURL = canvas.toDataURL();

  const image = new Image();
  image.onload = () => {
    // 이미지에 필터 적용
    const filteredImageCanvas = document.createElement('canvas');
    const filteredImageContext = filteredImageCanvas.getContext('2d');
    filteredImageCanvas.width = image.width;
    filteredImageCanvas.height = image.height;
    filteredImageContext.filter = effect;
    filteredImageContext.drawImage(image, 0, 0, image.width, image.height);

    // 원본 캔버스 초기화
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 필터링된 이미지를 캔버스에 그리기
    context.drawImage(filteredImageCanvas, 0, 0);
  };

  image.src = dataURL;
}