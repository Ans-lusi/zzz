// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderNumber: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
      specifications: [
        {
          name: String,
          value: String
        }
      ]
    }
  ],
  totalAmount: Number,
  discountAmount: Number,
  finalAmount: Number,
  address: {
    name: String,
    phone: String,
    province: String,
    city: String,
    district: String,
    detail: String
  },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'completed', 'refunded', 'cancelled'], 
    default: 'pending' 
  },
  paymentMethod: String,
  paymentTime: Date,
  shippingMethod: String,
  shippingNumber: String,
  shippingTime: Date,
  completeTime: Date,
  refundReason: String,
  refundTime: Date,
  remark: String,
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
