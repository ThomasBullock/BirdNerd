//const baseUrl = PRODUCTION ? 'https://api.birdnerd.com/api/' : 'https://testing.birdnerd.com/api/';
const baseUrl = 'http://localhost:3000/api/';

export const GET = (url) => {
  return fetch(baseUrl + url, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(res => res)
};

export const POST = (url, body) => {
  return fetch(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const PUT = (url, body) => {
  return fetch(baseUrl + url, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const DELETE = (url) => {
  return fetch(baseUrl + url, {
    method: 'DELETE',
  })
  .then(res => res)
};
