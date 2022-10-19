class Auth {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    register(email, password) {
      //регистрация нового пользователя
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({email, password}),
      })
        .then((res) => {
          try {
            if (res.status === 201) {
              return res.json();
            } else if (res.status === 400) {
              return res
                .json()
                .then((res) => {
                  if (res.error) return res.error;
                  else return "Некорректно заполнено одно из полей";
                })
                .catch((err) => console.log(err));
            } else return "Что-то пошло не так! Попробуйте ещё раз.";
          } catch (evt) {
            return evt;
          }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => console.log(err));
    }
  
    authorize(email, password) {
      //вход зарегистрированового пользователя
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({email, password}),
      })
        .then((res) => {
          try {
            if (res.status === 200) {
              return res.json();
            } else if (res.status === 400)
              return "Некорректно заполнено одно из полей";
            else if (res.status === 401)
              return "Пользователь с таким email не найден";
            else return "Что-то пошло не так! Попробуйте ещё раз";
          } catch (e) {
            return e;
          }
        })
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
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
      })
        .then((res) => res.json())
        .then((data) => data);
    }
  }
  
  const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default auth;  