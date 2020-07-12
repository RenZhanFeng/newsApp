'use strict';
const db = uniCloud.database()
//数据库的操作符，可以对数据进行数组操作字符串操作或者对数字操作
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id, //收藏者的ID
		article_id //收藏的文章ID
	} = event
	
	//获取该用户数据
	const userInfo = await db.collection('user').doc(user_id).get()
	//获取该用户数据里边的"文章收藏"数据
	const article_id_ids = userInfo.data[0].article_likes_ids
	let dbCmdFuns = null
	//判断用户是否收藏过该文章，如果收藏就取消，反则收藏
	if (article_id_ids.includes(article_id)) {
		dbCmdFuns = dbCmd.pull(article_id)
	} else {
		dbCmdFuns = dbCmd.addToSet(article_id)
	}
	//更新数据
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})

	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo.data[0],
		likeList: userInfo.data[0].article_likes_ids
	}
};
