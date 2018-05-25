var crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  //   console.log(this.appId)
  // console.log(this.sessionKey)
  // console.log(encryptedData)
  // console.log(iv)
  var sessionKey = new Buffer(this.sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  console.log(sessionKey)
  console.log(encryptedData)
  console.log(iv)

  try {
     // 解密

    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    console.log(decipher)
    // // 设置自动 padding 为 true，删除填充补位
    // decipher.setAutoPadding(true)
    // var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    // decoded += decipher.final('utf8')


    // decoded = JSON.parse(decoded)


    // decoded = {
    //     msg: 'hello',
    //     watermark: {
    //         appid: appid
    //     }
    // }

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = WXBizDataCrypt
