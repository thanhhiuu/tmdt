/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
const Product = () => {
  const { uid, title } = useParams();
  const [productCurrent, setProductCurrent] = useState(null);
  const fetchData = async () => {
    const reponse = await apis.apiOneProduct(uid);
    console.log(reponse);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Product</div>;
};

export default Product;
