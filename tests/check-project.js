const assert = require('assert')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const appConfig = JSON.parse(fs.readFileSync(path.join(root, 'miniprogram/app.json'), 'utf8'))
const { dishes, categories, getDish } = require('../miniprogram/data/dishes')

for (const page of appConfig.pages) {
  for (const extension of ['js', 'json', 'wxml', 'wxss']) {
    assert.ok(fs.existsSync(path.join(root, 'miniprogram', `${page}.${extension}`)), `页面文件缺失: ${page}.${extension}`)
  }
}

const ids = dishes.map(item => item.id)
assert.strictEqual(new Set(ids).size, ids.length, '菜品 id 必须唯一')
assert.ok(dishes.length > 0, '至少需要一道菜')
assert.ok(categories.includes('全部'), '分类必须包含“全部”')

for (const dish of dishes) {
  assert.ok(dish.name && dish.category && dish.emoji, `菜品字段不完整: ${dish.id}`)
  assert.ok(categories.includes(dish.category), `未知分类: ${dish.category}`)
  assert.ok(Array.isArray(dish.ingredients) && dish.ingredients.length > 0, `菜品没有原料: ${dish.id}`)
  assert.strictEqual(getDish(dish.id), dish)
}

let storedOrders = []
global.wx = {
  getStorageSync: () => storedOrders,
  setStorageSync: (_key, value) => { storedOrders = value }
}
global.getApp = () => ({ globalData: { cloudEnabled: false } })

const orders = require('../miniprogram/utils/orders')
const member = { id: 'tester', name: '测试成员', emoji: '🙂' }

async function checkOrders() {
  let result = await orders.toggleOrder(dishes[0].id, member)
  assert.strictEqual(result.selected, true)
  assert.strictEqual(result.orders.length, 1)

  const decorated = orders.decorateDishes([dishes[0]], result.orders, member)[0]
  assert.strictEqual(decorated.selected, true)
  assert.strictEqual(decorated.orderCount, 1)
  assert.strictEqual(decorated.memberNames, member.name)

  result = await orders.toggleOrder(dishes[0].id, member)
  assert.strictEqual(result.selected, false)
  assert.strictEqual(result.orders.length, 0)
  console.log(`项目检查通过：${appConfig.pages.length} 个页面，${dishes.length} 道菜，点菜/取消逻辑正常。`)
}

checkOrders().catch(error => {
  console.error(error)
  process.exitCode = 1
})
