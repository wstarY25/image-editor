import styled from "styled-components";
import TopBar from "./components/TopBar";
import Canvas from "./components/Canvas";

export default function App() {
  return (
    <Body>
      <Top><TopBar /></Top>
      <Main><Canvas /></Main>
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

const Main = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: gray;
`;