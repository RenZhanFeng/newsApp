//批量加载请求方法到文件中
const requireApi = require.context(
	//api目录的相对路径
	'.', 
	//是否查询子目录
	false, 
	//查询文件的后缀
	/.js$/
)
//自动加载api目录下除了index.js以外的全部文件里边的方法并输出
let module = {}
requireApi.keys().forEach((key,index)=>{
	if(key === './index.js'){return}
	Object.assign(module,requireApi(key))
})

export default module

