import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


export default function Canvas() {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleResize = () => {
      // 저장된 크기 업데이트
      setCanvasSize({
        width: canvasContainerRef.current.offsetWidth,
        height: canvasContainerRef.current.offsetHeight
      });

      // Canvas 크기 설정
      canvas.width = canvasContainerRef.current.offsetWidth;
      canvas.height = canvasContainerRef.current.offsetHeight;
    };

    // 초기 사이즈 설정
    handleResize();

    // 리사이즈 이벤트 처리
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, [window.innerWidth, window.innerHeight]);


  return (
    <Wrapper size={size}>
      <CanvasContainer ref={canvasContainerRef}>
        <canvas id="canvas" ref={canvasRef}></canvas>
      </CanvasContainer>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: ${(props) => props.size.width > 1560 && "center"};
  align-items: ${(props) => props.size.height > 820 && "center"};
  padding: 10px;
  overflow: scroll;
`;

const CanvasContainer = styled.div`
  width: 1500px;
  height: 720px;
  margin: 10px;

  canvas {
    background-color: white;
    box-shadow: 2px 2px 2px 1px #666666;
  }
`;