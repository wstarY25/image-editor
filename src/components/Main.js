import { useRef, useState } from "react";
import styled from "styled-components";

import InfoModal from "./InfoModal";
import TopBar from "./TopBar";
import Canvas from "./Canvas";


export default function Main() {
  const canvasRef = useRef(null); // 캔버스
  const [canvasScale, setCanvasScale] = useState(1); // 캔버스 확대/축소
  const [canvasHistory, setCanvasHistory] = useState([]); // 캔버스 실행 내역
  const [currentStateIndex, setCurrentStateIndex] = useState(-1); // 캔버스 실행 내역 중 현재 index

  const [active, setActive] = useState('cursor'); // 실행 중인 기능(cursor, crop, rotation, effect, text, pencil)
  const [cropRatio, setCropRatio] = useState(0); // 자르기 비율
  const [pencilColor, setPencilColor] = useState('black'); // 드로잉 색상
  const [textContent, setTextContent] = useState(''); // 텍스트 내용
  const [textColor, setTextColor] = useState('black'); // 텍스트 색상

  const [info, setInfo] = useState(false); // 안내문 모달

  return (
    <Body>
      { info && <InfoWrap><InfoModal setInfo={setInfo} /></InfoWrap> }
      <Top>
        <TopBar setInfo={setInfo} canvasRef={canvasRef}
          canvasHistory={canvasHistory} setCanvasHistory={setCanvasHistory}
          currentStateIndex={currentStateIndex} setCurrentStateIndex={setCurrentStateIndex}
          active={active} setActive={setActive}
          cropRatio={cropRatio} setCropRatio={setCropRatio}
          pencilColor={pencilColor} setPencilColor={setPencilColor}
          textContent={textContent} setTextContent={setTextContent} textColor={textColor} setTextColor={setTextColor} />
      </Top>
      <CanvasContainer>
        <Canvas canvasRef={canvasRef} canvasScale={canvasScale} setCanvasScale={setCanvasScale}
          setCanvasHistory={setCanvasHistory}
          currentStateIndex={currentStateIndex} setCurrentStateIndex={setCurrentStateIndex}
          active={active} setActive={setActive}
          cropRatio={cropRatio} pencilColor={pencilColor} textContent={textContent} textColor={textColor} />
        <Name>모바일앱개발협동조합</Name>
      </CanvasContainer>
    </Body>
  );
}


const Body = styled.div`
  width: 100%;
  height: 100vh;
`;

const InfoWrap = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Top = styled.div`
  width: 100%;
  height: 60px;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: #CCCCCC;
  box-sizing: border-box;
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