
// pages/login/login.js
const db = wx.cloud.database()
Page({
  data:{
    isHidden:true
  },
  onShow(){
    let userInfo = wx.getStorageSync('userinfo')
    if(userInfo&&userInfo.avatarUrl){
      this.setData({
        userInfo:userInfo
      })
    }else{

    }
  },
  getAvatar(e){
    this.setData({
      avatarUrl:e.detail.avatarUrl
    })
  },
  getName(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  //退出登录
  logout(e){
    this.setData({
      userInfo:null
    })
    wx.setStorageSync('userinfo', null)
  },
  //登录
  wxlogin(){
    this.setData({
      avatarUrl:"",
      nickname:"",
      isHidden:false
    })
  },
  // 弹窗部分逻辑
  //取消
  popNO(){
    this.setData({
      avatarUrl:"",
      nickname:"",
      isHidden:true
    })
  },
  //确认
  popYes(){
    let avatarUrl = this.data.avatarUrl
    let nickName = this.data.nickname
    if(!avatarUrl){
      wx.showToast({
        icon:'error',
        title: '请获取头像',
      })
      return
    }
    if(!nickName){
      wx.showToast({
        icon:'error',
        title: '请获取昵称',
      })
      return
    }
    db.collection('user').get()
    .then(res => {
      //console.log('是否注册过',res)
      if(res.data && res.data.length > 0 ){
        let item = res.data[0]
        //console.log(item)
        //已经注册过
        wx.cloud.uploadFile({
          cloudPath: nickName+'.png',
          filePath: avatarUrl, // 文件路径
        }).then(res => {
          // get resource ID
          //console.log(res.fileID)
          let userInfo = {}
          userInfo.avatarUrl = res.fileID
          userInfo.nickName = nickName
          wx.setStorageSync('userinfo', userInfo)
          //存储到云数据库
          db.collection('user')
          .doc(item._id)
          .update({
            data:userInfo
          }).then(res => {
            //console.log("res=",res);
            this.setData({
              isHidden:true,
              userInfo:userInfo
            })
          })
        }).catch(error => {
          // handle error
        })
      }else{
        wx.cloud.uploadFile({
          cloudPath: nickName+'.png',
          filePath: avatarUrl, // 文件路径
        }).then(res => {
          // get resource ID
          //console.log(res.fileID)
          let userInfo = {}
          userInfo.avatarUrl = res.fileID
          userInfo.nickName = nickName
          wx.setStorageSync('userinfo', userInfo)
          //存储到云数据库
          db.collection('user')
          .add({
            data:userInfo
          }).then(res => {
            //console.log("res=",res);
            this.setData({
              isHidden:true,
              userInfo:userInfo
            })
          })
         
        }).catch(error => {
          // handle error
        })

      }
    })
    
  }
})