import { useState } from "react";
import useInput from "../../hooks/use-input";
import { StyledRegisterVideo } from "./styles";
import { videoService } from "../../services/videoService";

// When you have the error "Form submission canceled because the form is not connected"
// is because every button inside a form is of type submit, so you have to change the type to just "button"
const RegisterVideo = () => {
  const service = videoService();
  const [formIsVisible, setFormIsVisible] = useState(false);
  const isNotEmpty = (value) => value.trim() !== "";
  const hasMinLength = (value) => value.length > 5;
  const isValidYouTubeUrl = (value) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = value.match(regExp);
    if (match && match[2].length == 11) {
      return true;
    } else {
      return false;
    }
  };

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput([hasMinLength]);

  const {
    value: urlValue,
    isValid: urlIsValid,
    hasError: urlHasError,
    valueChangeHandler: urlChangeHandler,
    inputBlurHandler: urlBlurHandler,
    reset: resetUrl,
  } = useInput([isNotEmpty, isValidYouTubeUrl]);

  const {
    value: playlistValue,
    isValid: playlistIsValid,
    hasError: playlistHasError,
    valueChangeHandler: playlistChangeHandler,
    inputBlurHandler: playlistBlurHandler,
    reset: resetPlaylist,
  } = useInput([isNotEmpty]);

  let video_id;
  let thumbValue;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlValue.match(regExp);
  if (match && match[2].length == 11) {
    video_id = match[2];
    thumbValue = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  }

  let formIsValid = false;

  if (titleIsValid && urlIsValid && playlistIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    let newVideo = {
      title: titleValue,
      url: urlValue,
      thumb: thumbValue,
      playlist: playlistValue.toLowerCase(),
    };

    service
      .insertVideo(newVideo)
      .then(() => {
        setFormIsVisible(false);
        resetTitle();
        resetUrl();
        resetPlaylist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormIsVisible(true)}>
        +
      </button>
      {formIsVisible && (
        <form onSubmit={submitHandler}>
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormIsVisible(false)}
            >
              X
            </button>
            <input
              placeholder="Título do video"
              name="title"
              value={titleValue}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
            {titleHasError && <p>Please enter a valid title</p>}
            <input
              placeholder="URL"
              name="url"
              value={urlValue}
              onChange={urlChangeHandler}
              onBlur={urlBlurHandler}
            />
            {urlHasError && <p>Please enter a valid url</p>}
            {thumbValue && <img src={thumbValue} />}
            <input
              placeholder="Playlist"
              name="playlist"
              value={playlistValue}
              onChange={playlistChangeHandler}
              onBlur={playlistBlurHandler}
            />
            {playlistHasError && <p>Playlist name can't be empty</p>}
            <button type="submit" disabled={!formIsValid}>
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
};

export default RegisterVideo;
