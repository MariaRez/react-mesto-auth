class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _сheckServerResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    //регистрация нового пользователя
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then(this._сheckServerResponseStatus);
  }

  authorize(email, password) {
    //вход зарегистрированового пользователя
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then(this._сheckServerResponseStatus);
  }

  checkToken(token) {
    //проверка валидности токена
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._сheckServerResponseStatus);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});