function actJudge(wx,callBack){
  console.log(111)
  var isls = false
  /****************情人节重新登陆判断******************/
  /*if(wx.getStorageSync('tnop257') != 0){
    isls = true
  }else{
    isls = false
  }
  if(wx.getStorageSync('tnop258') != 0){
    isls = true
  }else{
    isls = false
  }*/
  /****************情人节重新登陆判断******************/
  /****************情人节重新登陆判断******************/
  if(wx.getStorageSync('tnop255') != 0){
    isls = true
  }else{
    isls = false
  }
  if(wx.getStorageSync('tnop256') != 0){
    isls = true
  }else{
    isls = false
  }
  console.log(isls)
  callBack(isls)
  /****************情人节从新登陆判断******************/
}

module.exports = {
  actJudge: actJudge
}


