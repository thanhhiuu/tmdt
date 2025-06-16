/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { Routes, Route } from 'react-router-dom';
import path from './ultils/path';
import { Home, Public, Login } from './pages/public';
import { getCategories } from './app/appAction';
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
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
