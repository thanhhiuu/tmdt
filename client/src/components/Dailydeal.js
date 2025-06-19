import React, { useEffect, useState } from 'react';
import * as apis from '../apis/app';
import { formatNumber } from '../ultils/helpers';
import Countdown from './Countdown';
import icons from '../ultils/icons';

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000; // 24h tính bằng milliseconds

const Dailydeal = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TWENTY_FOUR_HOURS_MS);
  const { IoMdMenu } = icons;

  // Fetch sản phẩm ban đầu
  useEffect(() => {
    fetchProduct();
    startCountdown();
  }, []);

  // Hàm fetch sản phẩm ngẫu nhiên
  const fetchProduct = async () => {
    const response = await apis.apiSort({
      limit: 1,
      page: Math.round(Math.random() * 4),
    });
    if (response.message) {
      setDataProduct(response?.data);
    }
  };

  // Hàm bắt đầu đếm ngược 24h
  const startCountdown = () => {
    const savedEndTime = localStorage.getItem('dealEndTime');
    const currentTime = Date.now();

    // Nếu có thời gian kết thúc đã lưu => tính thời gian còn lại
    if (savedEndTime) {
      const remainingTime = parseInt(savedEndTime, 10) - currentTime;
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        resetDeal(); // Nếu hết thời gian => reset deal mới
      }
    } else {
      resetDeal(); // Nếu chưa có thời gian kết thúc => tạo deal mới
    }

    // Cập nhật đếm ngược mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          resetDeal(); // Khi hết giờ => reset deal
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear khi component unmount
  };

  // Reset deal mới sau 24h
  const resetDeal = () => {
    const newEndTime = Date.now() + TWENTY_FOUR_HOURS_MS;
    localStorage.setItem('dealEndTime', newEndTime.toString());
    fetchProduct(); // Fetch sản phẩm mới
    setTimeLeft(TWENTY_FOUR_HOURS_MS); // Reset thời gian
  };

  // Chuyển milliseconds thành giờ:phút:giây
  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <>
      {dataProduct?.map((elm) => (
        <div className="w-full" key={elm._id}>
          <div className="flex justify-around px-3 items-center w-full h-[50px] ">
            <span className="flex-1 text-colorNav text-[20px]">★</span>
            <span className="flex-2 text-[20px] font-semibold text-gray-700 ">
              DAILY DEALS
            </span>
            <span className="flex-1"></span>
          </div>
          <div className="w-full h-[300px] flex justify-center">
            <img
              src={elm.image}
              alt="Hết"
              className="w-[250px] h-[300px] object-cover"
            />
          </div>
          <div className="flex justify-center items-center flex-col pt-5 text-main">
            <span>{elm.title}</span>
            <span>
              {formatNumber(elm.price)}
              <strong>VND</strong>
            </span>
            <div className="flex flex-row gap-4 py-3">
              <Countdown content={'Hour'} number={hours} />
              <Countdown content={'Minutes'} number={minutes} />
              <Countdown content={'Second'} number={seconds} />
            </div>
            <button
              type="button"
              className="flex justify-center items-center gap-2 px-[80px] py-[10px] hover:bg-black c  text-white bg-colorNav"
            >
              <IoMdMenu className="text-[20px] " />
              OPTIONS
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Dailydeal;
