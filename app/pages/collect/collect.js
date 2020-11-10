const req = require("../../utils/req");

// pages/collect/collect.js
Page({
  data: {
    token:'',
    user:'',
    userid:'',
    length:'',
    collection:'',
    flag:false
  },

  onLoad: function (options) {
    //进入页面后取出存在storage中的user信息以及token，
    // 然后调用收藏接口查看收藏的文章
    let that=this;
    wx.getStorage({
      key: 'token',
      success(res){
        // console.log(res.data)
        that.setData({
          token: res.data
        })
      }
    });
    wx.getStorage({
      key: 'user',
      success(res){
        // console.log(res)
        that.setData({
          user: res.data,
          userid:res.data._id
        });
        // console.log(that.data.userid)
      }
    });
  },

  //查看我的收藏
  mycollect(){
    this.setData({
      flag:true
    });
    
    let that = this;
    req({
      interface:'mycoll',
      data:{
        userid:that.data.userid
      },
      header:{
        "token":that.data.token,
        "content-type":"application/x-www-form-urlencoded"
      },
      onsuccess(res){
        // console.log(res.data.data)
        that.setData({
          collection:res.data.data
        })     
      }
    })
  },

  //退出登录
  quit(){
    wx.removeStorage({
      key: 'token',
    })
    wx.redirectTo({
      url: '../demo1/demo1',
    })
  }
})