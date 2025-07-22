import React, { useCallback } from 'react';
import icons from '../../ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { store } from '../../app/store';
import * as apis from '../../apis/user';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
const HeaderTop = () => {
  const state = store.getState();
  const { userData } = state.user;
  // console.log('data', userData);
  const { PiUserCheckLight } = icons;

  const navigate = useNavigate();
  const handlerLogout = useCallback(async (req, res) => {
    const reponse = await apis.apiLogout();
    if (!reponse) navigate(`/${path.LOGIN}`);
    if (reponse.message === true) {
      Toastify({
        text: `🎉 Đăng xuất thành công !`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          fontWeight: 'bold',
        },
      }).showToast();
      navigate(`/${path.LOGIN}`);
    }
  }, []);

  return (
    <>
      {' '}
      <div className="flex w-main items-center justify-between">
        <div className="cursor-pointer text-[12px] hover:text-white outline-none">
          ORDER ONLINE OR CALL US (+84) 93074090
        </div>
        <div className="flex justify-center items-center gap-2 text-[12px] ">
          <span className="cursor-pointer  hover:text-white outline-none">
            {!userData ? (
              <Link to={path.LOGIN}> Sign In or Create Account</Link>
            ) : (
              <div className="uppercase">
                {userData?.firstname + ' ' + userData?.lastname}
              </div>
            )}
          </span>
          <span className="hover:text-white cursor-pointer ">
            {!userData ? (
              <PiUserCheckLight />
            ) : (
              <Link onClick={() => handlerLogout()}>Logout</Link>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
