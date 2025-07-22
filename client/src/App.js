import { Routes, Route } from 'react-router-dom';
import path from './ultils/path';
import {
  Home,
  Public,
  Login,
  Product,
  Blog,
  Services,
  Faq,
  FinalRegister,
  KycPassword,
} from './pages/public';
import { getCategories } from './app/apps/appAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="App font-Poppins">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT__PID__TITLE} element={<Product />} />
          <Route path={path.PRODUCT} element={<Product />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.SERVICES} element={<Services />} />
          <Route path={path.FAQS} element={<Faq />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINALREGISTER} element={<FinalRegister />} />
        <Route path={path.KYCPASSWORD} element={<KycPassword />} />
      </Routes>
    </div>
  );
}

export default App;
