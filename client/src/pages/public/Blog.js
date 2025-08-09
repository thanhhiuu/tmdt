import React from 'react';
import Blogs from '../../components/Blogs';
import Breadcrumd from '../../components/Breadcrumd';

const Blog = () => {
  return (
    <>
      <div className="px-4">
        <div className="h-[90px] flex items-center text-[18px] border-b">
          <Breadcrumd productData={''} title={''} />
        </div>
      </div>
      <div className="mt-6">
        <Blogs />
      </div>
    </>
  );
};

export default Blog;
