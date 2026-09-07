# 点个菜吧

一个给家人使用的微信小程序：查看预置菜品和原料，选择自己的家庭身份，点菜或取消，并查看全家的共享菜单。

Family meal-ordering mini program for browsing dishes, checking ingredients, and sharing everyone's choices.

## 当前功能

- 所有菜：分类浏览 7 道示例菜，查看当前点菜人和人数
- 菜品详情：查看介绍及完整原料清单
- 家庭身份：首次进入选择“妈妈 / 爸爸 / 我 / 奶奶”，之后自动记住
- 点菜：每位成员对每道菜只能点一次，也只能取消自己的选择
- 已点菜单：只展示至少一人选择的菜，下拉可同步最新结果
- 双模式：不开云开发即可本机体验；配置云开发后可在家人手机间共享

## 先在本地验收

1. 安装并打开“微信开发者工具”。
2. 选择“导入项目”，目录选本仓库根目录。
3. 没有 AppID 时可先用测试号导入；项目已设置 `touristappid`。
4. 编译后，首次进入选择一个家庭成员。
5. 测试分类、详情、点菜、取消和“已点菜单”两个标签页。





## 修改家人和菜品

- 家庭成员：编辑 `miniprogram/data/members.js`
- 菜品、分类、原料：编辑 `miniprogram/data/dishes.js`

每道菜的 `id` 必须唯一，已经上线并产生点菜记录后不要随意修改。


## 目录结构

```text
miniprogram/          小程序页面、样式和预置数据
cloudfunctions/orders 云端点菜记录接口
project.config.json   微信开发者工具项目配置
```

## 开发检查

电脑安装 Node.js 后可运行：

```bash
node tests/check-project.js
```
