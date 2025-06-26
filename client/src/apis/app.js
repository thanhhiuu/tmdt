import instance from '../axios';

export const apiGetCategories = () =>
  instance({
    url: '/product-category/all',
    method: 'get',
  });
export const apiProduct = () =>
  instance({
    url: '/product/getall',
    method: 'get',
  });
export const apiSort = (params) =>
  instance({
    url: `/product/get`,
    method: 'get',
    params: params,
  });
export const apiBlog = (params) =>
  instance({
    url: `/blog/getall`,
    method: 'get',
    params: params,
  });
