import { useState, useEffect, useContext } from "react";
import Menu from "../src/components/Menu"; // We are using index.js in the folder Menu
import Timeline from "../src/components/Timeline"; // We are using index.js in the folder Timeline
import Header from "../src/components/Header"; // We are using index.js in the folder Header
import styled from "styled-components";
import { videoService } from "../src/services/videoService";
import { PlaylistContext } from "../src/context/Playlists";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HomePage = () => {
  const service = videoService();
  const [searchValue, setSearchValue] = useState("");
  const playlistsCtx = useContext(PlaylistContext);

  useEffect(() => {
    service
      .getAllVideos()
      .then((res) => {
        playlistsCtx.insertVideos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledHomePage>
      <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
      <Header />
      <Timeline searchValue={searchValue} />
    </StyledHomePage>
  );
};

export default HomePage;
