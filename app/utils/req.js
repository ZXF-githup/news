module.exports = function(obj){
  wx.showLoading({
    title: '加载中',
  })

  wx.request({
    url: 'http://localhost:116/api/'+obj.interface,
    data:obj.data,
    header:obj.header,
    method:'POST',
    success(res){
      obj.onsuccess(res)
    },
    fail(err){
      // console.log('no')
      obj.onfail(err)
    },
    complete(){
      wx.hideLoading({
        success: (res) => {},
      })
      // console.log('always')
    }
  })
}