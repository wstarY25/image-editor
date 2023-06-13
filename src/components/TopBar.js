import styled from "styled-components";

import { ReactComponent as NewPageIcon } from "../images/page.svg";
import { ReactComponent as ImageIcon } from "../images/image.svg";
import { ReactComponent as CropIcon } from "../images/crop.svg";
import { ReactComponent as TextIcon } from "../images/text.svg";
import { ReactComponent as DownloadIcon } from "../images/download.svg";


export default function TopBar() {
  return (
    <Wrapper>
      <Left>
        <NewPageIcon onClick={() => {window.location.reload()}} />
        <ImageIcon />
      </Left>
      <Center>
        <CropIcon />
        <TextIcon />
      </Center>
      <Right>
        <DownloadIcon />
      </Right>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin: 0;

  svg {
    margin-right: 10px;
    cursor: pointer;
    :hover { fill: #000000; }
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin: 0;

  svg {
    margin-left: 10px;
    cursor: pointer;
    :hover { fill: #000000; }
  }
`;