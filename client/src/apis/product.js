import instance from '../axios';

export const apiOneProduct = (uid) =>
  instance({
    url: `/product/getcurrent/${uid}`,
    method: 'get',
  });
export const apiAllProduct = (flag) =>
  instance({
    url: `/product/get`,
    method: 'get',
  });
export const apiParamProduct = (params) =>
  instance({
    url: `/product/get`,
    method: 'get',
    params: params,
  });
