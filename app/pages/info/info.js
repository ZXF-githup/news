// pages/info/info.js
const req = require('../../utils/req')

Page({
  data: {
    newsinfo:'',
    token:'',
    newsid:'',
    type:'',
    collectmsg:''
  },

  /** 生命周期函数--监听页面加载 **/
  onLoad: function(options) {

    //首先在进入页面时调取参数id，以便后续的操作
    wx.getStorage({
      key: 'newsid',
      success(res){
        // console.log(res.data)
        that.setData({
          newsid: res.data
        });
      }
    })

    //首先在进入页面时调取参数token，以便后续的操作
    let that = this;
    wx.getStorage({
      key: 'token',
      success(res){
        // console.log(res.data)
        that.setData({
          token: res.data
        });
        req({
          interface:'newsinfo',
          data:{
            newsid:that.data.newsid,
          },
          header:{
            "token":that.data.token,
            "content-type":"application/x-www-form-urlencoded"
          }, 
          onsuccess(res){ 
            let info=res.data.data;
            info.context=info.context.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"')
            // console.log(info.time)
            let t=new Date(parseInt(info.time));
            let tt=t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日'
            // console.log(tt)
            info.time=tt;
            // console.log(info)
            that.setData({
              newsinfo:res.data.data,
              type:res.data.data.type
            })
            // console.log(that.data.newsinfo.context)

            //进入详情页页面，调取收藏接口查看收藏返回信息
            req({
              interface:'checkcollect',
              data:{
                newsid:that.data.newsid
              },
              header:{
                "token":that.data.token,
                "content-type":"application/x-www-form-urlencoded"
              },
              onsuccess(res){
                // console.log(res)
                that.setData({
                  collectmsg:res.data.msg
                })
              }
            })
          }
        })
      }
    }) 
  },
  collect(){
    let that = this
    // console.log('sdgfgfs')
    if(that.data.collectmsg=="未收藏"){
      req({
        interface:'collect',
        data:{
          newsid:that.data.newsid,
          type:1
        },
        header:{
          "token":that.data.token,
          "content-type":"application/x-www-form-urlencoded"
        },
        onsuccess(res){
          // console.log(res)
          req({
            interface:'checkcollect',
            data:{
              newsid:that.data.newsid
            },
            header:{
              "token":that.data.token,
              "content-type":"application/x-www-form-urlencoded"
            },
            onsuccess(res){
              // console.log(res)
              that.setData({
                collectmsg:res.data.msg
              })
            }
          })
        }
      })
    }else{
      req({
        interface:'collect',
        data:{
          newsid:that.data.newsid,
          type:2
        },
        header:{
          "token":that.data.token,
          "content-type":"application/x-www-form-urlencoded"
        },
        onsuccess(res){
          // console.log(res)
          req({
            interface:'checkcollect',
            data:{
              newsid:that.data.newsid
            },
            header:{
              "token":that.data.token,
              "content-type":"application/x-www-form-urlencoded"
            },
            onsuccess(res){
              console.log(res)
              that.setData({
                collectmsg:res.data.msg
              })
            }
          })
        }
      })
    }
    
  
  }
  




})