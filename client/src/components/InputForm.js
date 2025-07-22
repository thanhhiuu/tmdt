import React, { useState } from 'react';

const InputForm = ({ type, nameKey, value, setValue, wf, error }) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <div className="py-3 relative ">
        <span className="absolute text-[8px] top-2 left-1 px-1 bg-white">
          {focus && nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
        </span>
        <input
          value={value}
          type={type || 'text'}
          className={`outline-none  w-[400px] h-[40px] px-2 text-main  bg-gray/80 placeholder:text-[13px]`}
          placeholder={
            nameKey && nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)
          }
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <div>
          {error && (
            <span className="absolute text-[10px] bottom-6 text-red-500 right-0 px-1 italic">
              {error}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default InputForm;
