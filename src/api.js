const baseUrl = (process.env.NODE_ENV === 'production') ? 'http://birdnerd.club/api/' : 'http://localhost:3001/api/';

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

export const DELETE = (url, body) => {
  const token = window.sessionStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body),
  })
  .then((res) => {
    console.log(res)
    return res
  })
};


export const POSTBIRD = (body) => {
  return fetch('https://api.cloudinary.com/v1_1/birdnerd/image/upload', {
    method: 'POST',
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    body: body
  })
  .then(res => res.json())
  .then(res =>  {
    return res;
  })
}

