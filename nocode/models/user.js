// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  openid: { type: String, unique: true },
  unionid: String,
  nickname: String,
  avatarUrl: String,
  phone: String,
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  address: [
    {
      name: String,
      phone: String,
      province: String,
      city: String,
      district: String,
      detail: String,
      isDefault: Boolean
    }
  ],
  coupons: [
    {
      couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
      status: { type: String, enum: ['unused', 'used', 'expired'], default: 'unused' },
      obtainTime: Date,
      expireTime: Date
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
