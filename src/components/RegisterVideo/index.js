import { useState } from "react";
import useInput from "../../hooks/use-input";
import { StyledRegisterVideo } from "./styles";

// When you have the error "Form submission canceled because the form is not connected"
// is because every button inside a form is of type submit, so you have to change the type to just "button"
const RegisterVideo = () => {
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

  let video_id;
  let thumb;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlValue.match(regExp);
  if (match && match[2].length == 11) {
    video_id = match[2];
    thumb = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  }

  let formIsValid = false;

  if (titleIsValid && urlIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log({ title: titleValue, url: urlValue, thumb: thumb });

    setFormIsVisible(false);
    resetTitle();
    resetUrl();
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
            {thumb && <img src={thumb} />}
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
