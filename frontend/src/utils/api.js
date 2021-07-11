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


  //GET https://www.api.theworldaround.co.uk/cards
  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // GET https://www.api.theworldaround.co.uk/users/me
  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PATCH https://www.api.theworldaround.co.uk/users/me
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

  // POST https://www.api.theworldaround.co.uk/cards
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

  // DELETE https://www.api.theworldaround.co.uk/cards/cardId
  deleteCard(id, token) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PUT https://www.api.theworldaround.co.uk/cards/cardId/likes
  addCardLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // DELETE https://www.api.theworldaround.co.uk/cards/cardId/likes
  removeCardLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res))
  }

  // PATCH www.api.theworldaround.co.uk/users/me/avatar
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
  baseUrl: 'https://www.api.theworldaround.co.uk',
})

export default api;

