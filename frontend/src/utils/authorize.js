class Authorize {
  constructor({
    baseUrl
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


  //POST https://around.nomoreparties.co/signup
  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._checkResponse(res))
  }

  //POST https://around.nomoreparties.co/signin
  authorizeWithToken(email, password) {
    return fetch(this._baseUrl + '/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data
        }
      })
  }

  //GET https://around.nomoreparties.co/users/me
  checkTokenIsValid(jwt) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => this._checkResponse(res))
  }
}


const authorize = new Authorize({
  baseUrl: 'https://register.nomoreparties.co',
})

export default authorize;