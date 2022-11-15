import { createContext, useState } from "react";

// It starts with a capital letter because createContext returns a component
export const PlaylistContext = createContext({
  playlists: {},
  insertVideos: () => {
    alert("Please configure PlaylistContext using the Provider !"); // Just a safety mechanism to make sure we use the Provider first
  },
  inserOneVideo: () => {
    alert("Please configure PlaylistContext using the Provider !"); // Just a safety mechanism to make sure we use the Provider first
  },
});

const PlaylistProvider = (props) => {
  const [playlists, setPlaylists] = useState({});

  const insertVideosHandler = (videos) => {
    setPlaylists((prevPlaylist) => {
      const newPlaylist = { ...prevPlaylist };
      videos.forEach((newVideo) => {
        if (newVideo.playlist in newPlaylist) {
          let videoAlreadyInPlaylist = false;
          newPlaylist[newVideo.playlist].every((video) => {
            if (video.id === newVideo.id) {
              videoAlreadyInPlaylist = true;
              return false;
            }
            return true;
          });
          if (!videoAlreadyInPlaylist) {
            newPlaylist[newVideo.playlist].push(newVideo);
          }
        } else {
          newPlaylist[newVideo.playlist] = [newVideo];
        }
      });
      return newPlaylist;
    });
  };

  const inserOneVideoHandler = (newVideo) => {
    setPlaylists((prevPlaylist) => {
      const newPlaylist = { ...prevPlaylist };
      if (newVideo.playlist in newPlaylist) {
        let videoAlreadyInPlaylist = false;
        newPlaylist[newVideo.playlist].every((video) => {
          if (video.id === newVideo.id) {
            videoAlreadyInPlaylist = true;
            return false;
          }
          return true;
        });
        if (!videoAlreadyInPlaylist) {
          newPlaylist[newVideo.playlist].push(newVideo);
        }
      } else {
        newPlaylist[newVideo.playlist] = [newVideo];
      }
      return newPlaylist;
    });
  };

  const context = {
    playlists: playlists,
    insertVideos: insertVideosHandler,
    inserOneVideo: inserOneVideoHandler,
  };

  return (
    <PlaylistContext.Provider value={context}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
