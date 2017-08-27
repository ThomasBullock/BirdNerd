//const baseUrl = PRODUCTION ? 'https://api.birdnerd.com/api/' : 'https://testing.birdnerd.com/api/';
const baseUrl = 'http://localhost:3001/api/';

export const GET = (url) => {
  const token = window.sessionStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  })
  .then(res => res.json())
  .then(res => res)
};

export const POST = (url, body) => {
  const token = window.sessionStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const PUT = (url, body) => {
  const token = window.sessionStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const DELETE = (url) => {
  const token = window.sessionStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: 'DELETE',
  })
  .then(res => res)
};

export const POSTBIRD = (body) => {
  return fetch('https://api.cloudinary.com/v1_1/faiz/image/upload', {
    method: 'POST',
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    body: body
  })
  .then(res => res.json())
  .then(res =>  {
    console.log(res);
    return res;
  })
}