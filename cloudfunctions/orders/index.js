const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const collection = db.collection('orders')

async function list() {
  const result = await collection.orderBy('createdAt', 'asc').limit(200).get()
  return { orders: result.data }
}

exports.main = async (event) => {
  if (event.action === 'list') return list()

  if (event.action === 'toggle') {
    const { dishId, member } = event
    if (!dishId || !member || !member.id || !member.name) throw new Error('参数不完整')

    const existing = await collection.where({ dishId, memberId: member.id }).limit(1).get()
    let selected
    if (existing.data.length) {
      await collection.doc(existing.data[0]._id).remove()
      selected = false
    } else {
      await collection.add({
        data: {
          dishId,
          memberId: member.id,
          memberName: member.name,
          memberEmoji: member.emoji || '',
          createdAt: db.serverDate()
        }
      })
      selected = true
    }
    return { selected, ...(await list()) }
  }

  throw new Error('未知操作')
}
