import path from '../ultils/path';
import icons from './icons';

export const menu = [
  { path: path.HOME, title: 'HOME', id: 1 },
  { path: path.PRODUCT, title: 'PRODUCT', id: 2 },
  { path: path.BLOG, title: 'BLOG', id: 3 },
  { path: path.SERVICES, title: 'SERVICES', id: 4 },
  { path: path.FAQS, title: 'FAQs', id: 5 },
];

const { MdOutlineReply, FaGift, FaTty, CiDeliveryTruck, FaShieldAlt } = icons;
export const information = [
  {
    id: 1,
    title: 'Guarantee',
    decs: 'Quality checked',
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    title: 'Free Shipping',
    decs: 'Free on all products',
    icon: <CiDeliveryTruck />,
  },
  {
    id: 3,
    title: 'Special gift cards',
    decs: 'Special gift cards',
    icon: <FaGift />,
  },
  {
    id: 4,
    title: 'Free return',
    decs: 'Within 7 days',
    icon: <MdOutlineReply />,
  },
  {
    id: 5,
    title: 'Consultancy',
    decs: 'Lifetime 24/7/356',
    icon: <FaTty />,
  },
];
