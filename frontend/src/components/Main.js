import React, { useState, useEffect } from "react";
import UserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "./Card";
import Header from "./Header";

function Main(props) {
  const user = React.useContext(UserContext);

  return (
    <>
      <Header
        userEmail={props.userEmail}
        link={"/signin"}
        message={"Log Out"}
        onClick={props.onLogOut}></Header>
      <main>
        <section className='profile page-container'>
          <div className='profile-card'>
            <div
              className='avatar'
              onClick={props.onEditAvatar}
              style={{ backgroundImage: `url(${user.avatar})` }}>
              <div className='avatar-hover' />
            </div>
            <div className='profile__info'>
              <h1 className='profile__name'>{user.name}</h1>
              <button
                type='button'
                className='edit-button'
                aria-label='edit button'
                onClick={props.onEditProfile}
              />
              <p className='profile__about'>{user.about}</p>
            </div>
          </div>
          <button
            type='button'
            className='add-button'
            aria-label='add button'
            onClick={props.onAddPlace}
          />
        </section>
        <section className='page-container'>
          <ul className='elements'>
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
