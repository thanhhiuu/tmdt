import Coupons from '../models/coupons.js';
import asyncHandler from 'express-async-handler';

const create = asyncHandler(async (req, res) => {
  const response = await Coupons.create({
    ...req.body,
    term: Date.now() + req.body.term * 24 * 60 * 60 * 1000,
  });
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create Coupons',
  });
});
const getCurrent = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupons.findById(cid);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot get Coupons',
  });
});
const update = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const terms = {
    ...req.body,
    term: Date.now() + req.body.term * 24 * 60 * 60 * 1000,
  };
  const response = await Coupons.findByIdAndUpdate(cid, terms, {
    new: true,
  });
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot update Coupons',
  });
});
const deletes = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupons.findByIdAndDelete(cid);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot delete Coupons',
  });
});

export { create, getCurrent, deletes, update };
