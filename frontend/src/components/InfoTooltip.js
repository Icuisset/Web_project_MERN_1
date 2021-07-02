function InfoTooltips(props) {
    return (
      <div
        className={`popup popup_type_${props.popupName} ${
          props.isOpen && "popup_opened"
        }`}>
        <div className='popup__overlay' onClick={props.onClose} />
        <div
          className={`popup__container popup__container_type_${props.popupName}`}>
         <div className={props.isSuccessful ? 'popup__icon popup__icon_type_valid' : 'popup__icon popup__icon_type_invalid'}></div>
         <p className='popup__message'>{props.isSuccessful ? 'Success: you have now been registered.' : 'Oops, something went wrong! Please try again.'}</p>
         <button
          type='button'
          className='close-button close-button_type_editProfile'
          aria-label='close button'
          onClick={props.onClose}
        />
        </div>
      </div>
    );
  }
  
  export default InfoTooltips;
  