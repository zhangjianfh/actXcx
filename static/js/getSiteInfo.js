/**
 * 通过经纬度 查询当前城市
 * @param wx ：微信接口
 * @param lon : 经度
 * @param lat ：纬度
 * @returns {Promise<any>}
 */
function getSiteInfos(wx,lon,lat){
  return new Promise((resolve, reject)=>{
    wx.request({
      method: 'POST',
      url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+lon+','+lat+'&key=1d29d375148b3db64ce7cc779689d5a0',
      header: { 'content-type': 'application/json' },
      success(res) {
        console.log('------------------------================')
        console.log(res)
        resolve(res)
      },
      fail(f) {
        reject(f)
      }
    })
  })
}

module.exports = {
  getSiteInfos:getSiteInfos,
}
