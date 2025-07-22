import React, { memo, useEffect } from 'react';

const SelectionQuantity = ({
  handlerPrev,
  handlerBack,
  setQuantity,
  quantity,
}) => {
  useEffect(() => {
    if (!Number(quantity)) {
      return setQuantity(1);
    }
  }, [quantity, setQuantity]);

  return (
    <>
      <div>
        <span
          onClick={() => handlerPrev()}
          className="border cursor-pointer text-[16px] px-3 shadow-lg bg-white"
        >
          +
        </span>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="outline-none text-center border px-3 w-14 mx-3"
        />
        <span
          onClick={() => handlerBack()}
          className="border cursor-pointer text-[16px] px-3 shadow-lg bg-white"
        >
          -
        </span>
      </div>
    </>
  );
};

export default memo(SelectionQuantity);
