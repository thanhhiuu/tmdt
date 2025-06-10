import RouterUsers from '../routers/user.js';
import RouterProducts from '../routers/product.js';
import RouterproductCategory from '../routers/productCategory.js';
import RouterblogCategory from '../routers/blogCategory.js';
import RouterBlog from '../routers/blog.js';
import RouterBrand from '../routers/brand.js';
import RouterCoupons from '../routers/coupons.js';
import RouterOther from '../routers/other.js';
const initRouter = (app) => {
  app.use('/api/user', RouterUsers);
  app.use('/api/product', RouterProducts);
  app.use('/api/product-category', RouterproductCategory);
  app.use('/api/blog-category', RouterblogCategory);
  app.use('/api/blog', RouterBlog);
  app.use('/api/brand', RouterBrand);
  app.use('/api/coupons', RouterCoupons);
  app.use('/api/other', RouterOther);
};

export default initRouter;
