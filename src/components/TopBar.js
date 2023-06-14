import { useState } from "react";
import styled from "styled-components";

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

import { inputImage } from "../hooks/InputImage";
import { saveFile } from "../hooks/SaveFile";


export default function TopBar({ canvasRef, active, setActive,
                                 cropRatio, setCropRatio, pencilColor, setPencilColor, textColor, setTextColor }) {
  const [detailTopBar, setDetailTopBar] = useState('cursor');

  const handleClick = (props) => {
    setActive(props);
    if (detailTopBar === props) setDetailTopBar('cursor');
    else setDetailTopBar(props);
  };

  return (
    <Wrapper>
      <Left>
        <NewPageIcon onClick={() => {window.location.reload()}} />
        <label htmlFor="image-upload"><ImageIcon /></label>
        <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }}
          onChange={(e) => inputImage(e, canvasRef)} />
        <DownloadIcon onClick={() => saveFile(canvasRef)} />
      </Left>
      <Center>
        <CursorIcon fill={active === 'cursor' ? 'black' : '#777777'} onClick={() => handleClick('cursor')} />
        <CropIcon fill={active === 'crop' ? 'black' : '#777777'} onClick={() => handleClick('crop')} />
        { detailTopBar === 'crop' && 
        <DetailBar>
          <Detail line={cropRatio === '1/1'} onClick={() => setCropRatio('1/1')}>1 : 1</Detail>
          <Detail line={cropRatio === '3/2'} onClick={() => setCropRatio('3/2')}>3 : 2</Detail>
          <Detail line={cropRatio === '4/3'} onClick={() => setCropRatio('4/3')}>4 : 3</Detail>
          <Detail last line={cropRatio === '16/9'} onClick={() => setCropRatio('16/9')}>16 : 9</Detail>
        </DetailBar> }
        <RotationIcon fill={active === 'rotation' ? 'black' : '#777777'} onClick={() => handleClick('rotation')} />
        { detailTopBar === 'rotation' && 
        <DetailBar>
          <Detail>-180°</Detail>
          <Detail>-90°</Detail>
          <Detail>90°</Detail>
          <Detail last>180°</Detail>
        </DetailBar> }
        <EffectIcon fill={active === 'effect' ? 'black' : '#777777'}  onClick={() => handleClick('effect')} />
        { detailTopBar === 'effect' && 
        <DetailBar>
        </DetailBar> }
        <TextIcon fill={active === 'text' ? 'black' : '#777777'}  onClick={() => handleClick('text')} />
        { detailTopBar === 'text' && 
        <DetailBar>
          <Detail><Color color='black' border={textColor === 'black'} onClick={() => setTextColor('black')} /></Detail>
          <Detail><Color color='white' border={textColor === 'white'} onClick={() => setTextColor('white')} /></Detail>
          <Detail><Color color='red' border={textColor === 'red'} onClick={() => setTextColor('red')} /></Detail>
          <Detail><Color color='yellow' border={textColor === 'yellow'} onClick={() => setTextColor('yellow')} /></Detail>
          <Detail><Color color='green' border={textColor === 'green'} onClick={() => setTextColor('green')} /></Detail>
          <Detail><Color color='blue' border={textColor === 'blue'} onClick={() => setTextColor('blue')} /></Detail>
          <Detail last><Color color='purple' border={textColor === 'purple'} onClick={() => setTextColor('purple')} /></Detail>
        </DetailBar> }
        <PencilIcon fill={active === 'pencil' ? 'black' : '#777777'}  onClick={() => handleClick('pencil')} />
        { detailTopBar === 'pencil' && 
        <DetailBar>
          <Detail><Color color='black' border={pencilColor === 'black'} onClick={() => setPencilColor('black')} /></Detail>
          <Detail><Color color='white' border={pencilColor === 'white'} onClick={() => setPencilColor('white')} /></Detail>
          <Detail><Color color='red' border={pencilColor === 'red'} onClick={() => setPencilColor('red')} /></Detail>
          <Detail><Color color='yellow' border={pencilColor === 'yellow'} onClick={() => setPencilColor('yellow')} /></Detail>
          <Detail><Color color='green' border={pencilColor === 'green'} onClick={() => setPencilColor('green')} /></Detail>
          <Detail><Color color='blue' border={pencilColor === 'blue'} onClick={() => setPencilColor('blue')} /></Detail>
          <Detail last><Color color='purple' border={pencilColor === 'purple'} onClick={() => setPencilColor('purple')} /></Detail>
        </DetailBar> }
      </Center>
      <Right>
        <UndoIcon />
        <RedoIcon />
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
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  text-decoration: ${(props) => props.line && 'underline'};
  margin-right: ${(props) => !props.last && '25px'};
  cursor: pointer;
  :hover { font-weight: bold; }
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => props.border ? '3px solid #AAAAAA' : '1px solid #CCCCCC'};
  background-color: ${(props) => props.color};
`;