import React, { useCallback, useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';

const KycPassword = () => {
  // const [onOff, setOnOff] = useState(true);
  const [valueEmail, setValueEmail] = useState('');
  const { token } = useParams();
  console.log('token', token);
  const handlerReset = useCallback(async (req, res) => {}, []);
  return (
    <>
      {' '}
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black/45">
        {' '}
        <div className="p-6 card flex flex-col items-center justify-center gap-6 w-full max-w-md bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <h3 className="text-center text-xl font-semibold text-gray-800 uppercase">
            Nhập mật khẩu để thay đổi
          </h3>

          <div className="w-full">
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={valueEmail}
              onChange={(e) => {
                console.log('Input value:', e.target.value);
                setValueEmail(e.target.value);
              }}
              placeholder="Nhập mật khẩu mới của bạn !"
            />
          </div>

          <Button
            name={'Gửi'}
            handlerOnClick={handlerReset}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          />

          {/* <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
            onClick={() => {
              setOnOff(true);
            }}
          >
            Quay lại
          </button> */}
        </div>
      </div>
    </>
  );
};

export default KycPassword;
