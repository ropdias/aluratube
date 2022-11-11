import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
const useForm = (props) => {
  const [values, setValues] = useState(props.initialValues);

  const valueChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value, // ["title"] = "teste" ---> { title: "teste" }
      };
    });
  };

  const clearForm = () => {
    setValues({ title: "", url: "" });
  };

  return {
    values,
    valueChangeHandler: valueChangeHandler,
    clearForm: clearForm,
  };
};

// When you have the error "Form submission canceled because the form is not connected"
// is because every button inside a form is of type submit, so you have to change the type to just "button"
const RegisterVideo = () => {
  const formRegisterVideo = useForm({ initialValues: { title: "", url: "" } });
  const [formIsVisible, setFormIsVisible] = useState(false);

  let video_id;
  let thumb;
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = formRegisterVideo.values.url.match(regExp);
  if (match && match[2].length == 11) {
    video_id = match[2];
    thumb = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  }

  const isNotEmpty = (value) => value.trim() !== "";
  const hasMinLength = (value, length) => value.length > length;

  let titleIsValid = false;
  let urlIsValid = false;
  let formIsValid = false;

  if (
    isNotEmpty(formRegisterVideo.values.title) &&
    hasMinLength(formRegisterVideo.values.title, 5)
  ) {
    titleIsValid = true;
  }

  if (video_id) {
    urlIsValid = true;
  }

  if (titleIsValid && urlIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setFormIsVisible(false);
    formRegisterVideo.clearForm();
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
              value={formRegisterVideo.values.title}
              onChange={formRegisterVideo.valueChangeHandler}
            />
            {!titleIsValid && <p>Please enter a valid title</p>}
            <input
              placeholder="URL"
              name="url"
              value={formRegisterVideo.values.url}
              onChange={formRegisterVideo.valueChangeHandler}
            />
            {!urlIsValid && <p>Please enter a valid url</p>}
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
