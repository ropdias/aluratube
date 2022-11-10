import styled from "styled-components";
import { useRouter } from "next/router";

const StyledVideoPlayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const VideoPlayer = () => {
  const router = useRouter();
  return (
    <StyledVideoPlayer>
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
