
const req = require("../../utils/request")

Page({
  data: {
    username:'',
    pw1:'',
    pw2:'',
    img:{},
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

  bindpw1(e){   //双向绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    // console.log(this.data);
  },
  bindpw2(e){   //双向绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    // console.log(this.data);
  },

  reg(){
    if(this.data.username&&this.data.pw1){
      if(this.data.pw1===this.data.pw2){
        req({
          interface:'reg',
          data:{
            username:this.data.username,
            pw:this.data.pw1
          },
          onsuccess(res){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000//持续的时间
            })
          }
        })
      }else{
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }else{
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  },

  choose:function(){
    // console.log(wx.chooseMessageFile)
    var that = this;
    wx.showActionSheet({
      itemList: ['相册中选取', '拍照'],
      success (res) {
        // console.log(res)
        wx.chooseMessageFile({
          count: 1,
          type:'image',
          success:function(res){
            that.setData({
              img:res.tempFiles[0]
            })
          }
        })
       
      }
    })
  }
})