import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';
import { colors } from '../ultils/contants';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import path from '../ultils/path';
const CustomFilerBy = ({
  name,
  onclickActive,
  valueACtive,
  typer = 'checked',
  priceMax,
}) => {
  const { FaAngleDown } = icons;
  const { category } = useParams();

  const navigator = useNavigate();
  const [selected, setSelected] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sortBy, setSortBy] = useState('');
  const handlerSelected = async (e) => {
    const data = selected.find((el) => el === e.target.value);
    if (data)
      setSelected((pre) => pre?.filter((elm) => elm !== e.target.value));
    else setSelected((pre) => [...pre, e.target.value]);
  };
  useEffect(() => {
    navigator({
      pathname: `/${category}`,
      search: createSearchParams({
        color: selected,
      }).toString(),
    });
  }, [selected]);

  const handlerSearch = async () => {
    let searchParams = '';

    // Xử lý price[gt] và price[lte] cho khoảng giá
    if (priceFrom) {
      searchParams += `&price[gt]=${priceFrom}`; // price[gt] cho priceFrom
    }
    if (priceTo) {
      searchParams += `&price[lte]=${priceTo}`; // price[lte] cho priceTo
    }

    // Thêm tham số sort vào URL nếu có
    if (sortBy) {
      searchParams += `&sort=${sortBy}`;
    }

    navigator({
      pathname: `/${category}`, // Đảm bảo đường dẫn đúng
      search: searchParams ? `?${searchParams.slice(1)}` : '', // Loại bỏ dấu '&' thừa
    });
    // console.log('priceFrom, priceTo', priceFrom, priceTo);
  };
  return (
    <>
      <div
        className="px-6 my-2 py-3 border flex items-center justify-center gap-6 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-main">{name}</div>
        <div className="" onClick={() => onclickActive(name)}>
          <FaAngleDown />
        </div>{' '}
      </div>
      {valueACtive === name && (
        <div
          className="absolute bg-slate-50/60  p-2 min-[200px] w-[280px] border flex flex-col justify-start items-start gap-5 "
          onClick={(e) => e.stopPropagation()}
        >
          {typer === 'checkbox' && (
            <div className="flex flex-col gap-5 w-full">
              {' '}
              <div className="flex justify-between text-[14px] items-center w-full">
                <span>{`${
                  selected.length === 'undefined ' ? '0' : +selected.length
                } Selected`}</span>
                <span
                  className="cursor-pointer text-[14px] underline"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              {colors?.map((elm) => (
                <>
                  <label>
                    {' '}
                    <input
                      key={elm.id}
                      type="checkbox"
                      onChange={handlerSelected}
                      value={elm.name}
                      id={elm.id}
                    />
                    <span className="ml-3 text-[14px]">{elm?.name}</span>
                  </label>
                </>
              ))}
            </div>
          )}
          {typer === 'input' && (
            <div className="w-full">
              {' '}
              <div className="flex justify-between items-center w-full">
                <span className="text-[14px]">{`${
                  selected.length === 'undefined '
                    ? '0'
                    : Number(priceMax).toLocaleString() + 'VNĐ'
                } Giá cao nhất`}</span>
                <span
                  className="cursor-pointer text-[14px] underline"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div>
                <div className="py-4 flex items-center justify-between ">
                  <label className="text-[14px]">From</label>
                  <input
                    type="number"
                    className="outline-none border "
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    onBlur={handlerSearch}
                  />
                </div>
                <div className="py-4 flex items-center justify-between">
                  <label className="text-[14px]">To</label>
                  <input
                    type="number"
                    className="outline-none border "
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    onBlur={handlerSearch}
                  />
                </div>{' '}
                <div className="py-4  flex items-center justify-between">
                  <label className="text-[14px] py-6">Sort By</label>
                  <select
                    className="outline-none"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      handlerSearch();
                    }}
                  >
                    <option value="" style={{ fontSize: '14px' }}>
                      Selection Sort
                    </option>
                    <option style={{ fontSize: '14px' }} value="price">
                      Price (Low to High)
                    </option>
                    <option style={{ fontSize: '14px' }} value="-price">
                      Price (High to Low)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CustomFilerBy;
