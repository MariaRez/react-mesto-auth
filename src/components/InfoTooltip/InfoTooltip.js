import React from "react";
import './InfoTooltip.css';
import success from '../../images/yes.svg';
import wrong from '../../images/no.svg';

function InfoTooltip(props) {
    const image = props.status ? success: wrong;
    const text = props.status
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте еще раз.";
    return (
        <div className={props.isOpen ? "popup popup_opened" : "popup"}>
            <div className="popup__container">
                <img className="popup__image" src={image} alt={text}/>
                <h3 className="popup__title">{text}</h3>
                <button
                aria-label="Close"
                className="popup__close-button popup__close-button_place_image"
                type="button"
                onClick={props.onClose}
                ></button>
            </div>
        </div>
    );
}

export default InfoTooltip;