import React from "react";
import * as auth from "../../utils/auth";
import "./Register.css"; //проверить ссылку

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
    props.onRegisterUser({
      email: email,
      password: password,
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
    </div>
  );
}

export default Register;