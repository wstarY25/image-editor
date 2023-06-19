import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { saveHistory } from "../hooks/SaveHistory";
import { startDrawing, draw } from "../hooks/Drawing";
import { startDrag, handleDrag, cropAction } from "../hooks/Crop";
import { textbox } from "../hooks/Textbox";


export default function Canvas({ canvasRef, canvasSize, setCanvasSize, canvasHistory, setCanvasHistory, currentStateIndex, setCurrentStateIndex,
                                 active, setActive, cropRatio, setCropRatio, pencilColor, setPencilColor, textContent, setTextContent, textColor, setTextColor }) {
  const canvasContainerRef = useRef(null);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;

    const handleResize = () => {
      // Canvas 크기 설정
      canvas.width = canvasContainerRef.current.offsetWidth;
      canvas.height = canvasContainerRef.current.offsetHeight;
    };

    // 초기 사이즈 설정
    handleResize();

    // history 시작
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);

    // 리사이즈 이벤트 처리
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, [window.innerWidth, window.innerHeight]);


  const handleMouse = (e, props) => {
    if (active === 'pencil') {
      if (props === 'down') startDrawing(e, canvasRef, pencilColor, setIsDrawing);
      else if (props === 'move') draw(e, canvasRef, pencilColor, isDrawing);
      else if (isDrawing) {
        setIsDrawing(false);
        saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
      }
    } else if (active === 'crop') {
      if (props === 'down') startDrag(e, setIsDragging, setStartPosition, canvasRef);
      else if (props === 'move') handleDrag(e, canvasRef, isDragging, startPosition, cropRatio);
      else if (props === 'up') {
        cropAction(e, canvasRef, isDragging, setIsDragging, startPosition, cropRatio);
        saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
        setActive('cursor');
      }
    } if (active === 'text' && props === 'down') {
      textbox(e, canvasRef, textColor, textContent);
      saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
    }
  }


  return (
    <Wrapper size={size}>
      <CanvasContainer ref={canvasContainerRef}>
        <canvas id="canvas" ref={canvasRef}
          onMouseDown={(e) => handleMouse(e, 'down')} onMouseMove={(e) => handleMouse(e, 'move')}
          onMouseUp={(e) => handleMouse(e, 'up')} onMouseOut={(e) => handleMouse(e, 'out')} />
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