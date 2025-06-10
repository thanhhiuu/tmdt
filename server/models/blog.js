import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'admin',
    },
    numberView: {
      type: Number,
    },
    isLikes: {
      type: Boolean,
      default: 'false',
    },
    isUnlike: {
      type: Boolean,
      default: 'false',
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    Unlike: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Export the model
export default mongoose.model('Blog', blogSchema);
