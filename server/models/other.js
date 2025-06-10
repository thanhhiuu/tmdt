import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var OtherSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product' },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: 'Processing',
    enum: ['cancelled', 'Processing', 'Success'],
  },
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: 'Coupon',
  },
  payment: {},
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

//Export the model
export default mongoose.model('Other', OtherSchema);
