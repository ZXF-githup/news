const req = require("../../utils/request")

Page({
  data: {
    username:"",
    pw:""
  },

  binduser(e){   //双向绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    // console.log(this.data);
  },

  bindpw(e){   //双向绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    // console.log(this.data);
  },

  login(){
    if(this.data.username&&this.data.pw){
    let that=this;
    req({
      interface:'login',
      data:{
      username:that.data.username,
      pw:that.data.pw
      },
      onsuccess(res){
        // console.log(res);
        wx.setStorage({
          key:"token", 
          data:res.data.data.token
        })
        wx.setStorage({
          key:"user", 
          data:res.data.data.user
        })
        if(res.data.status=="success"){
          wx.switchTab({
            url: '../home/home',
          })
        }else{
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
        
      }
    })
    }else{
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  }
})
