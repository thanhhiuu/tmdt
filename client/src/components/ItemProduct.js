import React from 'react';
import { formatNumber } from '../ultils/helpers';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const ItemProduct = ({ title, image, price, _id }) => {
  return (
    <>
      <div className="w-[350px] h-[120px] border flex justify-around items-center gap-2">
        <div className="w-[90px] h-[90px] ">
          <img
            src={image}
            alt="Not"
            className="w-[90px] h-[90px] object-cover"
          />
        </div>
        <div className="title flex flex-col ">
          <span className="text-main hover:text-colorNav cursor-pointer">
            <Link to={`/${path.PRODUCT}/${_id}/${title}`}>
              {title?.length > 20 ? title.slice(0, 15) + '...' : title}
            </Link>
          </span>
          <span className="text-main">
            {formatNumber(price)}
            <strong> VND</strong>
          </span>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default ItemProduct;
