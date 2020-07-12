'use strict';
const db = uniCloud.database()
//聚合的操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event

	let matchObj = {}
	if (name !== '推荐') {
		matchObj = {
			classify: name
		}
	}
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	//聚合：更精细化去处理数据（求和，分组，指定字段)
	const list = await db.collection('article')
		.aggregate()
		//追加字段
		.addFields({
			is_like: $.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			content: false
		})
		//计算出我们要跳过多少数据
		.skip(pageSize * (page - 1))
		//控制要返回的数据条数
		.limit(pageSize)
		.end()

	//获取全部的数据
	// const list = await db.collection('article')
	// .field({
	//  //true表示只返回该字段，false表示不返回
	//  content:false //这里不需要返回文章内容
	// })
	// .get()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
