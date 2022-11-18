// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isLoadding: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    }),
    this.getShopList()
  },

  getShopList(){
    // 节流 开启
    this.setData({
      isLoadding: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limt: this.data.pageSize
      },
      success: (res) => {
        console.log(res)
        this.setData({
          shopList: [...this.data.shopList,...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: () =>{
        // 隐藏loadding
        wx.hideLoading()
        // 节流 关闭
        this.setData({
          isLoadding: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log('ok')
    // 节流判断，true的时候，正在节流，跳出
    if(this.data.isLoadding) return

    this.setData({
      page: this.data.page + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})