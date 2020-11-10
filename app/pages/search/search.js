// pages/search/search.js
const req = require('../../utils/req')

Page({
  data: {
    news:[],
    token:'',
    keys:'',
    newsid:'',
    searchlist:''
  },

  inputedit(e){   //双向绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    // console.log(this.data);
  },

  /** 生命周期函数--监听页面加载 **/
  onLoad: function(options) {

    //首先在进入页面时调取参数token，以便后续的操作
    let that = this;
    wx.getStorage({key: 'token',
      success(res){
        // console.log(res.data)
        that.setData({
          token: res.data
        });

    //默认在页面跳转至搜索处时，列表显示所有种类新闻
    let t = new Date()
    let time = t.getFullYear()+ '-' + (t.getMonth()+1) + '-' +t.getDate()
    req({
      interface:'get_news',
      data:{
        type:"所有",
        time:time
      },
      header:{
        "token":that.data.token,
        "content-type":"application/x-www-form-urlencoded"
      }, 
      onsuccess(res){ 
        for(let i of res.data.data.list){
          // console.log(i.time)
          let t=new Date(parseInt(i.time));
          let tt=t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日'
          // console.log(tt)
          i.time=tt;
        }
        that.setData({
          news:res.data.data.list
        })
      }
    })
    }
    })
  },

  lookfor(){
      if(this.data.keys){
      // console.log(this.data.keys)
      let that = this;
      let t = new Date()
      let time = t.getFullYear()+ '-' + (t.getMonth()+1) + '-' +t.getDate()
      req({
        interface:'search',
        data:{
          keyword:that.data.keys,
        },
        header:{
          "token":that.data.token,
          "content-type":"application/x-www-form-urlencoded"
        }, 
        onsuccess(res){ 
          for(let i of res.data.data){
            // console.log(i.time)
            let t=new Date(parseInt(i.time));
            let tt=t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日'
            // console.log(tt)
            i.time=tt;
          }
          that.setData({
            news:res.data.data
            // searchlist:res.data.data
          })
          // console.log(res.data.data)
        }
      })
    }
  },

  Goinfo(e){
    // console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.setStorage({
      data:id,
      key: 'newsid',
    })
    // console.log(id)
    wx.navigateTo({
      url: '../info/info?newsid='+id,
    })
  }



})
