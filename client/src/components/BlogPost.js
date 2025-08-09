import React, { useEffect, useState } from 'react';
import Breadcrumd from './Breadcrumd';
import { useParams } from 'react-router-dom';
import * as apis from '../apis';
import { formatDate } from '../ultils/helpers';
const BlogPost = () => {
  const { bid } = useParams();
  const [BlogData, setBlogData] = useState(null);
  const fetchBlog = async () => {
    const reponse = await apis.apiGetOneBlog(bid);
    if (reponse) {
      setBlogData(reponse?.message);
    }
  };
  console.log(BlogData);
  useEffect(() => {
    fetchBlog();
  }, [bid]);

  console.log(bid);
  return (
    <>
      <div className="w-full">
        <div className="h-[90px] flex items-center text-[18px] border-b">
          <Breadcrumd productData={''} title={BlogData?.title} />
        </div>
        <div className="w-full text-main text-[16px]">
          <div className="flex gap-4 items-center py-3">
            <span>By Tada Theme</span>
            <span>{formatDate(BlogData?.createdAt)}</span>
            <span>0 Comment</span>
          </div>
          <div className="w-full">
            <div>
              <img
                alt="Blog"
                src={BlogData?.image}
                className="object-contain"
              />
            </div>
            <div className="py-5 text-[14px] text-main">
              <span>{BlogData?.description}</span>
            </div>
            <div className="text-[14px] text-main font-semibold flex gap-5 items-center py-4">
              <span className=" px-7 border py-2 cursor-pointer hover:text-white hover:bg-black">
                Share
              </span>
              <span className=" px-7 border py-2 cursor-pointer hover:text-white hover:bg-black">
                Tweet
              </span>
              <span className=" px-7 border py-2 cursor-pointer hover:text-white hover:bg-black">
                Pin it
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
