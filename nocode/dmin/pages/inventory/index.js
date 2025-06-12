// admin/pages/inventory/index.js
Page({
  data: {
    products: [],
    searchKeyword: '',
    page: 1,
    pageSize: 20,
    total: 0,
    loading: false,
    showAlertProducts: false,
    stockAlertProducts: []
  },

  onLoad() {
    this.getProducts();
    this.checkStockAlerts();
  },

  // 获取商品列表
  getProducts() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    wx.request({
      url: 'https://api.example.com/admin/products',
      method: 'GET',
      data: {
        keyword: this.data.searchKeyword,
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        const products = this.data.page === 1 
          ? res.data.data 
          : this.data.products.concat(res.data.data);
        
        this.setData({
          products,
          total: res.data.total,
          loading: false
        });
      },
      fail: () => {
        this.setData({ loading: false });
      }
    });
  },

  // 检查库存预警
  checkStockAlerts() {
    wx.request({
      url: 'https://api.example.com/admin/products/stock-alert',
      success: (res) => {
        this.setData({
          stockAlertProducts: res.data.data
        });
        
        if (res.data.data.length > 0) {
          wx.showTabBarRedDot({
            index: 1 // 库存管理页的tab索引
          });
        }
      }
    });
  },

  // 搜索商品
  searchProducts() {
    this.setData({
      page: 1,
      products: []
    });
    this.getProducts();
  },

  // 监听搜索框输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 清除搜索关键词
  clearSearch() {
    this.setData({
      searchKeyword: '',
      page: 1,
      products: []
    });
    this.getProducts();
  },

  // 刷新数据
  refreshData() {
    this.setData({
      page: 1,
      products: []
    });
    this.getProducts();
  },

  // 加载更多
  loadMore() {
    if (this.data.loading || this.data.products.length >= this.data.total) return;
    
    this.setData({
      page: this.data.page + 1
    });
    this.getProducts();
  },

  // 扫码添加商品
  scanBarcode() {
    wx.scanCode({
      success: (res) => {
        const barcode = res.result;
        wx.navigateTo({
          url: `/admin/pages/product/add?barcode=${barcode}`
        });
      }
    });
  },

  // 编辑商品
  editProduct(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/admin/pages/product/edit?id=${productId}`
    });
  },

  // 查看库存预警商品
  viewStockAlertProducts() {
    this.setData({
      showAlertProducts: true
    });
  },

  // 关闭库存预警商品列表
  closeAlertProducts() {
    this.setData({
      showAlertProducts: false
    });
  },

  // 进入补货页面
  goToRestock(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/admin/pages/inventory/restock?id=${productId}`
    });
  }
});
