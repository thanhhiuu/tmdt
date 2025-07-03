import instance from '../axios';

export const apiOneProduct = (uid) =>
  instance({
    url: `/product/getcurrent/${uid}`,
    method: 'get',
  });
