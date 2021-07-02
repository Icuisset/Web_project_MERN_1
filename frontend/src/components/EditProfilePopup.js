import React, { useState } from "react";
import UserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const user = React.useContext(UserContext);

  React.useEffect(() => {
    setName(user.name);
    setAbout(user.about);
  }, [user, props.isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  };

  return (
    <PopupWithForm
      popupName='editProfile'
      title='Edit Profile'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        id='profileName'
        type='text'
        className='popup__input popup__input_value_name'
        placeholder='Name'
        name='profileNameInput'
        value={name || ''}
        onChange={handleNameChange}
        required
        minLength={2}
        maxLength={40}
      />
      <span id='profileName-error' className='popup__error' />
      <input
        id='profileAbout'
        type='text'
        className='popup__input popup__input_value_about'
        placeholder='About Me'
        name='profileAboutInput'
        value={about || ''}
        onChange={handleAboutChange}
        required
        minLength={2}
        maxLength={200}
      />
      <span id='profileAbout-error' className='popup__error' />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
