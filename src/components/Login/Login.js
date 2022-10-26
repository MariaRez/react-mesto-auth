import React from "react";
import { auth } from "../../utils/auth";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleLoginPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
    .authorize(email, password)
    .then(res => props.handleLogin(res, email))
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="login">
      <h3 className="login__title">{props.title}</h3>
      <form
        name="login"
        className="form form_place_login"
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
          onChange={handleLoginEmail}
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
          onChange={handleLoginPassword}
        />
        <button className="form__button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default Login;