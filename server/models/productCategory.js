import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    brand: {
      type: Array,
      require: true,
    },
    image: { type: String, require: true },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model('ProductCategory', productCategorySchema);
