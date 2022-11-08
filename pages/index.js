import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";

const HomePage = () => {
  const estilosDaHomePage = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // backgroundColor: "red",
  };

  return (
    <>
      <CSSReset />
      <div style={estilosDaHomePage}>
        <Menu />
        <Banner imgSrc={config.bannerImgSrc} />
        <Header />
        <Timeline playlists={config.playlists} />
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
    margin-top: 10px;
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

const Timeline = (props) => {
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
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
