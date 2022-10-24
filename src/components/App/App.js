import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { api } from "../../utils/Api";
import auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api 
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([initialCards]) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);


  function checkToken() {
    if (localStorage.getItem('token')) {
      auth.checkToken(localStorage.getItem('token'))
        .then(res => {
          const {_id, email} = res.data;
          setLoggedIn(true);
          history.push("/");
        })
    }
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    console.log("Открыли попап для изменения аватара");
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    console.log("Открыли попап для изменения профиля");
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    console.log("Открыли попап для добавления новой карточки");
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    console.log("Открыли попап большой картинки");
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((prevValue)=>{return prevValue.map((c) => c._id === card._id ? newCard : c)});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevValue)=> prevValue.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(res) { ///// некорректно работает - исправить
    if (res.token) {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      history.push("/");
    }
    else {
      console.log(res);
    }
  }

  function handleRegisterSubmit(res) { ////// некорректно работает - исправить
    if (res.data) {
      setStatus("success");
      setTooltipPopupOpen(true);
      setTimeout(() => {
        setTooltipPopupOpen(false);
        history.push("/sign-in");
      }, 1500);
    }
    else {
      setStatus("wrong");
      setTooltipPopupOpen(true);
    }        
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Switch>
           <Route path="/sign-in">
            <Login 
            title="Вход" 
            buttonText="Войти"
            handleLogin={handleLoginSubmit}
            />
           </Route>
           <Route path="/sign-up">
            <Register 
            title="Регистация" 
            buttonText="Зарегистироваться"
            handleRegister={handleRegisterSubmit}
            />
           </Route>
           <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
           />
          </Switch>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>
          <ImagePopup 
            onClose={closeAllPopups} 
            card={selectedCard} 
            />
          <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          status={status}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;