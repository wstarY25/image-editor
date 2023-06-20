import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { moveStart, move, moveEnd } from "../hooks/Move";
import { zoomIn, zoomOut } from "../hooks/Zoom";
import { saveHistory } from "../hooks/SaveHistory";
import { startDrawing, draw } from "../hooks/Drawing";
import { startDrag, handleDrag, cropAction } from "../hooks/Crop";
import { textbox } from "../hooks/Textbox";


export default function Canvas({ canvasRef, canvasScale, setCanvasScale, canvasHistory, setCanvasHistory, currentStateIndex, setCurrentStateIndex,
                                 active, setActive, cropRatio, setCropRatio, pencilColor, setPencilColor, textContent, setTextContent, textColor, setTextColor }) {
  const canvasContainerRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0});
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
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
    if (active === 'cursor') {
      if (props === 'down') moveStart(e, canvasRef, setIsMoving, setMouseOffset, canvasScale);
      else if (props === 'move') move(e, canvasRef, isMoving, mouseOffset, canvasScale);
      else if (props === 'up') moveEnd(setIsMoving);
    }
  }

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
    <Wrapper ref={canvasContainerRef}
      onMouseDown={(e) => handleMove(e, 'down')} onMouseMove={(e) => handleMove(e, 'move')} onMouseUp={(e) => handleMove(e, 'up')}>
      <canvas id="canvas" ref={canvasRef}
        onMouseDown={(e) => handleMouse(e, 'down')} onMouseMove={(e) => handleMouse(e, 'move')}
        onMouseUp={(e) => handleMouse(e, 'up')} onMouseOut={(e) => handleMouse(e, 'out')} />
      { active === 'cursor' &&
      <ZoomButtonContainer>
        <ZoomButton size='25px' onClick={() => zoomIn(canvasRef, canvasScale, setCanvasScale)}>+</ZoomButton>
        <ZoomButton size='33px' onClick={() => zoomOut(canvasRef, canvasScale, setCanvasScale)}>-</ZoomButton>
      </ZoomButtonContainer> }
    </Wrapper>
  );
}


const Wrapper = styled.div`
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