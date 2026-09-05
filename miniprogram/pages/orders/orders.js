const { dishes } = require('../../data/dishes')
const { listOrders, toggleOrder, decorateDishes } = require('../../utils/orders')

Page({
  data: { orderedDishes: [], member: null, loading: true, totalPeople: 0 },
  onShow() {
    this.setData({ member: getApp().globalData.member })
    this.refreshOrders()
  },
  onPullDownRefresh() { this.refreshOrders(true) },
  refreshOrders(stopRefresh = false) {
    listOrders().then(orders => {
      const orderedDishes = decorateDishes(dishes, orders, this.data.member).filter(item => item.orderCount > 0)
      const totalPeople = new Set(orders.map(item => item.memberId)).size
      this.setData({ orderedDishes, totalPeople, loading: false })
    }).catch(() => wx.showToast({ title: '菜单同步失败', icon: 'none' }))
      .finally(() => { if (stopRefresh) wx.stopPullDownRefresh() })
  },
  openDetail(event) { wx.navigateTo({ url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}` }) },
  cancel(event) {
    if (!this.data.member) {
      wx.showToast({ title: '请先到所有菜页面选择身份', icon: 'none' })
      return
    }
    toggleOrder(event.currentTarget.dataset.id, this.data.member).then(() => {
      wx.showToast({ title: '已取消', icon: 'none' })
      this.refreshOrders()
    }).catch(() => wx.showToast({ title: '操作失败', icon: 'none' }))
  },
  goBrowse() { wx.switchTab({ url: '/pages/index/index' }) }
})
