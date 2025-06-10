import jwt from 'jsonwebtoken';

import asyncHandler from 'express-async-handler';

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = await req?.headers?.authorization;
  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
  // console.log('token', token);
  const accessToken = token.split(' ')[1];
  // console.log('accessToken', accessToken);

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
  jwt.verify(accessToken, process.env.COOKIE_SECRET, (err, encoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token is not valid',
        error: err.message,
      });
    }
    req.user = encoded;
    // console.log('encoded', encoded);

    next();
  });
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  // console.log('role', role);
  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized as an admin',
    });
  }
  next();
});

export { verifyToken, isAdmin };
