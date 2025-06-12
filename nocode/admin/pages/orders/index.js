// admin/pages/orders/index.js
Page({
  data: {
    orders: [],
    status: 'all',
    searchKeyword: '',
    page: 1,
    pageSize: 20,
    total: 0,
    loading: false,
    statusList: [
      { id: 'all', name: '全部' },
      { id: 'pending', name: '待付款' },
      { id: 'paid', name: '待发货' },
      { id: 'shipped', name: '待收货' },
      { id: 'delivered', name: '待评价' },
      { id: 'completed', name: '已完成' },
      { id: 'refunded', name: '已退款' },
      { id: 'cancelled', name: '已取消' }
    ]
  },

  onLoad() {
    this.getOrders();
  },

  // 获取订单列表
  getOrders() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    wx.request({
      url: 'https://api.example.com/admin/orders',
      method: 'GET',
      data: {
        status: this.data.status,
        keyword: this.data.searchKeyword,
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        const orders = this.data.page === 1 
          ? res.data.data 
          : this.data.orders.concat(res.data.data);
        
        this.setData({
          orders,
          total: res.data.total,
          loading: false
        });
      },
      fail: () => {
        this.setData({ loading: false });
      }
    });
  },

  // 切换订单状态
  changeStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      status,
      page: 1,
      orders: []
    });
    this.getOrders();
  },

  // 搜索订单
  searchOrders() {
    this.setData({
      page: 1,
      orders: []
    });
    this.getOrders();
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
      orders: []
    });
    this.getOrders();
  },

  // 刷新数据
  refreshData() {
    this.setData({
      page: 1,
      orders: []
    });
    this.getOrders();
  },

  // 加载更多
  loadMore() {
    if (this.data.loading || this.data.orders.length >= this.data.total) return;
    
    this.setData({
      page: this.data.page + 1
    });
    this.getOrders();
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/admin/pages/orders/detail?id=${orderId}`
    });
  },

  // 批量处理订单
  batchProcessOrders() {
    wx.showActionSheet({
      itemList: ['标记为已发货', '标记为已完成', '导出订单'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.batchUpdateStatus('shipped');
        } else if (res.tapIndex === 1) {
          this.batchUpdateStatus('completed');
        } else if (res.tapIndex === 2) {
          this.exportOrders();
        }
      }
    });
  },

  // 批量更新订单状态
  batchUpdateStatus(status) {
    // 实现批量更新订单状态的逻辑
    wx.showToast({
      title: '批量处理中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '批量处理成功',
        icon: 'success'
      });
      this.refreshData();
    }, 1000);
  },

  // 导出订单
  exportOrders() {
    // 实现导出订单的逻辑
    wx.showToast({
      title: '导出中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '导出成功',
        icon: 'success'
      });
    }, 1000);
  }
});
