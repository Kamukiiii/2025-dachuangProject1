Page({
  data:{
    datalist:[]
  },
  //页面每次展示前都再渲染一遍就可以了
  onShow(){
    wx.cloud.database().collection('commentList').get()
    .then(res => {
      this.setData({
        datalist:res.data
      })
    })
    .catch(res => {
      console.log("fail",res)
    })
  },
  //跳转到详情页
  GoComdetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comDetail/comDetail?id=' + id
    })
  },
  //跳转到发表文章页
  GoAddText(){
    let userInfo = wx.getStorageSync('userinfo')
    if(userInfo && userInfo.nickName){
      wx.navigateTo({
        url: '/pages/addText/addText'
      })
    }else{
      wx.showModal({
        title: '请先登录',
        confirmText:'去登录',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/login/login',
            })
          }else if (res.cancel){
            return
          }
        }
      })
    }
    
  }
})