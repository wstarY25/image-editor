import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChromePicker } from 'react-color';

import { ReactComponent as NewPageIcon } from "../images/page.svg";
import { ReactComponent as ImageIcon } from "../images/image.svg";
import { ReactComponent as DownloadIcon } from "../images/download.svg";
import { ReactComponent as CursorIcon } from "../images/cursor.svg";
import { ReactComponent as CropIcon } from "../images/crop.svg";
import { ReactComponent as RotationIcon } from "../images/rotation.svg";
import { ReactComponent as EffectIcon } from "../images/effect.svg";
import { ReactComponent as TextIcon } from "../images/text.svg";
import { ReactComponent as PencilIcon } from "../images/pencil.svg";
import { ReactComponent as InfoIcon } from "../images/info.svg";
import { ReactComponent as UndoIcon } from "../images/undo.svg";
import { ReactComponent as RedoIcon } from "../images/redo.svg";

import { saveHistory } from "../hooks/SaveHistory";
import { inputImage } from "../hooks/InputImage";
import { saveFile } from "../hooks/SaveFile";
import { rotation } from "../hooks/Rotation";
import { filter } from "../hooks/Filter";
import { undo, redo } from "../hooks/UndoRedo";


export default function TopBar({ setInfo, canvasRef, canvasHistory, setCanvasHistory, currentStateIndex, setCurrentStateIndex,
                                 active, setActive, cropRatio, setCropRatio, pencilColor, setPencilColor, textContent, setTextContent, textColor, setTextColor }) {
  
  const [infoText, setInfoText] = useState(false); let infoTime; // 기능 이름
  const [detailTopBar, setDetailTopBar] = useState('cursor'); // 기능 상세 선택 바

  const handleInfoText = (props) => { // 기능 이름 표시
    if (props === 'false') { setInfoText(false); clearTimeout(infoTime); }
    else infoTime = setTimeout(() => { setInfoText(props); }, 2000);
  }

  const handleClick = (props) => {
    if (props !== 'text' && textContent) setTextContent(''); // 텍스트 내용 비우기
    setActive(props);
    if (detailTopBar === props) setDetailTopBar('cursor'); // 기능 상세 선택 바 변경
    else setDetailTopBar(props);
  };

  useEffect(() => {
    if (active === 'cursor') setDetailTopBar('cursor');
  }, [active])

  const save = (e, props) => { // 저장하기
    if (props === 'click' || (props === 'key' && e.ctrlKey && e.key === 's')) {
      saveFile(canvasRef);
      saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
    }
  }

  const handleRotation = (angle) => { // 회전
    rotation(canvasRef, angle);
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
  }

  const handleFilter = (effect) => { // 필터
    filter(canvasRef, effect);
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
  }

  const handleUndoRedo = (props) => { // 되돌리기, 다시 실행
    if (props === 'undo' && currentStateIndex > 0)
      undo(canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex);
    else if (currentStateIndex < canvasHistory.length - 1)
      redo(canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex);
  }


  return (
    <Wrapper>
      <Left>
        <IconWrap>
          <NewPageIcon onClick={() => {window.location.reload()}}
            onMouseEnter={() => handleInfoText('newPage')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'newPage' && <Info>새 페이지 열기</Info> }
        </IconWrap>
        <IconWrap>
          <label htmlFor="image-upload"><ImageIcon onMouseEnter={() => handleInfoText('upload')} onMouseLeave={() => handleInfoText('false')} /></label>
          <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }}
            onChange={(e) => { inputImage(e, canvasRef); saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex); }} />
          { infoText === 'upload' && <Info>이미지 가져오기</Info> }
        </IconWrap>
        <IconWrap>
          <DownloadIcon onClick={(e) => save(e, 'click')} onKeyDown={(e) => save(e, 'key')}
            onMouseEnter={() => handleInfoText('download')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'download' && <Info>저장하기</Info> }
        </IconWrap>
      </Left>
      <Center>
        <IconWrap>
          <CursorIcon fill={active === 'cursor' ? 'black' : '#777777'} onClick={() => handleClick('cursor')}
            onMouseEnter={() => handleInfoText('cursor')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'cursor' && <Info>커서</Info> }
        </IconWrap>
        <IconWrap>
          <CropIcon fill={active === 'crop' ? 'black' : '#777777'} onClick={() => handleClick('crop')}
            onMouseEnter={() => handleInfoText('crop')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'crop' && <Info>자르기</Info> }
        </IconWrap>
        { detailTopBar === 'crop' && 
        <DetailBar>
          <Detail font={cropRatio === 0 ? "bold" : ""} onClick={() => setCropRatio(0)}>custom</Detail>
          <Detail font={cropRatio === 1/1 ? "bold" : ""} onClick={() => setCropRatio(1/1)}>1 : 1</Detail>
          <Detail font={cropRatio === 3/2 ? "bold" : ""} onClick={() => setCropRatio(3/2)}>3 : 2</Detail>
          <Detail font={cropRatio === 4/3 ? "bold" : ""} onClick={() => setCropRatio(4/3)}>4 : 3</Detail>
          <Detail font={cropRatio === 16/9 ? "bold" : ""} onClick={() => setCropRatio(16/9)}>16 : 9</Detail>
        </DetailBar> }
        <IconWrap>
        <RotationIcon fill={active === 'rotation' ? 'black' : '#777777'} onClick={() => handleClick('rotation')}
          onMouseEnter={() => handleInfoText('rotation')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'rotation' && <Info>회전</Info> }
        </IconWrap>
        { detailTopBar === 'rotation' && 
        <DetailBar>
          <Detail onClick={() => handleRotation(-180)}>-180°</Detail>
          <Detail onClick={() => handleRotation(-90)}>-90°</Detail>
          <Detail onClick={() => handleRotation(90)}>90°</Detail>
          <Detail onClick={() => handleRotation(180)}>180°</Detail>
        </DetailBar> }
        <IconWrap>
          <EffectIcon fill={active === 'effect' ? 'black' : '#777777'}  onClick={() => handleClick('effect')}
            onMouseEnter={() => handleInfoText('effect')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'effect' && <Info>필터</Info> }
        </IconWrap>
        { detailTopBar === 'effect' && 
        <DetailBar>
          <Detail onClick={() => handleFilter('blur(5px)')}>흐림</Detail>
          <Detail onClick={() => handleFilter('grayscale(100%)')}>회색조</Detail>
          <Detail onClick={() => handleFilter('sepia(100%)')}>세피아</Detail>
          <Detail onClick={() => handleFilter('invert(100%)')}>반전</Detail>
        </DetailBar> }
        <IconWrap>
          <TextIcon fill={active === 'text' ? 'black' : '#777777'}  onClick={() => handleClick('text')}
            onMouseEnter={() => handleInfoText('text')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'text' && <Info>텍스트 추가</Info> }
        </IconWrap>
        { detailTopBar === 'text' && 
        <DetailBar>
          <Detail>
            <input type="text" id="text" name="text" maxLength="20" placeholder="텍스트를 입력하세요"
              value={textContent} onChange={(e) => setTextContent(e.target.value)} />
          </Detail>
          <TextColorPicker><ChromePicker color={textColor} onChange={(color) => setTextColor(color.hex)} /></TextColorPicker>
        </DetailBar> }
        <IconWrap>
          <PencilIcon fill={active === 'pencil' ? 'black' : '#777777'}  onClick={() => handleClick('pencil')}
            onMouseEnter={() => handleInfoText('pencil')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'pencil' && <Info>그리기</Info> }
        </IconWrap>
        { detailTopBar === 'pencil' && 
        <PencilColorPicker><ChromePicker color={pencilColor} onChange={(color) => setPencilColor(color.hex)} /></PencilColorPicker> }
      </Center>
      <Right>
        <IconWrap>
          { currentStateIndex > 0 ?
            <UndoIcon onClick={() => handleUndoRedo('undo')} onMouseEnter={() => handleInfoText('undo')} onMouseLeave={() => handleInfoText('false')} />
          : <UndoIcon fill="#DDDDDD" onMouseEnter={() => handleInfoText('undo')} onMouseLeave={() => handleInfoText('false')} /> }
          { infoText === 'undo' && <Info>되돌리기</Info> }
        </IconWrap>
        <IconWrap>
          { currentStateIndex < canvasHistory.length - 1 ?
            <RedoIcon onClick={() => handleUndoRedo('redo')} onMouseEnter={() => handleInfoText('redo')} onMouseLeave={() => handleInfoText('false')} />
          : <RedoIcon fill="#DDDDDD" onMouseEnter={() => handleInfoText('redo')} onMouseLeave={() => handleInfoText('false')} /> }
          { infoText === 'redo' && <Info>다시 실행</Info> }
        </IconWrap>
        <IconWrap>
          <InfoIcon onClick={() => setInfo(true)} onMouseEnter={() => handleInfoText('info')} onMouseLeave={() => handleInfoText('false')} />
          { infoText === 'info' && <Info>도움말</Info> }
        </IconWrap>
      </Right>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 165px;
  margin: 0;

  svg {
    margin-right: 20px;
    cursor: pointer;
    :hover { fill: #000000; }
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 20px;

  svg {
    fill: ${(props) => props.fill};
    cursor: pointer;
    margin-right: 20px;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 165px;
  margin: 0;

  svg {
    margin-left: 20px;
    cursor: pointer;
    :hover { fill: #000000; }
  }
`;

const IconWrap = styled.div`
  position: relative;
`;

const Info = styled.div`
  position: absolute;
  top: 40px;
  background-color: #EEEEEE;
  white-space: nowrap;
  padding: 2px 5px;
  z-index: 1;
`;

// detail-topbar
const DetailBar = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: #CCCCCC;
  box-sizing: border-box;
  background-color: white;
  z-index: 1;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${(props) => props.font === 'bold' && 'bold'};
  margin: 0;
  cursor: pointer;
  &:hover { font-weight: bold; }
  &:not(:last-child) { margin-right: 25px; }

  input {
    width: 150px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    border: 0;
    margin-left: 25px;
  }
  input:focus { outline: none; }
`;

const TextColorPicker = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;

const PencilColorPicker = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1;
`;