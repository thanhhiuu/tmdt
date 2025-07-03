import React from 'react';

const Button = ({ name, handlerOnClick }) => {
  return (
    <>
      <div className="w-full h-[40px] flex items-center justify-center text-white text-center bg-colorNav">
        <button
          type="button"
          className="uppercase w-[340px] h-[40px]  font-semibold"
          onClick={() => handlerOnClick && handlerOnClick()}
        >
          {name}
        </button>
      </div>
    </>
  );
};

export default Button;
