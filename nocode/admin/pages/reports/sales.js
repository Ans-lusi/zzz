// admin/pages/reports/sales.js
Page({
  data: {
    dateRange: 'day',
    startDate: '',
    endDate: '',
    salesData: {},
    chartData: {
      categories: [],
      sales: [],
      profits: []
    },
    productRanking: [],
    isLoading: false
  },

  onLoad() {
    this.initDateRange();
    this.fetchSalesData();
  },

  // 初始化日期范围
  initDateRange() {
    const today = new Date();
    const endDate = this.formatDate(today);
    
    let startDate;
    if (this.data.dateRange === 'day') {
      startDate = endDate;
    } else if (this.data.dateRange === 'week') {
      const startDay = new Date(today);
      startDay.setDate(today.getDate() - 6);
      startDate = this.formatDate(startDay);
    } else if (this.data.dateRange === 'month') {
      const startDay = new Date(today);
      startDay.setDate(1);
      startDate = this.formatDate(startDay);
    } else if (this.data.dateRange === 'year') {
      const startDay = new Date(today);
      startDay.setMonth(0);
      startDay.setDate(1);
      startDate = this.formatDate(startDay);
    }
    
    this.setData({
      startDate,
      endDate
    });
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 获取销售数据
  fetchSalesData() {
    this.setData({ isLoading: true });
    
    wx.request({
      url: 'https://api.example.com/admin/reports/sales',
      method: 'GET',
      data: {
        dateRange: this.data.dateRange,
        startDate: this.data.startDate,
        endDate: this.data.endDate
      },
      success: (res) => {
        const salesData = res.data.data;
        const chartData = this.prepareChartData(salesData.chartData);
        
        this.setData({
          salesData,
          chartData,
          productRanking: salesData.productRanking,
          isLoading: false
        });
      },
      fail: () => {
        this.setData({ isLoading: false });
      }
    });
  },

  // 准备图表数据
  prepareChartData(data) {
    const categories = [];
    const sales = [];
    const profits = [];
    
    data.forEach(item => {
      categories.push(item.label);
      sales.push(item.sales);
      profits.push(item.profit);
    });
    
    return {
      categories,
      sales,
      profits
    };
  },

  // 切换日期范围
  changeDateRange(e) {
    const dateRange = e.currentTarget.dataset.range;
    this.setData({ dateRange });
    this.initDateRange();
    this.fetchSalesData();
  },

  // 选择开始日期
  selectStartDate(e) {
    this.setData({
      startDate: e.detail.value
    });
    this.fetchSalesData();
  },

  // 选择结束日期
  selectEndDate(e) {
    this.setData({
      endDate: e.detail.value
    });
    this.fetchSalesData();
  },

  // 查看详细报表
  viewDetailedReport() {
    wx.navigateTo({
      url: `/admin/pages/reports/detailed?dateRange=${this.data.dateRange}&startDate=${this.data.startDate}&endDate=${this.data.endDate}`
    });
  },

  // 查看智能补货建议
  viewRestockSuggestions() {
    wx.navigateTo({
      url: '/admin/pages/reports/restock-suggestions'
    });
  }
});
