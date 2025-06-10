import Brand from '../models/brand.js';
import asyncHandler from 'express-async-handler';

const create = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create Brand',
  });
});
const getCurrent = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findById(brid);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create Brand',
  });
});
const update = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndUpdate(brid, req.body, { new: true });
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create Brand',
  });
});
const deletes = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndDelete(brid);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create Brand',
  });
});

export { create, getCurrent, deletes, update };
