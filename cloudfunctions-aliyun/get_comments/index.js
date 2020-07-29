'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: article_id
	})
	.unwind('$comments')
	.project({
		_id: 0,
		comments: 1
	})
	.replaceRoot({
		newRoot:'$comments'
	})
	.end()
	
	return {
		code: 200,
		msg: '数据更新成功',
		data: list.data
	}
};
