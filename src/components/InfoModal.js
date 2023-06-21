import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../images/close.svg";
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
import { ReactComponent as InfoIcon } from "../images/info.svg";


export default function InfoModal({ setInfo }) {
  return (
    <>
    <CloseButton onClick={() => setInfo(false)}><CloseIcon /></CloseButton>
    <InfoContainer>
      <InfoBox>
        <Title><NewPageIcon />새 페이지</Title>
        <Title><ImageIcon />이미지 불러오기</Title>
        <Title><DownloadIcon />저장하기<div>(Ctrl+S)</div></Title>
      </InfoBox>
      <InfoBox>
        <Title><CursorIcon />확대/축소, 이동</Title>
        <Content>
          커서 아이콘을 선택하면 화면 우측 하단에 확대/축소 버튼이 활성화됩니다.
          버튼을 클릭하여 캔버스를 확대 또는 축소할 수 있으며,
          마우스를 드래그하여 캔버스를 이동시킬 수 있습니다.
        </Content>
      </InfoBox>
      <InfoBox>
        <Title><CropIcon />자르기</Title>
        <Content>
          1:1, 3:2, 4:3, 16:9 등 원하는 비율에 맞게 캔버스를 자를 수 있습니다.
        </Content>
      </InfoBox>
      <InfoBox>
        <Title><RotationIcon />회전</Title>
        <Content>
          캔버스를 좌/우 방향으로 90° 혹은 180°로 회전시킬 수 있습니다.
        </Content>
      </InfoBox>
      <InfoBox>
        <Title><EffectIcon />이미지 필터</Title>
        <Content>흐림 효과, 회색조, 세피아, 색상 반전의 효과를 사용할 수 있습니다.</Content>
      </InfoBox>
      <InfoBox>
        <Title><TextIcon />텍스트 추가</Title>
        <Content>텍스트를 입력하여 캔버스에 추가할 수 있으며, 자유로운 색상 선택이 가능합니다.</Content>
      </InfoBox>
      <InfoBox>
        <Title><PencilIcon />그리기</Title>
        <Content>원하는 색상으로 캔버스 위에 그림을 그려넣을 수 있습니다.</Content>
      </InfoBox>
      <InfoBox>
        <Title><UndoIcon /><RedoIcon />되돌리기, 다시 실행</Title>
        <Content>캔버스 위에 실행한 행동을 되돌리거나 다시 실행할 수 있습니다.</Content>
      </InfoBox>
      <InfoBox>
        <Title><InfoIcon />도움말</Title>
        <Content>버튼을 클릭하면 해당 내용을 다시 확인할 수 있습니다.</Content>
      </InfoBox>
    </InfoContainer>
    </>
  );
}


const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
    fill: white;
  }
`;

const InfoContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 10px;
  border: 10px solid #99999999;
  box-sizing: border-box;
  padding: 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    padding-right: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #DDDDDD;
  }
`;

const InfoBox = styled.div`
  display: inline-block;
  width: 350px;
  margin: 20px;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 10px;

  svg {
    max-width: 30px;
    max-height: 30px;
    fill: #AAAAAA;
    margin-right: 10px;
  }

  > div {
    font-size: 16px;
    font-weight: 500;
  }
`;

const Content = styled.div`
  text-align: justify;
  padding: 5px;
`;