import config from "../../config.json";
import styled from "styled-components";

const StyledBanner = styled.div`
  margin-top: 56px;
  width: 100%;
  height: 200px;
  background-image: url(${props => props.imgSrc});
  background-position: center center;
`;

const Banner = (props) => {
  return <StyledBanner imgSrc={props.imgSrc}></StyledBanner>;
};

export default Banner;
