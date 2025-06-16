import React from 'react';

const SelectOption = ({ icon }) => {
  return (
    <div className="hover:bg-black hover:text-white cursor-pointer text-[25px] w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center">
      {icon}
    </div>
  );
};

export default SelectOption;
