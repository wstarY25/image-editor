import styled from "styled-components";

import { ReactComponent as PlusIcon } from "../images/plus.svg";
import { ReactComponent as RemoveIcon } from "../images/remove.svg";


export default function Layer() {
  const newLayer = () => { // 새 레이어 생성

  }

  return (
    <LayerContainer>
      <Title>레이어<NewLayerButton onClick={newLayer}><PlusIcon /></NewLayerButton></Title>
      <LayerList>
        <LayerBox>Layer 1<RemoveButton><RemoveIcon /></RemoveButton></LayerBox>
      </LayerList>
    </LayerContainer>
  );
}

const LayerContainer = styled.div`
  width: 200px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  border: 2px solid #CCCCCC;
  box-sizing: border-box;
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  box-sizing: border-box;
  background-color: #EEEEEE;
  padding: 0 5px;
`;

const NewLayerButton = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
    margin: 0;
  }
`;

const LayerList = styled.div`
  width: 100%;
  height: 266px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    padding-right: 3px;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #DDDDDD;
  }
`;

const LayerBox = styled.div`
  position: relative;
  width: 194px;
  height: 30px;
  font-size: 14px;
  line-height: 25px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: white;
  padding: 0 7px;
  margin: 1px;
`;

const RemoveButton = styled.span`
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;
  
  svg {
    width: 15px;
    height: 15px;
    margin: 0;
  }
`;