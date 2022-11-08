import { useState } from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu"; // We are using index.js in the folder Menu
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";
import FavoriteList from "../src/components/FavoriteList";

const HomePage = () => {
  const estilosDaHomePage = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // backgroundColor: "red",
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <CSSReset />
      <div style={estilosDaHomePage}>
        <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
        <Header />
        <Timeline playlists={config.playlists} searchValue={searchValue} />
        <FavoriteList favorites={config.favorites}></FavoriteList>
      </div>
    </>
  );
};

export default HomePage;

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const Header = (props) => {
  return (
    <StyledHeader>
      <Banner imgSrc={config.bannerImgSrc} />
      {/* <img src="banner" /> */}
      <section className="user-info">
        <img src={`http://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
};

const Timeline = ({ searchValue, ...props }) => {
  // The Object.keys() method returns an array of a given object's own enumerable property names,
  // iterated in the same order that a normal loop would.
  const playlistNames = Object.keys(props.playlists);

  // You can't use statements in React like if/for inside JSX
  // So to use Conditional Rendering you should use:
  // 1) Element Variables: variables to store elements
  // 2) Inline If with Logical && Operator: true && expression / false && expression
  // 3) Inline If-Else with Conditional Operator: condition ? true : false
  // 4) Preventing Component from Rendering: return null instead of its render output
  // https://reactjs.org/docs/conditional-rendering.html
  // The thing you use the most in React is the .map() function to transform from an object to another
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
};
