// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  level: Number,
  isActive: { type: Boolean, default: true },
  sortOrder: Number,
  icon: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
