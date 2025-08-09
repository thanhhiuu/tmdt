import instance from '../axios';

export const apiGetOneBlog = (bid) =>
  instance({
    url: `/blog/current/${bid}`,
    method: 'get',
  });
