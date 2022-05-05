// create User class
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default class User {
  constructor(data) {
    if (data) {
      this._id = data._id;
      this.email = data.email;
      this.email_verified = data.email_verified;
      this.phone_verified = data.phone_verified;
      this.phone = data.phone;
      this.displayName = data.displayName;
      this.image = data.image;
      this.firstName = data.firstName;
      this.maidenName = data.maidenName;
      this.middleName = data.middleName;
      this.lastName = data.lastName;
      this.roles = data.roles;
    }
  }
  Login(username, password, rememberMe) {
    return new Promise((resolve, reject) => {
      if (username && password) {
        // login
        fetch("https://api.mvault.one/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password,
            rememberMe: rememberMe
          })
        })
          .then((res) => res.json())
          .then((data) => {
            // set user token
            setCookie("token", data.token, rememberMe ? 180 : 1);
            // resolve
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error('Username and password are required'));
      }
    });
  }
  SignUp(displayName, email, phone, passwordConfirmation, password) {
    return fetch("https://api.mvault.one/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        displayName: displayName,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        phone: phone,
      }),
    }).then((response) => {
      return response.json()
    });
  };
  LoginByProvider (provider, token) {
    return fetch("https://api.mvault.one/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        provider: provider,
        token: token,
      }),
    }).then((response) => {
      console.log(response.data);
    });
  }
  getUser() {
    return this;
  }
  fetchUser(scopes) {
    const token = getCookie("token");
    return new Promise((resolve, reject) => {
      fetch("https://api.mvault.one/auth/user?" + new URLSearchParams(scopes), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Scopes": scopes,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
          } else {
            this._id = data._id;
            this.email = data.email;
            this.email_verified = data.email_verified;
            this.phone_verified = data.phone_verified;
            this.phone = data.phone;
            this.displayName = data.displayName;
            this.image = data.image;
            this.firstName = data.firstName;
            this.maidenName = data.maidenName;
            this.middleName = data.middleName;
            this.lastName = data.lastName;
            this.roles = data.user.roles;
            resolve(this);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  isAuthenticated() {
    return !!getCookie("token");
  }
  getToken() {
    return getCookie("token");
  }
  UpdateUser(token, Username, phone, email) {
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": token.token
      }
    }
    return fetch("https://api.mvault.one/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        displayName: Username,
        email: email,
        phone: phone,
      }),
    }).then((response) => {
      return response.json()
    });

  }
  UpdatePassword(token, Currentpassword, Newpassword, Confirmpassword) {
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": token.token
      }
    }
    return fetch("https://api.mvault.one/auth/user/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        oldPassword: Currentpassword,
        newPassword: Newpassword,
        newPasswordConfirm: Confirmpassword
      }),
    }).then((response) => {
      return response.json()
    });

  }
  RestPassword(email, phone) {
    return fetch("https://api.mvault.one/auth/user/sendReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        phone: phone
      }),
    }).then((response) => {
      return response.json()
    });

  }
  VerifyCode(email) {
    return fetch("https://api.mvault.one/auth/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        email: email,
      }),
    }).then((response) => {
      return response.json()
    });

  }
  changePassword(code, password, email) {
    return fetch("https://api.mvault.one/auth/user/changePwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        code: code,
        email: email,
        password: password

      }),
    }).then((response) => {
      return response.json()
    });
  }
}
