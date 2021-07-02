import React, { useState, useEffect } from "react";
import UserContext from "../contexts/CurrentUserContext";
import { Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "../index.css";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import authorize from "../utils/authorize";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const history = useHistory();

  /**
   * initial call to api to get user information
   */

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * initial call to api to get all cards from api
   */

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * handle all general click actions
   */

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  /**
   * handle the closing of all popups
   */

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    console.log("popup closed");
  };

  /**
   * handle updates to the api after collecting inputs from form popups
   */

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo(name, about)
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editUserAvatar(avatar)
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ title, link }) => {
    console.log(title, link);
    api
      .postNewCard(title, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle updates to the api after actions on cards
   */

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked === false) {
      api
        .addCardLike(card._id)
        .then((newCard) => {
          console.log(newCard);
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((result) => {
        console.log(result);
        const newCards = cards.filter((c) => c._id !== card._id);
        console.log(newCards);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle user registration
   */

  const handleSignUp = ({ email, password }) => {
    authorize
      .register(email, password)
      .then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
          setUserEmail(email);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * handle user authorization with token
   */

  const handleSignIn = ({ email, password }) => {
    authorize
      .authorizeWithToken(email, password)
      .then((result) => {
        console.log(result);
        if (result.statusCode === 401) {
          console.log(result);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        }
        const JWT = localStorage.getItem("jwt");
        if (JWT) {
          handleCheckTokenIsValid(JWT);
        }
        setUserEmail(email);
        console.log(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * check token is valid and return user id and email
   */

  const handleCheckTokenIsValid = (JWT) => {
    authorize
      .checkTokenIsValid(JWT)
      .then((result) => {
        console.log(result);
        const thisUserEmail = result.data.email;
        setUserEmail(thisUserEmail);
        setIsLoggedIn(true);
        setIsSuccessful(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * handle auto login
   */

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");
    console.log(JWT);
    if (JWT) {
      handleCheckTokenIsValid(JWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * handle Log out
   */

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/signin'>
            <>
              <Header
                userEmail={""}
                link={"/signup"}
                message={"Sign up"}></Header>
              <Login onLogin={handleSignIn}></Login>
            </>
          </Route>
          <Route path='/signup'>
            <>
              <Header
                userEmail={""}
                link={"/signin"}
                message={"Log in"}></Header>
              <Register onRegistration={handleSignUp}></Register>
            </>
          </Route>
          <ProtectedRoute
            path='/'
            component={Main}
            loggedIn={isLoggedIn}
            userEmail={userEmail}
            onLogOut={handleLogOut}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}></ProtectedRoute>
        </Switch>
        <Footer></Footer>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={"save"}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={"save"}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        buttonText={"create"}
      />

      <PopupWithForm
        popupName='confirmDelete'
        title='Are you sure?'
        buttonText={"confirm"}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        popupName='tooltip'
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessful={isSuccessful}
      />
    </UserContext.Provider>
  );
}

export default App;
