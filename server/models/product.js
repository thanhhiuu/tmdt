import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var product = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    rating: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
      },
    ],
    newReview: {
      type: Number,
    },
    image: {
      type: Array,
    },
    color: {
      type: String,
      enum: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
      default: 'black',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', product);
