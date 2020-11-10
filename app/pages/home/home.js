const app = getApp();
var that = this;

const req = require('../../utils/req')

Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    token:'',
    name:'',
    newsid:'',
    news:[],
    tabs: ["文化", "军事", "汽车","时政"],
    activeIndex: 0
  },

  onLoad: function(options) {
    let that = this;
    wx.getStorage({key: 'token',
      success(res){
        // console.log(res.data)
        that.setData({
          token: res.data
        });

    let t = new Date()
    let time = t.getFullYear()+ '-' + (t.getMonth()+1) + '-' +t.getDate()
    req({
      interface:'get_news',
      data:{
        type:that.data.tabs[0],
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
        // console.log(res)
      }
    })
      }
    })
  },


  tabClick: function(e) {
    that = this;
    that.setData({
      activeIndex: e.currentTarget.id
    })
    // console.log(e.target.dataset.name)  //当前点击事件的详细内容
    // console.log(that.data.token)
    let t = new Date()
    let time = t.getFullYear()+ '-' + (t.getMonth()+1) + '-' +t.getDate()
    req({
      interface:'get_news',
      data:{
        type:e.target.dataset.name,
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
  },
  search(){
    wx.navigateTo({
      url: '../search/search',
    })
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