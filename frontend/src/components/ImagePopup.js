function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_picture ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay' onClick={props.onClose} />
      <div className='popup__container popup__container_type_picture'>
        <img
          src={props.card.link}
          alt={props.card.name}
          className='popup__picture'
        />
        <p className='popup__picture-caption'>{props.card.name}</p>
        <button
          type='button'
          className='close-button close-button_type_picture'
          aria-label='close button'
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
