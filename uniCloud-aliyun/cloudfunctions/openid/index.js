'use strict';

exports.main = async (event, context) => {

const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'   

let res = await uniCloud.httpclient.request(loginUrl, {  
  data: {  
    appid: 'xxxxxxxxxxxxxxxxxxxxx',  
    secret: 'xxxxxxxxxxxxxxxxxxxxx',  
    js_code: event.code,  
    grant_type: 'authorization_code'  
  },  
  dataType: 'json'  
  })  


let openid = res.data.openid  //用户openid

return openid
};