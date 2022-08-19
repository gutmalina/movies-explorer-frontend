import { moviesURL } from "./constants";

export class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  /** проверить ответ */
  _checkResponse(res){
    return (res.ok) ? res.json() : Promise.reject(res.status)
  }

  /** получить карточки с сервера */
  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

const moviesApi = new Api({
  baseUrl: `${moviesURL}`,
  // baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
