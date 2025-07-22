import instance from '../axios';
export const apiLogin = (data) =>
  instance({
    url: `/user/login`,
    method: 'post',
    data,
    withCredentials: true,
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiRegister = (userData) =>
  instance({
    url: `/user/register`,
    method: 'post',
    data: userData,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiKycRegister = (token) =>
  instance({
    url: `/user/verify-email/${token}`,
    method: 'get',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, // Nếu dùng JWT
    },
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiLogout = () =>
  instance({
    url: `/user/logout`,
    method: 'post',

    withCredentials: true,
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiKycEmailPassword = (email) =>
  instance({
    url: `/user/reset-password`,
    method: 'post',
    data: { email },
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, // Nếu dùng JWT
    },
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
export const apiResetPassword = (token, newpassword) =>
  instance({
    url: `/user/verify-password/${token}`,
    method: 'PUT',
    data: { password: newpassword },
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, // Nếu dùng JWT
    },
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(data),
  });
