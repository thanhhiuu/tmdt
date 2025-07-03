/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import loginimg from '../../assets/Login.jpg';
import { InputForm, Button } from '../../components';
import * as apis from '../../apis/user';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { useDispatch } from 'react-redux';
import { login } from '../../app/user/userSlice';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
const Login = () => {
  const [payload, setPayload] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    mobile: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const handlerSubmit = useCallback(async () => {
    try {
      if (isShow) {
        // Xử lý đăng ký
        const reponse = await apis.apiRegister(payload);
        console.log('ok', reponse);
        if (reponse?.message === false) {
          Toastify({
            text: `🎉 Đăng ký không thành công! ${reponse?.error}`,
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              fontWeight: 'bold',
            },
          }).showToast();
          navigate(`/${path.LOGIN}`);
          setIsShow(true);
        } else {
          Toastify({
            text: '🎉 Hãy kiểm tra email chúng tôi đã gửi link xác thực tài khoản của bạn !.',
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              fontWeight: 'bold',
            },
          }).showToast();

          setIsShow(false);
        }
      } else {
        // Xử lý đăng nhập
        const rs = await apis.apiLogin(payload);
        console.log(rs);
        dispatch(
          login({
            userData: rs.userData,
            isLoggedin: true,
            token: rs.accessToken,
          })
        );
        if (rs?.message === false) {
          Toastify({
            text: `🎉 Đăng nhập không thành công! . ${rs?.error}`,
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              fontWeight: 'bold',
            },
          }).showToast();
          navigate(`/${path.LOGIN}`);
          setIsShow(false);
        } else {
          Toastify({
            text: '🎉 Hãy kiểm tra email chúng tôi đã gửi link xác thực tài khoản của bạn !.',
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              fontWeight: 'bold',
            },
          }).showToast();

          setIsShow(false);
        }
      }
    } catch (error) {
      // Xử lý lỗi
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra!';
      Toastify({
        text: `❌ ${errorMessage}`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(135deg, #FF5252, #D32F2F)',
          fontWeight: 'bold',
        },
      }).showToast();
    }
  }, [payload, isShow, dispatch, navigate]);
  return (
    <>
      <div className="w-full h-screen relative">
        <img
          src={loginimg}
          alt="BackGround"
          className=" h-screen w-full object-cover"
        />
      </div>
      <div className="absolute  top-0 right-0 bottom-0 left-1/2 flex flex-col justify-center items-center">
        <div className="border px-4 flex flex-col justify-start items-center w-max h-max  bg-main/70  shadow-xl rounded-lg ">
          {' '}
          <span className="uppercase text-[20px] font-bold text-main tracking-wider pt-3">
            {isShow ? 'Create Account' : 'Login'}
          </span>
          <span className="w-full flex flex-col items-center justify-center">
            {' '}
            {isShow && (
              <InputForm
                nameKey={'lastname'}
                value={payload.lastname}
                setValue={setPayload}
              />
            )}
            {isShow && (
              <InputForm
                nameKey={'firstname'}
                value={payload.firstname}
                setValue={setPayload}
              />
            )}
            <span className="w-full flex flex-col justify-center items-center">
              {' '}
              <InputForm
                nameKey={'email'}
                value={payload.email}
                setValue={setPayload}
              />
              {isShow && (
                <InputForm
                  nameKey={'mobile'}
                  value={payload.mobile}
                  setValue={setPayload}
                />
              )}
              <InputForm
                nameKey={'password'}
                value={payload.password}
                type={'password'}
                setValue={setPayload}
              />
            </span>
          </span>
          <span className="w-full flex items-center justify-center py-5">
            <Button
              name={isShow ? 'Register ' : 'Login'}
              handlerOnClick={handlerSubmit}
            />
          </span>
          <span className="w-full flex items-center justify-between py-3">
            {!isShow && (
              <p className="text-[13px] hover:underline cursor-pointer">
                Forgot your password?
              </p>
            )}
            <p
              className="text-[13px] hover:underline  cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            >
              {!isShow ? 'Create Account' : 'Go Login'}
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
