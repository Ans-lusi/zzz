// models/coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['discount', 'fixed', 'freeShipping'] },
  discountRate: Number, // 折扣率(百分比)
  discountAmount: Number, // 固定金额
  minOrderAmount: Number, // 最低订单金额
  startDate: Date,
  endDate: Date,
  totalCount: Number,
  usedCount: { type: Number, default: 0 },
  maxPerUser: Number,
  isActive: { type: Boolean, default: true },
  applicableProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  ],
  applicableCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);
