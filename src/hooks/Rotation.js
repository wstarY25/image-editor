export const rotation = (canvasRef, angle) => {
  const repeat = Math.abs(angle) / 90;
  if (angle > 0) angle = 90;
  else angle = -90;

  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  for (let i = 1; i <= repeat; i++) {
    // 새로운 가상 캔버스 생성
    const virtualCanvas = document.createElement("canvas");
    const virtualContext = virtualCanvas.getContext("2d");
  
    // 원본 캔버스의 크기를 가상 캔버스에 설정
    virtualCanvas.width = canvas.width;
    virtualCanvas.height = canvas.height;
  
    // 원본 캔버스의 이미지를 가상 캔버스에 복사
    virtualContext.drawImage(canvas, 0, 0);
  
    // 원본 캔버스를 지우고 회전 적용
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = virtualCanvas.height;
    canvas.height = virtualCanvas.width;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((Math.PI / 180) * angle);
    context.drawImage(
      virtualCanvas,
      -canvas.height / 2,
      -canvas.width / 2,
      canvas.height,
      canvas.width
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
  }
}