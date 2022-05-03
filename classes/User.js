// create User class
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
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
}
