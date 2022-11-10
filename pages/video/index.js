import { useState } from "react";
import Menu from "../../src/components/Menu";
import styled from "styled-components";
import VideoPlayer from "../../src/components/VideoPlayer";

const StyledVideo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Video = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <StyledVideo>
      <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
      <VideoPlayer />
    </StyledVideo>
  );
};

export default Video;
