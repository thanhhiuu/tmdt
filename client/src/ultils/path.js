const path = {
  PUBLIC: '/',
  HOME: '',
  LOGIN: 'login',

  BLOG: 'blog',
  BLOG__TITLE: 'blog/:bid/:title',
  SERVICES: 'services',
  FAQS: 'faqs',
  PRODUCT__PID__TITLE: '/product/:uid/:title',
  PRODUCT: 'product',
  CATEGORY__CID__TITLE: ':category/:categoryId/:title',
  CATEGORY: ':category',
  FINALREGISTER: 'finalregister/:title',
  KYCPASSWORD: 'verify-password/:token',
};

export default path;
