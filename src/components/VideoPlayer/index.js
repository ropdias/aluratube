import styled from "styled-components";
import { useRouter } from "next/router";

const StyledVideoPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  .title {
    padding: 16px;
  }
`;

const VideoPlayer = () => {
  const router = useRouter();
  return (
    <StyledVideoPlayer>
      <h2 className="title">{router.query.title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${router.query.v}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
    </StyledVideoPlayer>
  );
};

export default VideoPlayer;
