import axios from 'axios';

const API_KEY = 'AIzaSyA8RdemieLSIcjQSlU9qCU8-UoBxUIfINs';

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  // try {
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return response.data.idToken;
  // } catch (error) {
  //   return { code: 500, message: 'login error', data: null };
  // }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}
export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
