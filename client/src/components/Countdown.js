import React, { memo } from 'react';

const Countdown = ({ content, number }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[90px] h-[55px] border">
        <span>{number}</span>
        <span className="text-[13px] text-main">{content}</span>
      </div>
    </>
  );
};

export default memo(Countdown);
