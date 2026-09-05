const { dishes, categories } = require('../../data/dishes')
const members = require('../../data/members')
const { listOrders, toggleOrder, decorateDishes } = require('../../utils/orders')

Page({
  data: {
    categories,
    activeCategory: '全部',
    visibleDishes: [],
    orders: [],
    member: null,
    members,
    showMemberSheet: false,
    loading: true,
    cloudEnabled: false
  },

  onLoad() {
    const app = getApp()
    const member = app.globalData.member
    this.setData({
      member,
      showMemberSheet: !member,
      cloudEnabled: app.globalData.cloudEnabled
    })
  },

  onShow() { this.refreshOrders() },
  onPullDownRefresh() { this.refreshOrders(true) },

  refreshOrders(stopRefresh = false) {
    listOrders().then(orders => {
      this.setData({ orders, loading: false })
      this.applyFilter()
    }).catch(() => {
      wx.showToast({ title: '菜单同步失败', icon: 'none' })
      this.setData({ loading: false })
    }).finally(() => {
      if (stopRefresh) wx.stopPullDownRefresh()
    })
  },

  applyFilter() {
    const { activeCategory, orders, member } = this.data
    const source = activeCategory === '全部' ? dishes : dishes.filter(item => item.category === activeCategory)
    this.setData({ visibleDishes: decorateDishes(source, orders, member) })
  },

  chooseCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.category })
    this.applyFilter()
  },

  openDetail(event) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}` })
  },

  openMemberSheet() { this.setData({ showMemberSheet: true }) },
  closeMemberSheet() {
    if (this.data.member) this.setData({ showMemberSheet: false })
  },

  selectMember(event) {
    const member = members.find(item => item.id === event.currentTarget.dataset.id)
    getApp().globalData.member = member
    wx.setStorageSync('familyMember', member)
    this.setData({ member, showMemberSheet: false })
    this.applyFilter()
    wx.showToast({ title: `你好，${member.name}`, icon: 'none' })
  },

  toggle(event) {
    const member = this.data.member
    if (!member) {
      this.setData({ showMemberSheet: true })
      return
    }
    const dishId = event.currentTarget.dataset.id
    toggleOrder(dishId, member).then(result => {
      this.setData({ orders: result.orders })
      this.applyFilter()
      wx.showToast({ title: result.selected ? '已点这道菜' : '已取消', icon: 'none' })
    }).catch(() => wx.showToast({ title: '操作失败，请重试', icon: 'none' }))
  },

  goOrders() { wx.switchTab({ url: '/pages/orders/orders' }) },
  swallow() {}
})
