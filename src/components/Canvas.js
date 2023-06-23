import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { moveStart, move, moveEnd } from "../hooks/Move";
import { zoomIn, zoomOut } from "../hooks/Zoom";
import { saveHistory } from "../hooks/SaveHistory";
import { startDrawing, draw } from "../hooks/Drawing";
import { startDrag, handleDrag, cropAction } from "../hooks/Crop";
import { textbox } from "../hooks/Textbox";


export default function Canvas({ canvasRef, canvasScale, setCanvasScale, setCanvasHistory, currentStateIndex, setCurrentStateIndex,
                                 active, setActive, cropRatio, pencilColor, textContent, textColor }) {
  const canvasContainerRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false); // 캔버스 이동
  const [isDrawing, setIsDrawing] = useState(false); // 드로잉
  const [isDragging, setIsDragging] = useState(false); // 자르기
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // 드래그 시작 포인트
  
  useEffect(() => {
    const canvas = canvasRef.current;

    // canvas 초기 사이즈 설정
    canvas.width = canvasContainerRef.current.offsetWidth - 50;
    canvas.height = canvasContainerRef.current.offsetHeight - 50;

    // canvas 초기 위치 설정
    canvas.style.transform = 'translate(25px, 25px)';

    // 첫 history 저장
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
  }, []);

  const handleMove = (e, props) => {
    if (active === 'cursor') { // 커서(이동)
      if (props === 'down') moveStart(e, canvasRef, setIsMoving, setStartPosition);
      else if (props === 'move') move(e, canvasRef, isMoving, startPosition, canvasScale);
      else if (props === 'up') moveEnd(setIsMoving);
    }
  }

  const handleMouse = (e, props) => {
    if (active === 'pencil') { // 드로잉
      if (props === 'down') startDrawing(e, canvasRef, pencilColor, setIsDrawing);
      else if (props === 'move') draw(e, canvasRef, pencilColor, isDrawing, canvasScale);
      else if (isDrawing) {
        setIsDrawing(false);
        saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
      }
    } else if (active === 'crop') { // 자르기
      if (props === 'down') startDrag(e, setIsDragging, setStartPosition, canvasRef);
      else if (props === 'move') handleDrag(e, canvasRef, isDragging, startPosition, cropRatio);
      else if (props === 'up') {
        cropAction(e, canvasRef, isDragging, setIsDragging, startPosition, cropRatio);
        saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
        setActive('cursor');
      }
    } if (active === 'text' && props === 'down') { // 텍스트
      textbox(e, canvasRef, textColor, textContent, canvasScale);
      saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
    }
  }


  return (
    <CanvasContainer ref={canvasContainerRef}
      onMouseDown={(e) => handleMove(e, 'down')} onMouseMove={(e) => handleMove(e, 'move')} onMouseUp={(e) => handleMove(e, 'up')}>
      <canvas id="canvas" ref={canvasRef}
        onMouseDown={(e) => handleMouse(e, 'down')} onMouseMove={(e) => handleMouse(e, 'move')}
        onMouseUp={(e) => handleMouse(e, 'up')} onMouseOut={(e) => handleMouse(e, 'out')} />
      { active === 'cursor' &&
      <ZoomButtonContainer>
        <ZoomButton size='25px' onClick={() => zoomIn(canvasRef, canvasScale, setCanvasScale)}>+</ZoomButton>
        <ZoomButton size='33px' onClick={() => zoomOut(canvasRef, canvasScale, setCanvasScale)}>-</ZoomButton>
      </ZoomButtonContainer> }
    </CanvasContainer>
  );
}


const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  canvas {
    background-color: white;
    box-shadow: 2px 2px 2px 1px #666666;
  }
`;

const ZoomButtonContainer = styled.div`
  position: absolute;
  right: 30px;
  bottom: 60px;
  width: 30px;
  height: 70px;
  border-radius: 30px;
  border: 1px solid #DDDDDD;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ZoomButton = styled.div`
  width: 30px;
  height: 30px;
  font-size: ${(props) => props.size};
  line-height: 30px;
  text-align: center;
  cursor: pointer;

  &:first-child { margin-bottom: 5px; }
`;