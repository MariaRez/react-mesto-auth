import React from "react";
import logo from "../../images/Vector.svg";
import * as auth from "../../auth";
import './Register.css'; //проверить ссылку

function Register (props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegisterEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleRegisterPassword(evt) {
    setPassword(evt.target.value)
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
    <h3 className="">{props.title}</h3>
    <form name="register" className="form form_place_register" onSubmit={handleSubmit} noValidate>
        <input type="email"></input>
        <input></input>
        <button></button>
    </form>
   </div>
   )
}

export default Register;