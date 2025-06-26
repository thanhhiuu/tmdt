import mongoose from 'mongoose';
import ProductCategory from './models/productCategory.js';

async function insertData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/e-commerce');
    console.log('Connected to MongoDB');

    const productCategories = [
      {
        title: 'SMARTPHONE',
        brand: ['Apple', 'Samsung', 'Xiaomi', 'LG', 'Asus', 'Nokia'],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/mobile-devices_300x.jpg?v=1613166682',
      },
      {
        title: 'TABLET',
        brand: ['Ipad', 'Samsung', 'Lenovo', 'Acer', 'Asus', 'Haier'],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/pc-1_300x.jpg?v=1613166682',
      },
      {
        title: 'LAPTOP',
        brand: ['Macbook', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Hp'],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/laptop_300x.jpg?v=1613166811',
      },
      {
        title: 'TELEVISION',
        brand: ['Apple', 'Samsung', 'Xiaomi', 'LG', 'Asus', 'Nokia'],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/television_300x.jpg?v=1613166810',
      },
      {
        title: 'ACCESSORIES',
        brand: [
          'Apple',
          'Bluetooth',
          'Keyboard',
          'Headphone',
          'Mouse',
          'Cases',
        ],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/headphone_8467ba67-70c7-4977-b57e-8847d56549c6_300x.jpg?v=1613166811',
      },
      {
        title: 'PRINTER',
        brand: ['Ipad', 'Samsung', 'Lenovo', 'Acer', 'Asus', 'Haier'],
        image:
          'https://digital-world-2.myshopify.com/cdn/shop/files/printer_300x.jpg?v=1613166810',
      },
      // Thêm các bản ghi khác nếu cần
    ];

    const result = await ProductCategory.insertMany(productCategories);
    console.log('Insert thành công:', result);
  } catch (error) {
    console.error('Lỗi khi insert:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

insertData();
