import styled from "styled-components";
import FavoriteList from "./components/FavoriteList";
import config from "../../../config.json";
import Link from "next/link";

const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px, 1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }
`;

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
    <>
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
                    let video_id = video.url.split("v=")[1];
                    let ampersandPosition = video_id.indexOf("&");
                    if (ampersandPosition != -1) {
                      video_id = video_id.substring(0, ampersandPosition);
                    }
                    return (
                      <Link
                        key={video.url}
                        href={{ pathname: "/video", query: { v: video_id } }}
                      >
                        <a>
                          <img src={video.thumb} />
                          <span>{video.title}</span>
                        </a>
                      </Link>
                      // <a key={video.url} href={video.url}>
                      //   <img src={video.thumb} />
                      //   <span>{video.title}</span>
                      // </a>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
      <FavoriteList favorites={config.favorites}></FavoriteList>
    </>
  );
};

export default Timeline;
