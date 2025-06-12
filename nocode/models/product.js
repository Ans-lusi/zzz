// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  barcode: String,
  description: String,
  images: [String],
  price: Number,
  purchasePrice: Number,
  memberPrice: Number,
  stock: Number,
  stockAlertThreshold: { type: Number, default: 10 },
  specifications: [
    {
      name: String,
      value: String
    }
  ],
  isHot: { type: Boolean, default: false },
  isPromotion: { type: Boolean, default: false },
  promotionPrice: Number,
  promotionStart: Date,
  promotionEnd: Date,
  rating: { type: Number, default: 5 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
