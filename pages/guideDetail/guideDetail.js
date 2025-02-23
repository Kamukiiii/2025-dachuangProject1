const db = wx.cloud.database()
Page({
  data:{
    guide_name:'',
    guide_photo:'',
    guide_desc:'',
    guide_tel:''
  },
  onLoad(options){
    //console.log("获取到的参数",options)
    let guide_id = options.id
    db.collection('guidelist').doc(guide_id).get()
    .then(res => {
      //console.log("获取导游数据成功",res.data)
      this.setData({
        guide_name:res.data.name,
        guide_photo:res.data.photo,
        guide_desc:res.data.desc,
        guide_tel:res.data.telephone
      })
    })
    .catch(res => {
      console.log("获取导游数据失败",res)
    })
  }
})