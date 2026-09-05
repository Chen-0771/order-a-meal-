const STORAGE_KEY = 'familyMenuOrders'

function normalize(list) {
  return Array.isArray(list) ? list : []
}

function localList() {
  return normalize(wx.getStorageSync(STORAGE_KEY))
}

function callCloud(action, data = {}) {
  return wx.cloud.callFunction({ name: 'orders', data: { action, ...data } })
    .then(res => res.result)
}

function listOrders() {
  const app = getApp()
  if (!app.globalData.cloudEnabled) return Promise.resolve(localList())
  return callCloud('list').then(result => normalize(result.orders))
}

function toggleOrder(dishId, member) {
  const app = getApp()
  if (app.globalData.cloudEnabled) {
    return callCloud('toggle', { dishId, member }).then(result => ({
      selected: result.selected,
      orders: normalize(result.orders)
    }))
  }

  const orders = localList()
  const index = orders.findIndex(item => item.dishId === dishId && item.memberId === member.id)
  let selected
  if (index >= 0) {
    orders.splice(index, 1)
    selected = false
  } else {
    orders.push({
      _id: `${dishId}-${member.id}`,
      dishId,
      memberId: member.id,
      memberName: member.name,
      memberEmoji: member.emoji,
      createdAt: Date.now()
    })
    selected = true
  }
  wx.setStorageSync(STORAGE_KEY, orders)
  return Promise.resolve({ selected, orders })
}

function decorateDishes(dishes, orders, member) {
  return dishes.map(dish => {
    const dishOrders = orders.filter(item => item.dishId === dish.id)
    return {
      ...dish,
      orderCount: dishOrders.length,
      memberNames: dishOrders.map(item => item.memberName).join('、'),
      selected: Boolean(member && dishOrders.some(item => item.memberId === member.id))
    }
  })
}

module.exports = { listOrders, toggleOrder, decorateDishes }
