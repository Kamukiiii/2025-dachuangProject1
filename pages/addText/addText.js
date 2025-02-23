const db = wx.cloud.database()
Page({
  data:{
    userPhoto:'',
    fileID:'',
    inpTitle:'',
    inpContent:''
  },
  //上传图片
  uploadPic() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        let tempFilePaths = res.tempFiles[0].tempFilePath;
  
        // 更新数据
        this.setData({
          userPhoto: tempFilePaths
        }, () => {
          // 在数据更新后执行上传操作
          wx.cloud.uploadFile({
            cloudPath: 'uploadPhoto/' + Date.now() + ".jpg",
            filePath: this.data.userPhoto // 文件路径
          }).then(res => {
            wx.hideLoading();
            let fileID = res.fileID;
            console.log(fileID);
            this.setData({
              fileID: fileID
            });
          }).catch(error => {
            // 处理错误
          });
        });
      }
    });
  }
  ,
  //上传标题和内容
  //1、获取标题内容
  getTitle(event){
    //console.log(event.detail.value)
    this.setData({
      inpTitle:event.detail.value
    })
  },
  //2、获取文本内容
  getDesc(event){
    this.setData({
      inpContent:event.detail.value
    })
  },
  //3、上传到数据库
  uploadArtile(){
    db.collection('commentList').add({
      data:{
        desc:this.data.inpContent,
        dianzan:false,
        photoUrl:[this.data.fileID],
        pinglun:[],
        shoucang:false,
        title: this.data.inpTitle
      }
    })
    .then(res => {
      wx.switchTab({
        url: '/pages/comments/comments',
      })
      console.log("上传文章成功",res)
    }).catch(res => {
      console.log("上传文章失败",res)
    })

  }
})