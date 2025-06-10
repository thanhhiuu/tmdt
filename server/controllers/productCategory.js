import asyncHandler from 'express-async-handler';
import productCategory from '../models/productCategory.js';
import slugify from 'slugify';
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Missing Input',
    });
  }
  const slug = slugify(title, { lower: true });
  const response = await productCategory.create({ title, slug });
  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Cannot create Category',
    });
  }
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  if (!uid) {
    return res.status(400).json({
      success: false,
      message: 'uid not exits',
    });
  }
  const response = await productCategory.findById(uid);
  console.log('uid', response);
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const getAll = asyncHandler(async (req, res) => {
  const response = await productCategory.find({});
  console.log('uid', response);
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const update = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const data = {
    ...req.body,
    slug: slugify(req.body.title, {
      lower: true,
      replacement: '-',
      locale: 'en',
    }),
  };
  const response = await productCategory.findByIdAndUpdate(uid, data, {
    new: true,
  });
  console.log('uid', response);
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const deletes = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  const response = await productCategory.findByIdAndDelete(uid);
  console.log('uid', response);
  return res.status(200).json({
    success: true,
    message: response,
  });
});
export { createCategory, getCurrent, getAll, update, deletes };
