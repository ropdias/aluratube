import { useState, useEffect } from "react";
import Menu from "../src/components/Menu"; // We are using index.js in the folder Menu
import Timeline from "../src/components/Timeline"; // We are using index.js in the folder Timeline
import Header from "../src/components/Header"; // We are using index.js in the folder Header
import styled from "styled-components";
import { videoService } from "../src/services/videoService";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HomePage = () => {
  const service = videoService();
  const [searchValue, setSearchValue] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    service
      .getAllVideos()
      .then((res) => {
        const newPlaylist = { ...playlists };
        res.data.forEach((video) => {
          if (video.playlist in newPlaylist) {
            newPlaylist[video.playlist].push(video);
          } else {
            newPlaylist[video.playlist] = [video];
          }
        });
        setPlaylists(newPlaylist);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledHomePage>
      <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
      <Header />
      <Timeline playlists={playlists} searchValue={searchValue} />
    </StyledHomePage>
  );
};

export default HomePage;
