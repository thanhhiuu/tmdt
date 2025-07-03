import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} không phải là email hợp lệ!`,
      },
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'Schema',
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
      },
    ],
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    address: [
      {
        specific_address: String,
        commune: String,
        district: String,
        county: String,
      },
    ],
    isBlock: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user?.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
userSchema.methods.generateAccessToken = async function (id, role) {
  return await jwt.sign({ id: this._id, role }, process.env.COOKIE_SECRET, {
    expiresIn: '2d',
  });
};
userSchema.methods.generateRefreshToken = async function (id) {
  return await jwt.sign({ id: this._id }, process.env.COOKIE_SECRET, {
    expiresIn: '7d',
  });
};
userSchema.methods.generateResetPassword = async function () {
  return await crypto.randomBytes(32).toString('hex');
};

//Export the model
export default mongoose.model('User', userSchema);
