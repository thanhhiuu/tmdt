import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var couponsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    term: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model('Coupons', couponsSchema);
