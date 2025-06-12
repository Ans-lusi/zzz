// pages/index/index.js
Page({
  data: {
    banners: [],
    hotProducts: [],
    promotionProducts: [],
    categories: [],
    currentTab: 0,
    searchKeyword: '',
    page: 1,
    loading: false,
    hasMore: true
  },

  onLoad() {
    this.getBannerData();
    this.getHotProducts();
    this.getPromotionProducts();
    this.getCategories();
  },

  // 获取轮播图数据
  getBannerData() {
    wx.request({
      url: 'https://api.example.com/banners',
      success: (res) => {
        this.setData({
          banners: res.data.data
        });
      }
    });
  },

  // 获取热销商品
  getHotProducts() {
    wx.request({
      url: 'https://api.example.com/products/hot',
      success: (res) => {
        this.setData({
          hotProducts: res.data.data
        });
      }
    });
  },

  // 获取促销商品
  getPromotionProducts() {
    wx.request({
      url: 'https://api.example.com/products/promotion',
      success: (res) => {
        this.setData({
          promotionProducts: res.data.data
        });
      }
    });
  },

  // 获取分类数据
  getCategories() {
    wx.request({
      url: 'https://api.example.com/categories',
      success: (res) => {
        this.setData({
          categories: res.data.data
        });
      }
    });
  },

  // 搜索商品
  searchProducts() {
    if (!this.data.searchKeyword) return;
    
    wx.navigateTo({
      url: `/pages/search/search?keyword=${this.data.searchKeyword}`
    });
  },

  // 监听搜索框输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 切换标签页
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index,
      page: 1,
      products: []
    });
    this.loadMoreProducts();
  },

  // 加载更多商品
  loadMoreProducts() {
    if (this.data.loading || !this.data.hasMore) return;
    
    this.setData({ loading: true });
    
    wx.request({
      url: 'https://api.example.com/products',
      method: 'GET',
      data: {
        categoryId: this.data.currentTab === 0 ? '' : this.data.categories[this.data.currentTab - 1]._id,
        page: this.data.page,
        pageSize: 10
      },
      success: (res) => {
        const products = this.data.products.concat(res.data.data);
        this.setData({
          products,
          page: this.data.page + 1,
          hasMore: res.data.data.length === 10,
          loading: false
        });
      },
      fail: () => {
        this.setData({ loading: false });
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      products: [],
      hasMore: true
    });
    this.loadMoreProducts();
    wx.stopPullDownRefresh();
  },

  // 上拉加载
  onReachBottom() {
    this.loadMoreProducts();
  }
});
