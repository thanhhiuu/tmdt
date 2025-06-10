import blogCategory from '../models/blogCategory.js';
import asyncHandler from 'express-async-handler';

const createBlog = asyncHandler(async (req, res) => {
  const response = await blogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Cannot create',
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { blid } = req.params;

  const response = await blogCategory.findById(blid);
  console.log(response);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Cannot getCurrent',
  });
});
const getAll = asyncHandler(async (req, res) => {
  const response = await blogCategory.find({});
  console.log(response);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Cannot getCurrent',
  });
});
const update = asyncHandler(async (req, res) => {
  const { blid } = req.params;
  const data = { ...req.body };
  const response = await blogCategory.findByIdAndUpdate(blid, data, {
    new: true,
  });
  console.log(response);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Cannot getCurrent',
  });
});
const deletes = asyncHandler(async (req, res) => {
  const { blid } = req.params;
  const response = blogCategory.findByIdAndDelete(blid);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Cannot delete BlogProduct',
  });
});
export { createBlog, getCurrent, getAll, update, deletes };
