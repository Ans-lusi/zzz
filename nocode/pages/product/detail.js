// pages/product/detail.js
Page({
  data: {
    product: {},
    specifications: [],
    selectedSpecs: {},
    selectedSpecsText: '',
    quantity: 1,
    showSpecDialog: false,
    showToast: false,
    toastMessage: ''
  },

  onLoad(options) {
    this.getProductDetail(options.id);
  },

  // 获取商品详情
  getProductDetail(productId) {
    wx.request({
      url: `https://api.example.com/products/${productId}`,
      success: (res) => {
        const product = res.data.data;
        const specifications = this.parseSpecifications(product.specifications);
        
        this.setData({
          product,
          specifications,
          selectedSpecs: this.getDefaultSelectedSpecs(specifications)
        });
        
        this.updateSelectedSpecsText();
      }
    });
  },

  // 解析规格参数
  parseSpecifications(specs) {
    const parsedSpecs = {};
    
    specs.forEach(spec => {
      const [name, value] = spec.split(':');
      if (!parsedSpecs[name]) {
        parsedSpecs[name] = [];
      }
      parsedSpecs[name].push(value.trim());
    });
    
    return parsedSpecs;
  },

  // 获取默认选中的规格
  getDefaultSelectedSpecs(specifications) {
    const defaultSelected = {};
    for (const key in specifications) {
      defaultSelected[key] = specifications[key][0];
    }
    return defaultSelected;
  },

  // 更新选中的规格文本
  updateSelectedSpecsText() {
    let text = '';
    for (const key in this.data.selectedSpecs) {
      text += `${key}:${this.data.selectedSpecs[key]} `;
    }
    this.setData({
      selectedSpecsText: text.trim()
    });
  },

  // 显示规格选择对话框
  showSpecDialog() {
    this.setData({
      showSpecDialog: true
    });
  },

  // 隐藏规格选择对话框
  hideSpecDialog() {
    this.setData({
      showSpecDialog: false
    });
  },

  // 选择规格
  selectSpec(e) {
    const { group, value } = e.currentTarget.dataset;
    const selectedSpecs = { ...this.data.selectedSpecs };
    selectedSpecs[group] = value;
    
    this.setData({
      selectedSpecs
    });
  },

  // 确认选择规格
  confirmSpecs() {
    this.updateSelectedSpecsText();
    this.setData({
      showSpecDialog: false
    });
  },

  // 增加数量
  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  // 减少数量
  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // 加入购物车
  addToCart() {
    if (this.data.product.stock < this.data.quantity) {
      this.showToast('库存不足');
      return;
    }
    
    const cartItem = {
      productId: this.data.product._id,
      name: this.data.product.name,
      price: this.data.product.price,
      image: this.data.product.images[0],
      quantity: this.data.quantity,
      specifications: this.data.selectedSpecs
    };
    
    wx.request({
      url: 'https://api.example.com/cart/add',
      method: 'POST',
      data: cartItem,
      success: (res) => {
        if (res.data.code === 0) {
          this.showToast('已加入购物车');
        } else {
          this.showToast(res.data.message || '加入购物车失败');
        }
      },
      fail: () => {
        this.showToast('加入购物车失败');
      }
    });
  },

  // 立即购买
  buyNow() {
    if (this.data.product.stock < this.data.quantity) {
      this.showToast('库存不足');
      return;
    }
    
    const orderItem = {
      productId: this.data.product._id,
      name: this.data.product.name,
      price: this.data.product.price,
      image: this.data.product.images[0],
      quantity: this.data.quantity,
      specifications: this.data.selectedSpecs
    };
    
    wx.navigateTo({
      url: `/pages/order/confirm?items=${JSON.stringify([orderItem])}`
    });
  },

  // 显示提示框
  showToast(message) {
    this.setData({
      showToast: true,
      toastMessage: message
    });
    
    setTimeout(() => {
      this.setData({
        showToast: false
      });
    }, 2000);
  },

  // 查看商品评价
  viewReviews() {
    wx.navigateTo({
      url: `/pages/product/reviews?id=${this.data.product._id}`
    });
  }
});
