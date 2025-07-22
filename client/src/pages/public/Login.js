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
  const [onOff, setOnOff] = useState(true);
  const [valueEmail, setValueEmail] = useState('');
  const [isShowReset, setIsShowReset] = useState(true);
  const [errors, setErrors] = useState({});
  const validation = async () => {
    const newError = {};
    if (isShow) {
      if (!payload.lastname.trim())
        newError.lastname = 'Vui lòng đừng bỏ trống !';
      if (!payload.firstname.trim())
        newError.firstname = 'Vui lòng đừng bỏ trống !';
      if (!payload.email.trim()) newError.email = 'Vui lòng đừng bỏ trống !';
      if (!payload.mobile.trim()) newError.mobile = 'Vui lòng đừng bỏ trống !';
      if (!payload.password.trim())
        newError.password = 'Vui lòng đừng bỏ trống !';
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(payload.email))
      newError.email = 'Email không đúng định dạng !';
    // if (!/^\d{10,11}$/.test(payload.mobile))
    //   newError.mobile = 'Số điện thoại phải gồm 10 số !';
    if (payload.password.length < 6)
      newError.password = 'Password phải lớn 6 chữ số !';

    return newError;
  };
  const handlerSubmit = useCallback(async () => {
    try {
      if (isShow) {
        const formError = await validation();
        if (Object.keys(formError).length > 0) {
          setErrors(formError);
          return;
        }
        setErrors({});
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
              background: 'linear-gradient(135deg, #FF5722, #E64A19)',
              fontWeight: 'bold',
            },
          }).showToast();

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
        const formError = await validation();
        if (Object.keys(formError).length > 0) {
          setErrors(formError);
          return;
        }
        setErrors({});
        const rs = await apis.apiLogin(payload);

        // console.log('rs', rs);
        // if (rs.message === false) {
        //   Toastify({
        //     text: `🎉 Bạn đang ở chế độ xem ! Nếu mua hàng vui lòng đăng nhập.`,
        //     duration: 3000,
        //     gravity: 'top',
        //     position: 'right',
        //     style: {
        //       background: 'linear-gradient(135deg, #FF5722, #E64A19)',
        //       fontWeight: 'bold',
        //     },
        //   }).showToast();
        // }
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
              background: 'linear-gradient(135deg, #FF5722, #E64A19)',
              fontWeight: 'bold',
            },
          }).showToast();
          setIsShow(false);
        } else {
          Toastify({
            text: '🎉 Đăng nhập thành công !.',
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
              background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
              fontWeight: 'bold',
            },
          }).showToast();
          navigate(`/${path.HOME}`);
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
  }, [payload, isShow, dispatch, navigate, onOff]);
  const handlerReset = useCallback(async () => {
    if (!isShowReset) {
      const reponse = await apis.apiKycEmailPassword(valueEmail);
      console.log('KYC', reponse);
      console.log(valueEmail);
      if (reponse.message === true) {
        Toastify({
          text: '🎉 Hãy kiểm tra email, chúng tôi đã gửi link để đổi mật khẩu của bạn của bạn !.',
          duration: 3000,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            fontWeight: 'bold',
          },
        }).showToast();
      } else {
        Toastify({
          text: '🎉 Email sai hoặc không tồn tại!.',
          duration: 3000,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            fontWeight: 'bold',
          },
        }).showToast();
      }
      console.log(reponse);
    }
  }, [isShowReset, valueEmail, onOff]);
  return (
    <>
      <div className="w-full h-screen relative">
        {isShowReset === false ? (
          <div
            className={`${
              onOff ? 'absolute' : 'hidden'
            } top-0 left-0 right-0 bottom-0 bg-opacity-50 flex items-center justify-center z-50 bg-opatitys`}
          >
            <div className="p-6 card flex flex-col items-center justify-center gap-6 w-full max-w-md bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-center text-xl font-semibold text-gray-800">
                VUI LÒNG NHẬP EMAIL ĐỂ ĐỔI MẬT KHẨU
              </h3>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={valueEmail}
                  onChange={(e) => {
                    console.log('Input value:', e.target.value);
                    setValueEmail(e.target.value);
                  }}
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>

              <Button
                name={'Gửi'}
                handlerOnClick={handlerReset}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              />

              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
                onClick={() => {
                  setOnOff(true);
                  setIsShowReset(true);
                }}
              >
                Quay lại
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
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
                error={errors.lastname}
              />
            )}
            {isShow && (
              <InputForm
                nameKey={'firstname'}
                value={payload.firstname}
                setValue={setPayload}
                error={errors.firstname}
              />
            )}
            <span className="w-full flex flex-col justify-center items-center">
              {' '}
              <InputForm
                nameKey={'email'}
                value={payload.email}
                setValue={setPayload}
                error={errors.email}
              />
              {isShow && (
                <InputForm
                  nameKey={'mobile'}
                  value={payload.mobile}
                  setValue={setPayload}
                  error={errors.mobile}
                />
              )}
              <InputForm
                nameKey={'password'}
                value={payload.password}
                type={'password'}
                setValue={setPayload}
                error={errors.password}
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
              <p
                className="text-[13px] hover:underline cursor-pointer"
                onClick={() => {
                  setOnOff(true);
                  setIsShowReset(false);
                }}
              >
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
