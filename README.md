
# Mvault Authentifaction

mvault Authentifaction is a system that facilitate you developing secure
services like login, changing password, resetting password...
bellow you'll find more details.


## API Reference

#### Login

```http
  auth.login({ username, password, provider, rememberMe })
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.|
| `password` | `string` | **Required**.|
| `provider` | `string` | **Optional**.|
| `rememberMe` | `string` | **Optional**.|

#### Sign Up
```http
  auth.SignUp(displayName, email, phone, passwordConfirmation, password)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `displayName` | `string` | **Required**.|
| `email` | `string` | **Required**.|
| `phone` | `int` | **Required**.|
| `password` | `string` | **Required**.|
| `passwordConfirmation` | `string` | **Required**.|

#### Login By Provider
```http
  auth.LoginByProvider({ provider, token })
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `provider` | `string` | **Required**.|
| `token` | `string` | **Required**.|

#### fetch a User
```http
  auth.fetchUser(scopes)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `scopes` | `string` | **Required**.|

#### Authenticated
```http
  auth.isAuthenticated()
```
##### return true if the user is Authenticated otherwise false

#### Get Token

```http
  auth.getToken()
```


#### Update User
```http
  auth.UpdateUser(token, Username, phone, email, customer)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.|
| `username` | `string` | **Required**.|
| `phone` | `int` | **Required**.|
| `email` | `string` | **Required**.|
| `customer` | `string` | **Required**.|

#### Update Password
```http
  auth.UpdatePassword(token, Currentpassword, Newpassword, Confirmpassword)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.|
| `Currentpassword` | `string` | **Required**.|
| `Newpassword` | `string` | **Required**.|
| `Confirmpassword` | `string` | **Required**.|


#### Reset Password

```http
  auth.ResetPassword(email, phone)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.|
| `phone` | `int` | **Required**.|


#### change Password

```http
  auth.changePassword(code, password, email, phone)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `code` | `int` | **Required**.|
| `password` | `string` | **Required**.|
| `email` | `string` | **Required**.|
| `phone` | `int` | **Required**.|
