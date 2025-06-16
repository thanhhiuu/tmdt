import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloundinaryConfigs.js';
import multer from 'multer';
const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description } = req.body;
  if (!title || !price || !description || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: false,
      error: 'Not data is body',
    });
  }
  const slug = title.toLowerCase().replace(/ /g, '-');
  const data = { ...req.body, slug: slug };
  const product = await Product.create(data);
  if (!product) {
    return res.status(400).json({
      message: false,
      error: 'Not create product',
    });
  }
  return res.status(200).json({
    message: true,
    data: product,
  });
});
const getOneProduct = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  console.log('id', uid);
  if (!uid) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  const product = await Product.findById(uid).populate('category');
  if (!product) {
    return res.status(400).json({
      message: false,
      error: 'Not found product ( id)',
    });
  }
  return res.status(200).json({
    message: true,
    data: product,
  });
});
const getAllProduct = asyncHandler(async (req, res) => {
  const response = await Product.find().populate('category');
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  return res.status(200).json({
    message: true,
    data: response,
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query }; // Tạo ra Obj mới chứ tất cả tham số query
  // console.log(queryObj);
  // Filtering
  const removeFields = ['limit', 'page', 'sort'];
  removeFields.forEach((elm) => delete queryObj[elm]); // Loại bỏ các trường trong query

  // Chuyển đổi các toán tử gt, gte, lt, lte => thêm dấu $ để mongoose hiểu
  let queryString = JSON.stringify(queryObj); // Chuyển query thành kiểu String ( {"price":{"$gt":"5000"}} )

  queryString = queryString.replace(
    // Dùng replace => thêm dấu $ để mongoose hiểu
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  // console.log('1', queryString);
  // Tìm kiếm theo biểu thức chuyển đổi ( Giup mongoose đọc hiểu)
  const formatFiler = JSON.parse(queryString); // Chuyển query trở lại lúc đầu (  { price: { '$gt': '5000' } } )
  // console.log('2', formatFiler);

  // console.log(formatFiler.title);
  if (queryObj?.title) {
    formatFiler.title = { $regex: queryObj.title, $options: 'i' }; // Sử dụng các phương thức của mongoose để tìm kiếm ( $regex) và không phân biệt hoa thường ( $options: "i")
  }
  // Tạo biến chung để chạy các hàm
  let resultFilter = Product.find(formatFiler);

  // Sorting ( Nếu truyền dương thì là tăng còn âm là giảm ( dương: price, âm: -price))
  if (req?.query?.sort) {
    // Ví dụ {{base_url}}product/get?sort=price, stock thì đoạn code sau sẽ chuyển đổi thành {{base_url}}product/get?sort=price stock
    const filter = req.query.sort.split(',').join(' '); // Loại bỏ đấu "," thành dấu " " vì trong mongoose không dùng dấu phẩy
    // console.log('hihi', filter);
    resultFilter = resultFilter.sort(filter); // Lưu giá trị của resultFilter nếu thỏa điều kiện
  } else {
    // Nếu không mặc định xếp giảm dần theo thời gian tạo
    resultFilter = resultFilter.sort('-createdAt');
  }
  // Pagination ( Phân trang )
  const page = parseInt(req.query.page, 10) || 1; // Lấy số trang hiện tại của query, nếu không có default là 1
  const limit = parseInt(req.query.limit, 10) || 10; // Lấy số lượng kết quả hiện tại của query, nếu không có default là 10 kết quả hiển thị
  // Tính tổng kết quả được bỏ qua
  // Ví dụ page 2, limit 3
  // Thì ( 2 - 1) * 5 = 5 vậy bỏ qua 5 kết quả trước đó để lấy 5 kết quả tiếp theo cho page tiếp theo
  const skip = (page - 1) * limit;
  // Phương thức của mongoose skip ( số kết quả bỏ qua ), limit ( Số kết quả hiển thị)
  // Gán kết quả tìm kiếm resultFilter
  resultFilter = resultFilter.skip(skip).limit(limit); // Như ví dụ trên thì sẽ bỏ 5 kết quả ở bản ghi đầu tiên, để lấy 5 bản tiếp theo

  // Chạy hàm thỏa điểu kiện
  const product = await resultFilter;
  return res.status(200).json({
    message: true,
    data: product,
    counts: product.length,
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  console.log('uid', uid);

  if (!uid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  const slug = req.body.title
    ? req.body.title.toLowerCase().replace(/ /g, '-')
    : null;
  const data = { ...req.body, slug: slug };
  const response = await Product.findByIdAndUpdate(uid, data, {
    new: true,
  });
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  return res.status(200).json({
    message: true,
    data: response,
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  const response = await Product.findByIdAndDelete(uid);
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'Not found product',
    });
  }
  return res.status(200).json({
    message: true,
    data: response,
  });
});
const ratings = asyncHandler(async (req, res) => {
  const { comment, star } = req.body;
  const { id } = req.user;

  const { uid } = req.params;
  if (!comment || !star || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: false,
      error: 'Missing Input',
    });
  }
  console.log('uid', uid);
  const products = await Product.findById(uid);

  const existRating = products.rating.find(
    (r) => r.postedBy.toString() === id.toString()
  );

  if (existRating) {
    // Nếu đã đánh giá thì cập nhật lại
    existRating.star = star;
    existRating.comment = comment;
    existRating.createdAt = new Date();
  } else {
    // Nếu chưa thì thêm mới
    products.rating.push({ postedBy: id, star, comment });
  }
  // Tính điểm trung bình
  const totalRatings =
    products.rating.reduce((sum, elm) => sum + +elm.star, 0) /
    products.rating.length;

  products.newReview = parseFloat(totalRatings.toFixed(1));
  await products.save();
  res.status(200).json({
    success: true,
    message: products,
  });
});

const upLoadImg = asyncHandler(async (req, res) => {
  console.log('files', req.files);
  const { uid } = req.params;
  console.log(uid);
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: ' No file upload',
    });
  }

  const response = await Product.findByIdAndUpdate(
    uid,
    {
      $push: {
        image: {
          $each: req.files.map((elm) => {
            return elm.path;
          }),
        },
      },
    },
    { new: true }
  );
  console.log(req.files.map((elm) => elm.path));
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : 'Not push image',
    url: req.files.originalname,
    public_id: req.files.fieldname,
  });
});
export {
  createProduct,
  getOneProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  ratings,
  upLoadImg,
};
