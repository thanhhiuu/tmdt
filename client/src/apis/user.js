import instance from '../axios';
export const apiLogin = (data) =>
  instance({
    url: `/user/login`,
    method: 'post',
    data,
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiRegister = (data) =>
  instance({
    url: `/user/register`,
    method: 'post',
    data,
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
