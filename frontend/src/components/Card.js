import React from "react";
import UserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const user = React.useContext(UserContext);

  /**
   * control visibility of delete button
   */
  const isUserCard = props.card.owner._id === user._id;
  const visibilityState = isUserCard ? "visible" : "hidden";

  /**
   * control style of like icon
   */
  const isLikedbyUser = props.card.likes.some((like) => like._id === user._id);
  const cardLikeClassName = `${
    isLikedbyUser ? "like-button like-button_activated" : "like-button"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className='element'>
      <img
        src={props.card.link}
        alt={props.card.name}
        className='element__image'
        onClick={handleClick}
      />
      <button
        type='button'
        className='delete-button'
        style={{ visibility: visibilityState }}
        aria-label='delete button'
        onClick={handleCardDelete}
      />
      <div className='element__title-zone'>
        <h2 className='element__title'>{props.card.name}</h2>
        <div className='element__like-zone'>
          <button
            type='button'
            className={cardLikeClassName}
            aria-label='like button'
            onClick={handleLikeClick}
          />
          <p className='element__like-count'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
