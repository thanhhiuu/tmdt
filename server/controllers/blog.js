import Blog from '../models/blog.js';
import asyncHandler from 'express-async-handler';

const create = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  if (!title || !category || !description) {
    throw new Error('Missing Input');
  }
  const response = await Blog.create(req.body);
  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog',
    });
  }
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const getAll = asyncHandler(async (req, res) => {
  const response = await Blog.find({}).select('-author');
  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog',
    });
  }
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog in Params',
    });
  }
  const response = await Blog.findById(bid).select('-author');
  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog',
    });
  }
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const update = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog in Params',
    });
  }
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog',
    });
  }
  return res.status(200).json({
    success: true,
    message: response,
  });
});
const deletes = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  if (!id) {
    throw new Error('id not exits');
  }
  const response = await Blog.findByIdAndDelete(id);
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Not exits Blog',
  });
});
const likes = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  console.log(bid);
  const { id } = req.user;
  const blogId = await Blog.findById(bid);
  console.log(blogId);
  const checkUserId = await blogId?.like?.some((b) => b._id.toString() === id);
  console.log(checkUserId);
  if (!checkUserId) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { like: id },
        isLikes: true,
        $pull: { Unlike: id },
        isUnlike: false,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { Unlike: id },
        isUnlike: true,
        $pull: { like: id },
        isLikes: false,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: response,
    });
  }
});
const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  console.log(bid);
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Not data Blog',
    });
  }
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : 'Not exits Id Blog',
  });
});
export { create, update, getBlog, deletes, likes, uploadImageBlog, getAll };
