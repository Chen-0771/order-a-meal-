const dishes = [
  {
    id: 'tomato-egg', name: '番茄炒蛋', category: '家常菜', emoji: '🍅',
    color: '#FFE0D3', subtitle: '酸甜下饭 · 15 分钟', description: '家里最熟悉的一口，番茄软嫩多汁，鸡蛋蓬松鲜香。',
    ingredients: [
      { name: '番茄', amount: '3 个' }, { name: '鸡蛋', amount: '4 个' },
      { name: '盐', amount: '适量' }, { name: '白糖', amount: '1 小勺' }, { name: '食用油', amount: '适量' }
    ]
  },
  {
    id: 'braised-pork', name: '红烧肉', category: '荤菜', emoji: '🥩',
    color: '#F3D1C2', subtitle: '软糯浓香 · 60 分钟', description: '慢火收出油亮酱汁，肥而不腻，适合全家一起分享。',
    ingredients: [
      { name: '五花肉', amount: '600 克' }, { name: '冰糖', amount: '25 克' },
      { name: '生抽', amount: '2 勺' }, { name: '老抽', amount: '1 勺' }, { name: '姜', amount: '5 片' }
    ]
  },
  {
    id: 'cola-wings', name: '可乐鸡翅', category: '荤菜', emoji: '🍗',
    color: '#F6D7AE', subtitle: '咸甜入味 · 35 分钟', description: '鸡翅鲜嫩、酱汁浓郁，是大人孩子都喜欢的轻松家常菜。',
    ingredients: [
      { name: '鸡中翅', amount: '10 个' }, { name: '可乐', amount: '330 毫升' },
      { name: '生抽', amount: '2 勺' }, { name: '姜', amount: '4 片' }, { name: '料酒', amount: '1 勺' }
    ]
  },
  {
    id: 'garlic-broccoli', name: '蒜蓉西兰花', category: '素菜', emoji: '🥦',
    color: '#DDEBCF', subtitle: '清爽脆嫩 · 12 分钟', description: '保留蔬菜的清甜和爽脆，用蒜香提味，简单又耐吃。',
    ingredients: [
      { name: '西兰花', amount: '1 颗' }, { name: '大蒜', amount: '5 瓣' },
      { name: '盐', amount: '适量' }, { name: '食用油', amount: '适量' }
    ]
  },
  {
    id: 'tofu', name: '家常豆腐', category: '素菜', emoji: '⬜',
    color: '#F5E7C5', subtitle: '外香里嫩 · 25 分钟', description: '豆腐煎出金黄外皮，再裹上咸香酱汁，下饭刚刚好。',
    ingredients: [
      { name: '老豆腐', amount: '1 块' }, { name: '青椒', amount: '1 个' },
      { name: '木耳', amount: '一小把' }, { name: '生抽', amount: '1 勺' }, { name: '淀粉', amount: '1 小勺' }
    ]
  },
  {
    id: 'winter-melon-soup', name: '冬瓜肉丸汤', category: '汤类', emoji: '🥣',
    color: '#D9ECE8', subtitle: '清鲜暖胃 · 30 分钟', description: '汤清味鲜，冬瓜软嫩，肉丸弹润，适合搭配一家人的晚饭。',
    ingredients: [
      { name: '冬瓜', amount: '500 克' }, { name: '猪肉馅', amount: '300 克' },
      { name: '小葱', amount: '2 根' }, { name: '姜', amount: '3 片' }, { name: '盐', amount: '适量' }
    ]
  },
  {
    id: 'egg-fried-rice', name: '蛋炒饭', category: '主食', emoji: '🍚',
    color: '#F6E7B8', subtitle: '粒粒分明 · 15 分钟', description: '用隔夜米饭快速完成，鸡蛋葱香包住每一粒米。',
    ingredients: [
      { name: '米饭', amount: '2 碗' }, { name: '鸡蛋', amount: '2 个' },
      { name: '小葱', amount: '2 根' }, { name: '盐', amount: '适量' }, { name: '食用油', amount: '适量' }
    ]
  }
]

const categories = ['全部', '家常菜', '荤菜', '素菜', '汤类', '主食']

function getDish(id) {
  return dishes.find(item => item.id === id)
}

module.exports = { dishes, categories, getDish }
