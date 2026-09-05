App({
  globalData: {
    cloudEnabled: false,
    member: null
  },

  onLaunch() {
    const member = wx.getStorageSync('familyMember') || null
    this.globalData.member = member

    if (wx.cloud) {
      // 上线前在微信开发者工具中创建云环境，并把环境 ID 填在这里。
      const env = ''
      if (env) {
        wx.cloud.init({ env, traceUser: true })
        this.globalData.cloudEnabled = true
      }
    }
  }
})
