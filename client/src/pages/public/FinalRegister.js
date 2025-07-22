import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import path from '../../ultils/path';

const FinalRegister = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (title === 'true') {
      Toastify({
        text: '🎉 Đăng ký thành công! Hãy đăng nhập',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          fontWeight: 'bold',
        },
      }).showToast();
    } else if (title === 'false') {
      Toastify({
        text: 'Đăng ký không thành công!',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(135deg, #FF5722, #E64A19)',
          fontWeight: 'bold',
        },
      }).showToast();
    }
    if (title === 'falied') {
      Toastify({
        text: '🎉 Email đã hết hiệu lực! Hãy đăng ký lại !',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          fontWeight: 'bold',
        },
      }).showToast();
    }
  }, [title]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {title === 'true' && 'Đăng ký thành công'}
          {title === 'false' && 'Đăng ký không thành công'}
          {title === 'falied' &&
            'Vui lòng đăng ký lại. Thời gian xác thực đã hết hiệu lực !'}
        </h1>
        <button
          onClick={() => navigate(`/${path.LOGIN}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {title === 'true' ? 'Đến trang đăng nhập' : 'Quay về trang đăng ký'}
        </button>
      </div>
    </div>
  );
};

export default FinalRegister;
