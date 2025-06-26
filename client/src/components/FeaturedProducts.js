import React, { useEffect, useState } from 'react';
import ItemProduct from './ItemProduct';
import * as apis from '../apis';
const FeaturedProducts = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const reponse = await apis.apiSort({ limit: 9 });
    if (reponse.message) {
      setData(reponse.data);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full ">
      <div className="text-[25px] h-[50px] font-bold border-b-2 border-b-[#B87331]">
        <span className="text-gray-700 text-[18px]">FEATURED PRODUCT</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-between py-5">
        {' '}
        {data?.map((elm) => (
          <div className="" key={elm._id}>
            <ItemProduct
              title={elm.title}
              image={elm.image}
              price={elm.price}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between h-[655px] ">
        <div className="group relative">
          {' '}
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt="not"
            className="object-cover"
          />{' '}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
        </div>
        <div className="flex flex-col items-center justify-between h-full ">
          <div className="group relative">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
              alt="not"
              className="object-cover h-[340px] w-[280px]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
          </div>
          <div className="group relative">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
              alt="not"
              className="object-cover h-[295px] w-[280px]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
          </div>
        </div>

        <div className="group relative">
          {' '}
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt="not"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
