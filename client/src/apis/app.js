import instance from '../axios';

const apiGetCategories = () =>
  instance({
    url: '/product-category/all',
    method: 'get',
  });
export default apiGetCategories;
