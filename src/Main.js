import { useRef, useState } from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import Canvas from "./components/Canvas";


export default function Main() {
  const canvasRef = useRef(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [active, setActive] = useState('cursor');
  const [cropRatio, setCropRatio] = useState(0);
  const [pencilColor, setPencilColor] = useState('black');
  const [textColor, setTextColor] = useState('black');
  const textRef = useRef('');

  return (
    <Body>
      <Top>
        <TopBar canvasRef={canvasRef}
          canvasHistory={canvasHistory} setCanvasHistory={setCanvasHistory}
          currentStateIndex={currentStateIndex} setCurrentStateIndex={setCurrentStateIndex}
          active={active} setActive={setActive}
          cropRatio={cropRatio} setCropRatio={setCropRatio}
          pencilColor={pencilColor} setPencilColor={setPencilColor}
          textColor={textColor} setTextColor={setTextColor} textRef={textRef} />
      </Top>
      <CanvasContainer>
        <Canvas canvasRef={canvasRef}
          canvasHistory={canvasHistory} setCanvasHistory={setCanvasHistory}
          currentStateIndex={currentStateIndex} setCurrentStateIndex={setCurrentStateIndex}
          active={active} setActive={setActive}
          cropRatio={cropRatio} setCropRatio={setCropRatio}
          pencilColor={pencilColor} setPencilColor={setPencilColor}
          textColor={textColor} setTextColor={setTextColor} textRef={textRef} />
        <Name>© 모바일앱개발협동조합</Name>
      </CanvasContainer>
    </Body>
  );
}


const Body = styled.div`
  width: 100%;
  height: 100vh;
`;

const Top = styled.div`
  width: 100%;
  height: 60px;
`;

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: gray;
`;

const Name = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: #AAAAAA;
`;