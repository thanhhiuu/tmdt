/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // <-- ICON
import Button from '../../components/Button';
import Breadcrumd from '../../components/Breadcrumd';
import { formatNumber, formatVND } from '../../ultils/helpers';
import SelectionQuantity from '../../components/SelectionQuantity';
import { information } from '../../ultils/contants';
const Product = () => {
  const { uid, title } = useParams();
  const [productCurrent, setProductCurrent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const fetchData = async () => {
    const reponse = await apis.apiOneProduct(uid);
    setProductCurrent(reponse.data);
  };
  console.log(quantity);
  const handlerBack = useCallback(() => {
    if (!Number(quantity)) {
      setQuantity('');
    }
    setQuantity(+quantity - 1);
  }, [quantity]);
  const handlerPrev = useCallback(() => {
    if (!Number(quantity)) {
      setQuantity('');
    }
    setQuantity(+quantity + 1);
  }, [quantity]);

  useEffect(() => {
    fetchData();
  }, [uid, title]);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    drag: true,
    dragSpeed: 0.8,
    rubberband: false,
    inertia: true,
    slides: {
      perView: 3,
      spacing: 15,
      origin: 'center',
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

  console.log('productCurrent', productCurrent);
  return (
    <>
      <div className="h-[90px] flex items-center text-[18px] border-b">
        <Breadcrumd
          productData={productCurrent?.data?.category}
          title={title}
        />
      </div>
      <div className="h-[700px] py-4 w-full flex gap-8">
        <div className="flex-4  flex flex-col gap-4 ">
          <span className="border">
            <img
              src={productCurrent?.image[0]}
              alt="Product"
              className="w-full h-[450px] object-cover"
            />
          </span>
          <div className="relative group w-full">
            <div
              key={productCurrent?.image?.length}
              ref={sliderRef}
              className="keen-slider w-full flex"
            >
              {' '}
              {productCurrent?.image.slice(0, 3).map((elm, index) => {
                return (
                  <span
                    className=" keen-slider__slide border w-[130px] p-2 "
                    key={index}
                  >
                    <img
                      src={elm}
                      alt="Product"
                      className="w-[130px] h-[100px] object-cover"
                    />
                  </span>
                );
              })}
            </div>
            {/* Prev Button */}
            <button
              onClick={() => slider?.current?.prev()}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Next Button */}
            <button
              onClick={() => slider?.current?.next()}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-4 ">
          <div className="flex flex-col gap-5">
            <span className="text-[30px] tracking-wider font-semibold ">
              {formatNumber(formatVND(productCurrent?.price)) + ' VNĐ'}
            </span>
            <ul className="list-disc ml-6 h-[400px]">
              {productCurrent?.description?.map((elm, index) => {
                return <li key={index}>{elm}</li>;
              })}
            </ul>
            <span>
              <SelectionQuantity
                handlerBack={handlerBack}
                handlerPrev={handlerPrev}
                setQuantity={setQuantity}
                quantity={quantity}
              />
            </span>
            <span>
              <Button name="Add To Card" />{' '}
            </span>
          </div>
        </div>
        <div className="flex-2 ">
          <div className="w-full flex flex-col gap-3">
            {information?.map((elm) => (
              <div
                key={elm.id}
                className="flex items-center w-full justify-center gap-5 py-4 border "
              >
                <span className="h-[40px]  w-[40px] rounded-full bg-slate-500 flex items-center justify-center">
                  {elm?.icon}
                </span>
                <div className="flex flex-col w-[65%]">
                  <span className="text-[14px]">{elm?.title}</span>
                  <span className="text-[12px] text-main">{elm?.decs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
