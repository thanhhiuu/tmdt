import React, { useEffect } from 'react';
import 'keen-slider/keen-slider.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../app/blogs/blogAction';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // <-- ICON
import { useKeenSlider } from 'keen-slider/react';
import { formatDate } from '../ultils/helpers';
import icons from '../ultils/icons';
const Blogs = () => {
  const dipatch = useDispatch();
  useEffect(() => {
    dipatch(getBlogs());
  }, []);
  const blogCategories = useSelector((state) => state.blog);
  // console.log(blogCategories);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    drag: true,
    mode: 'free-snap',
    dragSpeed: 0.5,
    rubberband: false,
    inertia: true,
    slides: {
      perView: 3,
      spacing: 15,
      origin: 'center',
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 15 },
      },
      '(max-width: 640px)': {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });
  const { MdOutlineDateRange, FcLike } = icons;
  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto px-4">
        {' '}
        <div className="h-[50px] font-bold border-b-2 border-b-[#B87331]">
          <span className="text-gray-700 text-[18px]">BLOG POST</span>
        </div>
        <div className="relative group w-full">
          {' '}
          <div
            key={blogCategories?.blogs?.length}
            ref={sliderRef}
            className="keen-slider w-full  py-3"
          >
            {blogCategories?.blogs?.map((item) => (
              <div
                className="keen-slider__slide w-full flex flex-row items-center justify-center "
                key={item._id}
              >
                {' '}
                <div className=" w-[350px] h-[500px]" key={item?._id}>
                  <div className="">
                    <img
                      src={item?.image}
                      alt="Not"
                      className="w-[350px] h-[240px] object-cover"
                    />
                  </div>
                  <div className="w-[350x] text-justify">
                    <span className="text-[16px] uppercase w-[350x]  text-main font-semibold">
                      {item?.title?.length >= 35
                        ? item?.title?.slice(0, 35) + '...'
                        : item?.title}
                    </span>
                    <span className="flex text-[13px] py-2 h-full tracking-wider  text-main ">
                      <div className=" pr-5 flex h-full gap-2">
                        <div className="pt-1">
                          <MdOutlineDateRange style={{ fontSize: '19px' }} />
                        </div>
                        <div className="pt-1">
                          {formatDate(item?.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center h-full gap-2">
                        <div>
                          <FcLike style={{ fontSize: '19px' }} />
                        </div>
                        <div className="pt-1">0 Comment</div>
                      </div>
                    </span>
                    <span className="text-[13px] tracking-wider  text-main ">
                      {item?.description?.length >= 150
                        ? item?.description?.slice(0, 150) + '...'
                        : item?.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Prev Button */}
          <button
            onClick={() => slider?.current?.prev()}
            className="absolute top-[220px] left-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {/* Next Button */}
          <button
            onClick={() => slider?.current?.next()}
            className="absolute top-[220px] right-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
