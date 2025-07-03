/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
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
} from './pages/public';
import { getCategories } from './app/apps/appAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function App() {
  const dipatch = useDispatch();
  useEffect(() => {
    dipatch(getCategories());
  }, []);
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
      </Routes>
    </div>
  );
}

export default App;
