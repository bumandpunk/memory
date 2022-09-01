'use strict';
const db = uniCloud.database();
// 获取 `user` 集合的引用
const collection = db.collection('user');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	let res = await collection.add({
		name:event.name,
		avatarUrl:event.avatarUrl,
		openid:event.openid,
		gender:event.gender
	})
	//返回数据给客户端
	return event
};
