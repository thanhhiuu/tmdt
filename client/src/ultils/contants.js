import path from '../ultils/path';
import icons from './icons';

export const menu = [
  { path: path.HOME, title: 'HOME', id: 1 },
  { path: path.PRODUCT, title: 'PRODUCT', id: 2 },
  { path: path.BLOG, title: 'BLOG', id: 3 },
  { path: path.SERVICES, title: 'SERVICES', id: 4 },
  { path: path.FAQS, title: 'FAQs', id: 5 },
];
export const info = [
  {
    id: 1,
    title: 'Description',
    content: `Technology: GSM / CDMA / HSPA / EVDO / LTE
              Dimensions: 143.8 x 69.5 x 8.5 mm
              Weight: 143 g
              Display: AMOLED 5.0 inches
              Resolution: 1080 x 1920
              OS: Android OS, v7.1 (Nougat)
              Chipset: Snapdragon 821
              CPU: Quad-core
              Internal: 32/128 GB, 4 GB RAM
              Camera: 12.3 MP, f/2.0 - 8 MP, f/2.4`,
  },
  {
    id: 2,
    title: 'Warranty',
    content: `Warranty Information
              LIMITED WARRANTIES
              Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, 
              Inc.Products:
              Frames Used In Upholstered and Leather Products
              Limited Lifetime Warranty
              A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    title: 'Delivery',
    content: `Purchasing & Delivery
              Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
              Picking up at the store
              Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
              Delivery
              Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
              In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    title: 'Payment',
    content: `Purchasing & Delivery
              Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
              Picking up at the store
              Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
              Delivery
              Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.`,
  },
  { id: 5, title: 'Customer Review', content: 'Update...' },
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

export const colors = [
  { id: '1', name: 'black' },
  { id: '2', name: 'red' },
  { id: '3', name: 'white' },
  { id: '4', name: 'blue' },
  { id: '5', name: 'yellow' },
];
