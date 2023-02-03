const user = { token: null };

export function setToken(token) {
  user.token = token;
}

export function getToken() {
  return user.token;
}

export function logOut(){
  user.token = null
  console.log(user.token);
}
