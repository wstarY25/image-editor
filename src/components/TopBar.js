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
import { ReactComponent as UndoIcon } from "../images/undo.svg";
import { ReactComponent as RedoIcon } from "../images/redo.svg";

import { saveHistory } from "../hooks/SaveHistory";
import { inputImage } from "../hooks/InputImage";
import { saveFile } from "../hooks/SaveFile";
import { rotation } from "../hooks/Rotation";
import { filter } from "../hooks/Filter";
import { undo, redo } from "../hooks/UndoRedo";


export default function TopBar({ canvasRef, canvasHistory, setCanvasHistory, currentStateIndex, setCurrentStateIndex, active, setActive,
                                 cropRatio, setCropRatio, pencilColor, setPencilColor, textColor, setTextColor, textRef }) {
  const [detailTopBar, setDetailTopBar] = useState('cursor');

  const handleClick = (props) => {
    setActive(props);
    if (detailTopBar === props) setDetailTopBar('cursor');
    else setDetailTopBar(props);
  };

  useEffect(() => {
    if (active === 'cursor') setDetailTopBar('cursor');
  }, [active])

  const handleRotation = (angle) => {
    rotation(canvasRef, angle);
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
  }

  const handleFilter = (effect) => {
    filter(canvasRef, effect);
    saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex);
  }

  const handleUndoRedo = (props) => {
    if (props === 'undo' && currentStateIndex > 0) {
      undo(canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex);
    } else if (currentStateIndex < canvasHistory.length - 1) {
      redo(canvasRef, canvasHistory, currentStateIndex, setCurrentStateIndex);
    }
  }

  console.log(canvasHistory.length, currentStateIndex);


  return (
    <Wrapper>
      <Left>
        <NewPageIcon onClick={() => {window.location.reload()}} />
        <label htmlFor="image-upload"><ImageIcon /></label>
        <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }}
          onChange={(e) => { inputImage(e, canvasRef); saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex); }} />
        <DownloadIcon onClick={() => { saveFile(canvasRef); saveHistory(canvasRef, setCanvasHistory, currentStateIndex, setCurrentStateIndex); }} />
      </Left>
      <Center>
        <CursorIcon fill={active === 'cursor' ? 'black' : '#777777'} onClick={() => handleClick('cursor')} />
        <CropIcon fill={active === 'crop' ? 'black' : '#777777'} onClick={() => handleClick('crop')} />
        { detailTopBar === 'crop' && 
        <DetailBar>
          <Detail font={cropRatio === 0 ? "bold" : ""} onClick={() => setCropRatio(0)}>custom</Detail>
          <Detail font={cropRatio === 1/1 ? "bold" : ""} onClick={() => setCropRatio(1/1)}>1 : 1</Detail>
          <Detail font={cropRatio === 3/2 ? "bold" : ""} onClick={() => setCropRatio(3/2)}>3 : 2</Detail>
          <Detail font={cropRatio === 4/3 ? "bold" : ""} onClick={() => setCropRatio(4/3)}>4 : 3</Detail>
          <Detail font={cropRatio === 16/9 ? "bold" : ""} onClick={() => setCropRatio(16/9)}>16 : 9</Detail>
        </DetailBar> }
        <RotationIcon fill={active === 'rotation' ? 'black' : '#777777'} onClick={() => handleClick('rotation')} />
        { detailTopBar === 'rotation' && 
        <DetailBar>
          <Detail onClick={() => handleRotation(-180)}>-180°</Detail>
          <Detail onClick={() => handleRotation(-90)}>-90°</Detail>
          <Detail onClick={() => handleRotation(90)}>90°</Detail>
          <Detail onClick={() => handleRotation(180)}>180°</Detail>
        </DetailBar> }
        <EffectIcon fill={active === 'effect' ? 'black' : '#777777'}  onClick={() => handleClick('effect')} />
        { detailTopBar === 'effect' && 
        <DetailBar>
          <Detail onClick={() => handleFilter('blur(5px)')}>흐림</Detail>
          <Detail onClick={() => handleFilter('grayscale(100%)')}>회색조</Detail>
          <Detail onClick={() => handleFilter('sepia(100%)')}>세피아</Detail>
          <Detail onClick={() => handleFilter('invert(100%)')}>반전</Detail>
        </DetailBar> }
        <TextIcon fill={active === 'text' ? 'black' : '#777777'}  onClick={() => handleClick('text')} />
        { detailTopBar === 'text' && 
        <DetailBar>
          <Detail><input ref={textRef} type="text" id="text" name="text" maxLength="20" placeholder="텍스트를 입력하세요" /></Detail>
          <TextColorPicker><ChromePicker color={textColor} onChange={(color) => setTextColor(color.hex)} /></TextColorPicker>
        </DetailBar> }
        <PencilIcon fill={active === 'pencil' ? 'black' : '#777777'}  onClick={() => handleClick('pencil')} />
        { detailTopBar === 'pencil' && 
        <PencilColorPicker><ChromePicker color={pencilColor} onChange={(color) => setPencilColor(color.hex)} /></PencilColorPicker> }
      </Center>
      <Right>
        <UndoIcon onClick={() => handleUndoRedo('undo')} />
        <RedoIcon onClick={() => handleUndoRedo('redo')} />
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
  border-width: 1px 0;
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