export const inputImage = (event, canvasRef) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (readerEvent) => {
    const image = new Image();

    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Canvas 크기 설정
      canvas.width = image.width;
      canvas.height = image.height;

      // 이미지 그리기
      context.drawImage(image, 0, 0);
    };

    image.src = readerEvent.target.result;
  };

  reader.readAsDataURL(file);
}