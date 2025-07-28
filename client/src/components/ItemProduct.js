import React from 'react';
import { formatNumber } from '../ultils/helpers';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const ItemProduct = ({ title, image, price, _id, wc }) => {
  return (
    <>
      <div
        className={`${
          !wc
            ? 'w-[350px] h-[120px] border flex justify-around items-center gap-2'
            : ' w-full h-[320px] border  '
        }`}
      >
        <div
          className={`${
            !wc ? 'w-[90px] h-[90px] ' : 'w-[250px] h-[220px] m-auto my-3'
          }`}
        >
          <img
            src={image[0]}
            alt="Not"
            className={`${
              !wc
                ? 'w-[90px] h-[90px] object-cover '
                : 'w-[100%] h-[220px] object-cover flex items-center justify-center'
            }`}
          />
        </div>
        <div
          className={`${
            !wc ? 'title flex flex-col ' : 'title flex flex-col m-3'
          }`}
        >
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
