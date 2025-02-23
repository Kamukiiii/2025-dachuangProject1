const db = wx.cloud.database()
Page({
  data:{
    guidelist:[],
    service:[]
  },
  onLoad(){
    db.collection('guidelist').get()
    .then(res => {
      let Listdata = res.data
      //console.log("获取成功",Listdata)
      this.setData({
        guidelist:Listdata
      })
    }).catch(res => {
      console.log("获取失败",res)
    }),
    db.collection('service').get()
    .then(res => {
      console.log("service获取成功",res.data)
      this.setData({
        service : res.data
      })
    })
    .catch(res => {
      console.log("service获取失败",res)
    })
  },
  getId(e){
    let id = e.currentTarget.dataset.id
    console.log("获取ID成功",id)
    wx.navigateTo({
      url: '/pages/guideDetail/guideDetail?id='+ id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  GoAi(){
    wx.navigateTo({
      url: '/pages/AiDetail/AiDetail',
    })
  }
  
})