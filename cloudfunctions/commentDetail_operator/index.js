// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  //收藏
  if(event.action == 'shoucang'){
    return await cloud.database().collection('commentList').doc(event.id)
    .update({
      data:{
        shoucang:event.shoucang
      }
    })
    .then(res => {
      console.log("改变收藏状态成功：",res)
      return res
    }).catch(res => {
      console.log("改变收藏状态失败：",res)
      return res
    })
    //评论
  }else if(event.action == 'pinglun'){
    return await cloud.database().collection('commentList').doc(event.id)
    .update({
      data:{
        pinglun:event.pinglun
      }
    })
    .then(res => {
      console.log("改变评论状态成功：",res)
      return res
    }).catch(res => {
      console.log("改变评论状态失败：",res)
      return res
    })
    //点赞
  }else{
    return await cloud.database().collection('commentList').doc(event.id)
    .update({
      data:{
        dianzan:event.dianzan
      }
    })
    .then(res => {
      console.log("改变点赞状态成功：",res)
      return res
    }).catch(res => {
      console.log("改变点赞状态失败：",res)
      return res
    })
  }
 
}