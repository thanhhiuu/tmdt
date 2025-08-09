import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as apis from '../../apis';
import { Breadcrumd, CustomFilerBy, ItemProduct } from '../../components';
import Masonry from 'react-masonry-css';

const Categorys = () => {
  const { title } = useParams();
  const [params] = useSearchParams();

  const [productCate, setProductCate] = useState(null);
  const [priceMax, setPriceMax] = useState(0);
  const [changeActive, setChangeActive] = useState(null);

  const fetchData = async (queries) => {
    const reponse = await apis.apiParamProduct(queries);
    console.log('da', reponse);
    if (reponse) {
      setProductCate(reponse.data);
    }
    const priceMax = await apis.apiParamProduct({ sort: '-price' });
    setPriceMax(priceMax.data);
  };

  const onclickActive = (name) => {
    setChangeActive(name);
    if (changeActive === name) {
      setChangeActive(null);
    }
  };
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) queries[i[0]] = i[1];

    fetchData(queries);
  }, [params]);

  return (
    <>
      <div className="w-full" onClick={() => setChangeActive('')}>
        <div className="h-[90px] flex items-center text-[18px] border-b">
          <Breadcrumd productData={''} title={title} cust />
        </div>
        <div className="h-[110px] flex items-center justify-between px-3 border my-5">
          <div className="my-5">
            <span className="font-semibold text-main">Filter By</span>
            <div className="flex justify-center gap-4">
              <span className="">
                <CustomFilerBy
                  name="Price"
                  onclickActive={onclickActive}
                  valueACtive={changeActive}
                  typer="input"
                  priceMax={priceMax[0]?.price}
                />
              </span>
              <span>
                <CustomFilerBy
                  name="Color"
                  onclickActive={onclickActive}
                  valueACtive={changeActive}
                  typer="checkbox"
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold  text-main">Sort By</span>
            <div>
              <span>
                <CustomFilerBy
                  name="Best Selling"
                  onclickActive={onclickActive}
                  valueACtive={changeActive}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid flex gap-8 "
            columnClassName="my-masonry-grid_column"
          >
            {productCate?.map((elm, index) => (
              <div class="grid-item my-4" key={index}>
                <ItemProduct
                  title={elm?.title}
                  price={elm?.price}
                  image={elm?.image}
                  _id={elm?._id}
                  wc
                />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
      <div className="h-[400px] "></div>
    </>
  );
};

export default Categorys;
