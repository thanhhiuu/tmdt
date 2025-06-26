import React from 'react';
import icons from '../../ultils/icons';

const Foodter = () => {
  const {
    SiMinutemailer,
    SiGooglemaps,
    TiPhone,
    FaGoogle,
    FiFacebook,
    FaLinkedinIn,
    FaTelegramPlane,
    FaInstagram,
  } = icons;
  return (
    <>
      <div className="w-full h-full bg-colorNav  flex items-center justify-center">
        {' '}
        <div className="w-main h-[100px] flex items-center justify-between">
          <div className="flex flex-col justify-center items-center text-white">
            <span className="text-[20px] uppercase text-white tracking-widest">
              Sign up to Newsletter
            </span>
            <span className="text-[13px]">
              Subscribe now and receive weekly newsletter
            </span>
          </div>
          <div className="w-[550px] h-[50px]  flex items-center justify-c py-5  rounded-full outline-none bg-white bg-white/20">
            <span className="text-white  text-[14px] relative">
              <input
                placeholder="Email address"
                className="w-[550px] outline-none h-[50px] opacity-60 rounded-full bg-white placeholder:text-white px-4 bg-white/20"
              />
              <span className=" absolute text-white text-[14px]  top-1/2 right-2 -translate-x-1/2 -translate-y-1/2">
                <SiMinutemailer />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-[400px] w-full flex justify-center items-center bg-[#191919]">
        <div className="w-main flex justify-between  items-start gap-3 ">
          {' '}
          <div>
            <span className="flex  gap-2 py-4">
              <p className="p-[2px] bg-colorNav"></p>
              <p className="uppercase text-white text-[15px]">About us</p>
            </span>
            <span className="flex text-white justify-center items-center gap-2 text-[13px]">
              <p className="">
                <SiGooglemaps />
              </p>
              <p>
                {' '}
                Address:
                <span className=" text-main pl-1">
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </span>{' '}
              </p>
            </span>
            <span className="flex  text-white justify-start items-center gap-2 text-[13px] py-3">
              <p className="">
                <TiPhone />
              </p>
              <p>
                Phone: <span className=" text-main pl-1">(+1234)56789xxx</span>
              </p>
            </span>
            <span className="flex  text-white justify-start items-center gap-2 text-[13px]">
              <p className="">
                <SiMinutemailer />
              </p>
              <p>
                Mail:{' '}
                <span className=" text-main pl-1">tadathemes@gmail.com</span>
              </p>
            </span>
            <span className="flex justify-start items-center gap-2 text-[13px] pt-5">
              <p className="p-4 bg-[#303030] text-white rounded-sm">
                <FaGoogle />
              </p>
              <p className="p-4 bg-[#303030] text-white rounded-sm">
                <FiFacebook />
              </p>
              <p className="p-4 bg-[#303030] text-white rounded-sm">
                <FaLinkedinIn />
              </p>
              <p className="p-4 bg-[#303030] text-white rounded-sm">
                <FaTelegramPlane />
              </p>
              <p className="p-4 bg-[#303030] text-white rounded-sm">
                <FaInstagram />
              </p>
            </span>
          </div>
          <div>
            <span className="flex  gap-2 py-4">
              <p className="p-[2px] bg-colorNav"></p>
              <p className="uppercase text-white text-[15px]">Information</p>
            </span>
            <div className="flex flex-col justify-start items-start gap-3">
              {' '}
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Typography</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Gallery</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Store Location</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Today's Deals</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Contact</span>{' '}
                </p>
              </span>
            </div>
          </div>
          <div>
            <span className="flex  gap-2 py-4">
              <p className="p-[2px] bg-colorNav"></p>
              <p className="uppercase text-white text-[15px]">Who we are</p>
            </span>
            <div className="flex flex-col justify-start items-start gap-3">
              {' '}
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Help</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Free Shipping</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Return & Exchange</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Testimonials</span>{' '}
                </p>
              </span>
            </div>
          </div>
          <div>
            <span className="flex  gap-2 py-4">
              <p className="p-[2px] bg-colorNav"></p>
              <p className="uppercase text-white text-[15px]">
                #DigitalWorldStore
              </p>
            </span>
            <div className="flex flex-col justify-start items-start gap-3">
              {' '}
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Typography</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Gallery</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Store Location</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Today's Deals</span>{' '}
                </p>
              </span>
              <span className="flex justify-start items-center gap-2 text-[13px]">
                <p>
                  <span className=" text-main pl-1">Contact</span>{' '}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Foodter;
