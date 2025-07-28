import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import { Breadcrumd, ItemProduct } from '../../components';
import Masonry from 'react-masonry-css';

const Categorys = () => {
  const { title, categoryId } = useParams();
  const [productCate, setProductCate] = useState(null);
  console.log(title);
  console.log(categoryId);
  const fetchData = async (queries) => {
    const reponse = await apis.apiParamProduct(queries);
    if (reponse) {
      setProductCate(reponse.data);
    }
  };
  console.log('ll', productCate);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="h-[90px] flex items-center text-[18px] border-b">
          <Breadcrumd productData={''} title={title} cust />
        </div>
        <div className="h-[50px] flex items-center justify-between border my-5">
          <span>Fillter By</span>
          <span>Search</span>
        </div>
        <div className="w-full  ">
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid flex gap-8 "
            columnClassName="my-masonry-grid_column"
          >
            {productCate?.map((elm, index) => (
              <div class="grid-item my-5" key={index}>
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
