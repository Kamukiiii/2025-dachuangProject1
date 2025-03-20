// index.js
Page({
  data:{
    status:'none',
    isshow:true
  },
  showCard1(){
    this.setData({
      status:"ruby"
    })
  },
  onScroll(e){
   let height =  e.detail.scrollTop
   if(height >= 100){
     this.setData({
      isshow:false
     })
   }else{
     this.setData({
       isshow:true
     })
   }
  },
  goNet(){
    wx.navigateTo({
      url: '/pages/Pano/Pano',
    })
  }
})
