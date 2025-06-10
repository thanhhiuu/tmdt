import { Routes, Route } from 'react-router-dom';
import path from './ultils/path';
import { Home, Public, Login } from './pages/public';
function App() {
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
