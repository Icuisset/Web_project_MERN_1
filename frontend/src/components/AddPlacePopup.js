import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddPlace({
      title,
      link,
    });
  };

  return (
    <PopupWithForm
      popupName='newPlace'
      title='New Place'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        id='placeTitle'
        type='text'
        className='popup__input popup__input_value_placeTitle'
        placeholder='Title'
        name='placeTitleInput'
        value={title}
        onChange={handleTitleChange}
        required
        minLength={1}
        maxLength={30}
      />
      <span id='placeTitle-error' className='popup__error' />
      <input
        id='placeLink'
        type='url'
        className='popup__input popup__input_value_placeImageLink'
        placeholder='Image link'
        name='placeImageLinkInput'
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span id='placeLink-error' className='popup__error' />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
