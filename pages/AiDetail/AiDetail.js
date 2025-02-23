Page({
  data:{
    incontent:'', //输入的内容
    outcontent:''  //输出的内容
  },
  getincontent(e){
    //console.log(e.detail.value)
    this.setData({
      incontent:e.detail.value
    })
  },
  async generateAi(){
    const hy = wx.cloud.extend.AI.createModel("deepseek"); // 创建模型
    const res = await hy.streamText({
      data: {
        model: "deepseek-r1",
        messages: [
          {
            role: "user",
            content: this.data.incontent
          }
        ]
      }
    });
    let fullText = ""; // 存储完整的文本
    for await (let str of res.textStream) {
      fullText += str
      this.setData({
        outcontent:fullText
      })
    }
    // 清空输入框内容
    this.setData({
      incontent: ""
    });
    
}

})