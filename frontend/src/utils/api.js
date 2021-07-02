class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`)
  }


  //GET https://around.nomoreparties.co/v1/group-7/cards
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  // GET https://around.nomoreparties.co/v1/group-7/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me
  editUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res))
  }

  // POST https://around.nomoreparties.co/v1/group-7/cards
  postNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/cardId
  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  // PUT https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  addCardLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  removeCardLike(id) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res))
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me/avatar
  editUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-7',
  headers: {
    authorization: '9df52f9f-cc17-4475-93ad-607c569a3f4b',
    'Content-Type': 'application/json',
  },
})

export default api;

