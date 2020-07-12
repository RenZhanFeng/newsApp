//进一步封装网络请求
export default function $http(options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id:"5f01a335e9159b00010797e1",
		...data
	}
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name: url,
			data:dataObj
		}).then(res => {
			if (res.result.code === 200) {
				reslove(res.result)
			} else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}
