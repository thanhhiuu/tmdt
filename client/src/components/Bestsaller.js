import React, { useEffect, useState } from 'react';
import * as apis from '../apis';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { getProduct } from '../app/products/productAction';

import { ChevronLeft, ChevronRight } from 'lucide-react'; // <-- ICON
import { formatNumber, startRating } from '../ultils/helpers';
import best from '../assets/best.png';
import newz from '../assets/new.png';
import { SelectOption } from './';
import icons from '../ultils/icons';
import { useDispatch } from 'react-redux';
const Bestsaller = () => {
  const dipatch = useDispatch();
  useEffect(() => {
    dipatch(getProduct());
  }, []);
  const bestsaller = [
    { id: 1, title: 'BEST SALLER' },
    { id: 2, title: 'NEW ARRIVALS' },
    { id: 3, title: 'TABLET' },
  ];
  const { CiHeart, IoIosEye, IoMdMenu } = icons;
  const [active, setActive] = useState(1);
  const [isShow, setIsShow] = useState(null);
  const [bestsallers, setBestsallers] = useState(null);
  const [newarrivals, setNewarrivals] = useState(null);

  const fetchProduct = async () => {
    const reponse = await Promise.all([
      apis.apiSort({ sort: '-stock' }),
      apis.apiSort({ sort: '-createdAt' }),
    ]);
    if (reponse[0]?.message) setBestsallers(reponse[0]?.data);
    if (reponse[1]?.message) setNewarrivals(reponse[1]?.data);
  };

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    drag: true,
    dragSpeed: 0.8,
    rubberband: false,
    inertia: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 15 },
      },
      '(max-width: 640px)': {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    fetchProduct();
  }, [active]);

  return (
    <div className="">
      {/* Tabs */}
      <div className="pb-2 mb-3 border-b-2">
        {bestsaller.map((elm) => (
          <span
            key={elm.id}
            onClick={() => setActive(elm.id)}
            className={
              active === elm.id
                ? 'text-colorNav px-5 text-[20px] cursor-pointer font-bold'
                : 'px-5 text-[20px] cursor-pointer text-gray-500 font-bold'
            }
          >
            {elm.title}
          </span>
        ))}
      </div>

      {/* Slider Wrapper with Buttons */}
      <div className="relative group">
        {/* Slider */}
        {active === 1 ? (
          <div
            key={bestsallers?.length}
            ref={sliderRef}
            className="keen-slider w-full flex items-center ml-1"
          >
            {bestsallers?.map((item) => (
              <div
                key={item._id}
                className="keen-slider__slide h-[350px] flex flex-col items-center justify-start rounded-lg border"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsShow(item._id);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setIsShow(null);
                }}
              >
                <div className="w-full relative">
                  {' '}
                  {isShow === item._id ? (
                    <div className="w-full absolute flex bottom-5 items-center justify-center gap-4 animate-slide-top">
                      <SelectOption icon={<IoIosEye />} />
                      <SelectOption icon={<IoMdMenu />} />
                      <SelectOption icon={<CiHeart />} />
                    </div>
                  ) : (
                    ''
                  )}
                  <img
                    src={item.image}
                    alt="Not Found"
                    className="object-cover h-[230px] w-full p-3 "
                  />
                  <img
                    src={best}
                    alt="Hết"
                    className="w-[70px] absolute top-0 right-[-10px]"
                  />
                </div>
                <div className="flex flex-col w-full p-3 items-start justify-start">
                  <span className="text-main ">
                    {item.title.length > 50
                      ? item.title.slice(1, 50) + '...'
                      : item.title}
                  </span>
                  <span>
                    {item.newReview
                      ? startRating(item?.newReview)
                      : startRating(5)}
                  </span>
                  <span className="text-main">
                    {formatNumber(item.price)}
                    <strong> VNĐ</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            key={active}
            ref={sliderRef}
            className="keen-slider w-full flex items-center ml-1"
          >
            {newarrivals?.map((item) => (
              <div
                key={item._id}
                className="keen-slider__slide h-[350px] flex flex-col items-center justify-start rounded-lg border"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsShow(item._id);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setIsShow(null);
                }}
              >
                <div className="w-full relative  ">
                  {isShow === item._id ? (
                    <div className="w-full absolute flex bottom-5 items-center justify-center gap-4 animate-slide-top">
                      <SelectOption icon={<IoIosEye />} />
                      <SelectOption icon={<IoMdMenu />} />
                      <SelectOption icon={<CiHeart />} />
                    </div>
                  ) : (
                    ''
                  )}
                  <img
                    src={item.image}
                    alt="Not Found"
                    className="object-cover h-[230px] w-full p-3"
                  />
                  <img
                    src={newz}
                    alt="Hết"
                    className="w-[70px] absolute top-0 right-[-10px]"
                  />
                </div>
                <div className="flex flex-col w-full p-3 items-start justify-start">
                  <span className="text-main">
                    {item.title.length > 50
                      ? item.title.slice(1, 50) + '...'
                      : item.title}
                  </span>
                  <span>
                    {item.newReview
                      ? startRating(item?.newReview)
                      : startRating(5)}
                  </span>
                  <span className="text-main">
                    {formatNumber(item.price)}
                    <strong> VNĐ</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prev Button */}
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Bestsaller;
