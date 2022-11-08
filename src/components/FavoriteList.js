import styled from "styled-components";
import FavoriteItem from "./FavoriteItem";

const StyledFavoriteList = styled.div`
  padding: 16px;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  section {
    width: 100%;
    padding: 16px;
    div {
      display: flex;
      overflow-x: auto;
    }
  }
`;

const FavoriteList = (props) => {
  return (
    <StyledFavoriteList>
      <section>
        <h2>AluraTubes Favoritos</h2>
        <div>
          {props.favorites.map((favorite) => {
            return (
              <FavoriteItem
                key={favorite.id}
                vercelLink={favorite.vercelLink}
                github={favorite.github}
              />
            );
          })}
        </div>
      </section>
    </StyledFavoriteList>
  );
};

export default FavoriteList;
