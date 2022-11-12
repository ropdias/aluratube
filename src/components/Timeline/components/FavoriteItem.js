import styled from "styled-components";

const StyledFavoriteItem = styled.span`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-items: center;
    padding: 8px;
  }
  span {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    padding-top: 4px;
    color: ${({ theme }) => theme.textColorBase || "#222222"};
  }
`;

const FavoriteItem = (props) => {
  return (
    <StyledFavoriteItem>
      <a href={props.vercelLink}>
        <img src={`https://github.com/${props.github}.png`} />
        <span>@{props.github}</span>
      </a>
    </StyledFavoriteItem>
  );
};

export default FavoriteItem;
