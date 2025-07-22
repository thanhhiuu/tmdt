import User from '../models/user.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import user from '../models/user.js';
const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: false,
      error: 'Vui lòng nhập đẩy đủ thông tin !',
    });
  }
  const user = await User.findOne({ email });
  console.log('userokkk', user);
  if (user) {
    return res.status(400).json({
      message: false,
      error: 'User already exists',
    });
  } else {
    const token = randomBytes(6).toString('base64');
    const hashFirstname = firstname + '@' + token;
    const { role, ...rest } = req.body;
    await User.create({
      ...rest,
      firstname: hashFirstname,
      isVerified: false,
    });
    setTimeout(async () => {
      await User.deleteOne({ firstname: hashFirstname });
    }, [10 * 60 * 1000]);
    // res.cookie('kycgmail', JSON.stringify({ ...rest, token }), {
    //   httpOnly: true,
    //   secure: true,
    //   domain: process.env.COOKIE_DOMAIN || 'localhost',
    //   sameSite: 'none',

    //   maxAge: 60 * 1000,
    // });

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const result = await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Email E-commerce Dev',
      html: `
    
      <h1>Vui lòng xác thực tài khoản! Thời hạn xác thực của bạn là 10 phút. 
         <a href="${process.env.URL_RESET}/verify-email/${token}">Click here</a></h1>`,
    });

    return res.status(200).json({
      message: true,
      data: 'Verify email successfully',
      result,
    });
  }
});
const kycGmail = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({
    firstname: new RegExp(`${req.params.token}$`),
  });
  const validations = await User.findOne({
    firstname: user?.firstname?.split('@')[0],
  });
  console.log(validations);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Missing token in URL',
    });
  }

  if (!user) {
    return res.redirect(`${process.env.CORS_SERVER}/finalregister/falied`);
  }
  console.log('token', token);
  console.log('user', user);
  if (token === user?.firstname?.split('@')[1]) {
    await User.findByIdAndUpdate(user._id, {
      firstname: user?.firstname?.split('@')[0],
      isVerified: true,
    });
    return res.redirect(`${process.env.CORS_SERVER}/finalregister/true`);
  } else {
    return res.redirect(`${process.env.CORS_SERVER}/finalregister/false`);
  }

  // try {
  //   console.log('All cookies:', req.cookies);
  //   if (!req.cookies?.kycgmail) {
  //     return res.redirect(`${process.env.CORS_SERVER}/finalregister/false`);
  //   }
  //   let cookieData;
  //   try {
  //     cookieData = JSON.parse(req.cookies.kycgmail);
  //   } catch (e) {
  //     console.error('Cookie parse error:', e);
  //     return res.status(400).json({
  //       success: false,
  //       message: 'Invalid cookie format',
  //     });
  //   }
  //   const { token } = req.params;
  //   if (!token) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'Missing token in URL',
  //     });
  //   }
  //   if (cookieData.token !== token) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'Token mismatch',
  //     });
  //   }
  //   const newUser = await User.create({
  //     firstname: cookieData.firstname,
  //     lastname: cookieData.lastname,
  //     email: cookieData.email,
  //     password: cookieData.password,
  //     mobile: cookieData.mobile,
  //     isVerified: true,
  //   });
  //   res.clearCookie('kycgmail');
  //   if (newUser)
  //     return res.redirect(`${process.env.CORS_SERVER}/finalregister/true`);
  //   if (!newUser)
  //     return res.redirect(`${process.env.CORS_SERVER}/finalregister/false`);
  //   // return res.status(201).json({
  //   //   success: true,
  //   //   message: 'Đăng ký thành công',
  //   //   data: newUser,
  //   // });
  // } catch (error) {
  //   console.error('Verification error:', error);
  //   return res.status(500).json({
  //     success: false,
  //     message: 'Internal server error',
  //   });
  // }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: false,
      error: 'Email not found',
    });
  }

  const comparePassword = await user.comparePassword(password);
  const { password: passwords, role, ...userData } = user._doc; // ._doc giup lam gọn thong tin user
  // console.log(userData);
  const accessToken = await user.generateAccessToken(user._id, user.role);
  // console.log('accessToken', accessToken);
  const refreshToken = await user.generateRefreshToken(user._id);
  // console.log('refreshToken', refreshToken);
  // user.refreshToken = refreshToken;

  await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  if (user && comparePassword) {
    return res.status(200).json({
      message: true,
      accessToken,
      userData,
    });
  } else {
    return res.status(400).json({
      message: false,
      error: 'Password not matched',
    });
  }
});
const getOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  // console.log('req.user _ 1', req.user);
  const user = await User.findOne(_id).select('-password -refreshToken');
  // console.log('user', user);

  return res.status(200).json({
    message: true,
    data: user ? user : 'User not found',
  });
});
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password -refreshToken');
  if (!users) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  return res.status(200).json({
    message: true,
    data: users,
  });
});
const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  // console.log('cookies', cookies.refreshToken);
  // console.log('cookies', cookies);
  if (!cookies && !cookies.refreshToken) {
    return res.status(401).json({
      message: false,
      error: 'Refresh token not found',
    });
  }
  jwt.verify(
    cookies.refreshToken,
    process.env.COOKIE_SECRET,
    async (err, encoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token is not valid',
        });
      }
      const response = await User.findOne({
        _id: encoded.id,
        refreshToken: cookies.refreshToken,
      });
      // console.log('encoded', encoded);
      // console.log('refreshToken', refreshToken);
      // console.log('response', response);
      if (!response) {
        return res.status(403).json({
          message: false,
          error: 'Refresh token not found',
        });
      }
      const accessToken = await response.generateAccessToken(
        response._id,
        response.role
      );
      if (accessToken) {
        return res.status(200).json({
          message: accessToken ? true : false,
          newAccessToken: accessToken ? accessToken : null,
        });
      }
    }
  );
});
const logOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.refreshToken) {
    return res.status(204).json({
      message: false,
      error: 'No content',
    });
  }
  jwt.verify(
    cookies.refreshToken,
    process.env.COOKIE_SECRET,
    async (err, encoded) => {
      if (err) {
        return res.status(403).json({
          message: false,
          error: 'Token is not valid',
        });
      }
      const users = await User.findOne({
        _id: encoded.id,
        refreshToken: cookies.refreshToken,
      });
      if (!users) {
        return res.status(403).json({
          message: false,
          error: 'Refresh token not found',
        });
      }
      const response = await User.findByIdAndUpdate(
        encoded.id,
        { refreshToken: '' },
        { new: true }
      );
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res.status(200).json({
        message: true,
        data: response,
      });
    }
  );
});
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  console.log('emal', email);
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập email',
    });
  }
  const user = await User.findOne({ email });
  console.log('user', user);
  if (!user) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  const token = await user.generateResetPassword();
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 phut

  await user.save({ validateBeforeSave: false });

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const result = await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
    html: `<h1>Vui lòng đổi mật khẩu! Thời hạn đổi của bạn là 10 phút. 
         <a href="${process.env.CORS_SERVER}/verify-password/${token}">Click here</a></h1>`,
  });
  return res.status(200).json({
    message: true,
    data: 'Reset password successfully',
    result,
  });
});
const verifyResetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }

  const hashPass = await bcrypt.hash(password, 12);
  user.password = hashPass;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangeAt = Date.now() - 1000;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    message: true,
    data: 'Reset password successfully',
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  const response = await User.findByIdAndDelete(_id);
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  return res.status(200).json({
    message: true,
    data: 'Delete user successfully',
  });
});
const updateCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log('req.user', req.user);
  if (!id || Object.keys().length === 0) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  const response = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'User not found or not updated',
    });
  }
  return res.status(200).json({
    message: true,
    data: response,
  });
});
const updateByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  console.log('uid', uid);
  if (!uid || Object.keys(uid).length === 0) {
    return res.status(400).json({
      message: false,
      error: 'User not found',
    });
  }
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
    runValidators: true,
  });
  if (!response) {
    return res.status(400).json({
      message: false,
      error: 'User not found or not updated',
    });
  }
  return res.status(200).json({
    message: true,
    data: response,
  });
});
const addAddress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (Object.keys(req.body).length === 0) throw new Error('Not data body');
  const response = await User.findByIdAndUpdate(
    id,
    { $push: { address: req.body } },
    { new: true }
  );
  return res.status(response ? 200 : 400).json({
    success: response ? true : false,
    message: response ? response : 'Not data user address',
  });
});

const addCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { product, quantity, color } = req.body;

  // Chuẩn hóa màu thành chữ thường để tránh trùng lặp
  const normalizedColor = color.toLowerCase();

  const response = await User.findById(id);

  // Tìm sản phẩm trong giỏ hàng với cùng id sản phẩm
  const checkExitProduct = response.cart.find(
    (elm) => elm.product.toString() === product
  );

  // Tìm sản phẩm trong giỏ hàng với cùng id và cùng màu (không phân biệt hoa thường)
  const checkExitProductWithSameColor = response.cart.find(
    (elm) =>
      elm.product.toString() === product &&
      elm.color.toLowerCase() === normalizedColor
  );

  if (checkExitProductWithSameColor) {
    // Nếu sản phẩm đã tồn tại và cùng màu, cập nhật số lượng
    const updatedCart = await User.findOneAndUpdate(
      {
        _id: id,
        'cart._id': checkExitProductWithSameColor._id, // Sử dụng _id của item để đảm bảo cập nhật đúng phần tử
      },
      { $inc: { 'cart.$.quantity': quantity } }, // Tăng số lượng
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Cập nhật số lượng thành công',
      cart: updatedCart,
    });
  } else {
    // Thêm sản phẩm mới vào giỏ hàng (có thể là sản phẩm hoàn toàn mới hoặc cùng sản phẩm nhưng khác màu)
    const updatedCart = await User.findByIdAndUpdate(
      id,
      {
        $push: { cart: { product, quantity, color: normalizedColor } }, // Lưu màu ở dạng chuẩn hóa
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      // message: checkExitProduct
      //   ? 'Thêm sản phẩm với màu mới thành công'
      //   : 'Thêm sản phẩm mới vào giỏ hàng thành công',
      cart: updatedCart,
    });
  }
});
export {
  register,
  login,
  getOneUser,
  refreshToken,
  logOut,
  resetPassword,
  verifyResetPassword,
  getAllUser,
  deleteUser,
  updateCurrentUser,
  updateByAdmin,
  addAddress,
  addCart,
  kycGmail,
};
