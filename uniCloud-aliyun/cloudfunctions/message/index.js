'use strict';
const db = uniCloud.database();
// 获取 `message` 集合的引用
const collection = db.collection('message');
const user = db.collection('user');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if(event.type == 'add'){          //判断是否为新增消息
		
		let userInfo = await user.where({      //通过openid查询用户表中的用户信息 并插入到消息列表中对应的消息中
		  openid: event.openid,
		}).get()
		
			let res = collection.add({
				text:event.text,
				time:event.time,
				name:userInfo.data[0].name,
				avatarUrl:userInfo.data[0].avatarUrl
			})
		return res
		
	}else if(event.type == 'del'){
		
		let res = await collection.where({
			_id:event.id
		}).remove()
		return res
	}
	else{
		let res = await collection.get()
		return res
	}
	
	
	
	//返回数据给客户端
	// return res
};
