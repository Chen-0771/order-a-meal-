const { getDish } = require('../../data/dishes')
const { listOrders, toggleOrder, decorateDishes } = require('../../utils/orders')

Page({
  data: { dish: null, member: null, selected: false, orderCount: 0, memberNames: '', busy: false },
  onLoad(options) {
    const dish = getDish(options.id)
    if (!dish) {
      wx.showToast({ title: '没有找到这道菜', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }
    this.setData({ dish })
  },
  onShow() {
    this.setData({ member: getApp().globalData.member })
    this.refresh()
  },
  refresh() {
    if (!this.data.dish) return
    listOrders().then(orders => {
      const dish = decorateDishes([this.data.dish], orders, this.data.member)[0]
      this.setData({ selected: dish.selected, orderCount: dish.orderCount, memberNames: dish.memberNames })
    })
  },
  toggle() {
    if (this.data.busy) return
    if (!this.data.member) {
      wx.showModal({ title: '先选择身份', content: '请返回“所有菜”页面选择你是谁，再来点菜。', showCancel: false })
      return
    }
    this.setData({ busy: true })
    toggleOrder(this.data.dish.id, this.data.member).then(result => {
      const dish = decorateDishes([this.data.dish], result.orders, this.data.member)[0]
      this.setData({ selected: dish.selected, orderCount: dish.orderCount, memberNames: dish.memberNames })
      wx.showToast({ title: result.selected ? '已点这道菜' : '已取消', icon: 'none' })
    }).catch(() => wx.showToast({ title: '操作失败，请重试', icon: 'none' }))
      .finally(() => this.setData({ busy: false }))
  }
})
