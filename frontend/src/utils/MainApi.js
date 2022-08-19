export class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  /** проверить ответ */
  _checkResponse(res){
    return (res.ok) ? res.json() : Promise.reject(res.status)
  }

  /** установить заголовок */
  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      ...this._headers,
    };
  }

  /** получить данные профиля с сервера */
  getProfile(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** отправить на сервер новые данные профиля */
  editProfile(email, name){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        email,
        name
      })
    })
    .then(this._checkResponse)
  }

  /** получить сохраненные фильмы с сервера */
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** сохранить фильм на сервере */
  createMovie(movie){
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      })
    })
    .then(this._checkResponse)
  }

  /** удалить фильм на сервере */
  deleteMovie(id){
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  // /** добавить like */
  // addLike(id){
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: 'PUT',
  //     headers: this._getHeaders(),
  //   })
  //   .then(this._checkResponse)
  // }

  // /** удалить like */
  // deleteLike(id){
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: 'DELETE',
  //     headers: this._getHeaders(),
  //   })
  //   .then(this._checkResponse)
  // }

}

const mainApi = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;