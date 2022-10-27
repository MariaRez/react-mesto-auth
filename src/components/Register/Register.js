import React from "react";
import { auth } from "../../utils/auth";
import "./Register.css";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegisterEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleRegisterPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
      .register(email, password)
      .then((res) => props.handleRegister(res))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register">
      <h3 className="register__title">{props.title}</h3>
      <form
        name="register"
        className="form form_place_register"
        onSubmit={handleSubmit}
      >
        <input
          className="form__field"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleRegisterEmail}
        />
        <input
          className="form__field"
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"
          required
          minLength="2"
          maxLength="40"
          value={password}
          onChange={handleRegisterPassword}
        />
        <button className="form__button" type="submit">
          {props.buttonText}
        </button>
      </form>
      <div className="register__signin">
        <p className="">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="signin__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;