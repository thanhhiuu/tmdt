/* eslint-disable no-unused-vars */
import CustomProduct from './CustomProduct';
import * as apis from '../apis';
import React, { useEffect, useState } from 'react';
const NewArrivals = () => {
  const [active, setActive] = useState(1);
  const [isShow, setIsShow] = useState(null);
  const bestsaller = [
    { id: 1, title: 'BEST SALLER' },
    { id: 2, title: 'NEW ARRIVALS' },
    { id: 3, title: 'TABLET' },
  ];
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
  useEffect(() => {
    setTimeout(() => {
      fetchProduct();
    }, 1000);
  }, [active]);
  return (
    <>
      <div className="w-full h-[550px]">
        <div className="w-full">
          <CustomProduct
            bestsallers={bestsallers}
            newarrivals={newarrivals}
            content="NEW ARRIVALS"
            heightImg={'230px'}
          />
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
