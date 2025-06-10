import Other from '../models/other.js';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Coupons from '../models/coupons.js';

const CreateCartUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { couponId } = req.body;
  const user = await User.findById(id).select('cart').populate('cart.product');

  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const products = user.cart.map((item) => {
    return {
      product: item.product._id,
      count: item.quantity,
      color: item.color,
    };
  });
  console.log(products);
  let totalBefore = user.cart.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  let total = user.cart.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  if (couponId) {
    const coupons = await Coupons.findById(couponId);
    total = Math.floor(total * (coupons.percent / 100));
    console.log(total);
  }
  const order = await Other.create({
    products,
    total,
    orderBy: id,
    coupon: couponId ? couponId : null,
  });
  res.status(200).json({
    success: true,
    message: 'Cart retrieved successfully',
    cart: user.cart.map((item) => {
      return {
        title: item.product.title,
        product: item.product._id,
        count: item.quantity,
        color: item.color,
        price: item.product.price,
      };
    }),
    total,
    order,
    totalAmount: totalBefore - total,
  });
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error('Missing input status');
  const response = await Other.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const getOtherUser = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const response = await Other.findById(oid);
  return res.status(200).json({
    success: true,
    message: response,
  });
});
export { CreateCartUser, updateStatus, getOtherUser };
