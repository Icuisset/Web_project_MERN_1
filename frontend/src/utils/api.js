class Api {
  constructor({
    baseUrl,
  }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`)
  }


  //GET https://around.nomoreparties.co/v1/group-7/cards
  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // GET https://around.nomoreparties.co/v1/group-7/users/me
  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me
  editUserInfo(name, about, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res))
  }

  // POST https://around.nomoreparties.co/v1/group-7/cards
  postNewCard(name, link, token) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/cardId
  deleteCard(id, token) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PUT https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  addCardLike(id, token) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://around.nomoreparties.co/v1/group-7/cards/likes/cardId
  removeCardLike(id, token) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PATCH https://around.nomoreparties.co/v1/group-7/users/me/avatar
  editUserAvatar(avatar, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://www.theworldaround.co.uk/api',
})

export default api;

