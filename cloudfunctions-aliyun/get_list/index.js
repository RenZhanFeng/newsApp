'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
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
	//聚合：更精细化去处理数据（求和，分组，指定字段)
	const list = await db.collection('article')
		.aggregate()
		.match(matchObj)
		.project({
			content: false
		})
		//计算出我们要跳过多少数据
		.skip(pageSize * (page - 1))
		//控制要返回的数据
		.limit(pageSize)
		.end()


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
