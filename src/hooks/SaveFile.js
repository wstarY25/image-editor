// 이미지 저장

export const saveFile = (canvasRef) => {
  const canvas = canvasRef.current;

  // Canvas를 Blob 객체로 변환
  canvas.toBlob((blob) => {
    // Blob 객체를 링크로 만들기
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'canvas_image.png'; // 다운로드될 파일명
    link.click();
  });
}