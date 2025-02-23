let ID = ''
let dianzan = false
let shoucang = false
let pinglun = ''  //临时存储数据库的评论

Page({
  data:{
    detail: '',
    loveUrl:'../../assets/icon/love.png',
    collectUrl:'../../assets/icon/collect.png',
    nowpinglun :'', //现在数据库中的评论 
    content:'',  //输入的评论
    avatarUrl:''
  },
  onLoad(options){
    //获取当前用户头像
    
    ID = options.id
    //console.log(options) //传入详情页的id
    wx.cloud.database().collection('commentList')
    .doc(ID)
    .get()
    .then(res => {
      //console.log("获取成功",res);
      this.setData({
        avatarUrl: wx.getStorageSync('userinfo').avatarUrl,
        detail:res.data,
        loveUrl:res.data.dianzan ? "../../assets/icon/selected-love.png":"../../assets/icon/love.png",
        collectUrl:res.data.shoucang ? "../../assets/icon/selected-collect.png":"../../assets/icon/collect.png"
      })
      //获取数据库中已存在的评论
      if(res.data.pinglun){
        pinglun = res.data.pinglun
        this.setData({
          nowpinglun : pinglun
        })
        //console.log('pinglun=',pinglun)
      }
    }).catch(res => {
      //console.log("获取失败",res);
    })
    
  },
  //点赞实现
  clickLove(){
    dianzan = !dianzan
    this.setData({
      loveUrl:dianzan ? "../../assets/icon/selected-love.png":"../../assets/icon/love.png"
    })
 
    wx.cloud.callFunction({
      name:"commentDetail_operator",
      data : {
        action:'dianzan',
        id:ID,
        dianzan:dianzan
      }
    })
    .then(res => {
      //console.log("改变点赞状态成功：",res)
    }).catch(res => {
      //console.log("改变点赞状态失败：",res)
    })
  },
//收藏实现
  clickCollect(){
    shoucang = !shoucang
    this.setData({
      collectUrl:shoucang ? "../../assets/icon/selected-collect.png":"../../assets/icon/collect.png"
    })
    wx.cloud.callFunction({
      //云函数名称
      name: 'commentDetail_operator',
      //传给云函数的参数
      data : {
        action:'shoucang',
        id:ID,
        shoucang:shoucang
      }
    })
    .then(res => {
      //console.log("改变收藏状态成功：",res)
    }).catch(res => {
      //console.log("改变收藏状态失败：",res)
    })
  },

  //获取评论
  getContent(event){
    let value = event.detail.value
    this.data.content =  value
  },
  //发表评论
  shareContent(){
    //1、判断用户是否登录
    let userInfo = wx.getStorageSync('userinfo')
    if(userInfo && userInfo.nickName){
      if(this.data.content.trim().length != 0){
        let newpinglun = {}
        newpinglun.name = userInfo.nickName
        newpinglun.content = this.data.content
        pinglun.push(newpinglun)
        //console.log(pinglun)
        wx.showLoading({
          title: '发表中。。。',
          mask: true,
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
        wx.cloud.callFunction({
          name:'commentDetail_operator',
          data:{
            action:'pinglun',
            id:ID,
            pinglun:pinglun 
          }
        }).then(res => {
          //console.log("发表成功",res)
          this.setData({
            nowpinglun : pinglun,
            content:''
          })
          wx.hideLoading()
        }).catch(res => {
          //console.log("发表失败",res)
          wx.hideLoading()
        })
      }else{
        wx.showToast({
          title: '内容不能为空',
          icon: 'error',
          duration:1000
        })
      }
    //2、若未登录，则先登录
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