'use strict';
const db = uniCloud.database();
// 获取 `message` 集合的引用
const collection = db.collection('wish');
const user = db.collection('user');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if(event.type == 'add'){          //判断是否为新增消息
		
		let userInfo = await user.where({      //通过openid查询用户表中的用户信息 并插入到消息列表中对应的消息中
		  openid: event.openid,
		}).get()
		
		
			let res = collection.add({
				title:event.title,
				desc:event.desc,
				time:event.time,
				name:userInfo.data[0].name,
				avatarUrl:userInfo.data[0].avatarUrl,
				gender:userInfo.data[0].gender,
				status:event.status
			})
		return res
		
	}else if(event.type == 'get'){
		let res = await collection.where({
			status:event.status
		}).get()
		return res
	}else if(event.type == 'update'){
		let detail = await collection.doc(event._id)
		
		let res = detail.update({
			status:event.status
		})
		return res
	}
	
	//返回数据给客户端
	// return event
};
