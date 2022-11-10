import { useState } from "react";
import config from "../config.json";
import Menu from "../src/components/Menu"; // We are using index.js in the folder Menu
import Timeline from "../src/components/Timeline"; // We are using index.js in the folder Timeline
import Header from "../src/components/Header"; // We are using index.js in the folder Header
import styled from "styled-components";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <StyledHomePage>
      <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
      <Header />
      <Timeline playlists={config.playlists} searchValue={searchValue} />
    </StyledHomePage>
  );
};

export default HomePage;
