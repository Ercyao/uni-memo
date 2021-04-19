// 手动切换环境服务地址 (提交审核时，务必将此处改为prod)
const ENV = __wxConfig.envVersion // 'production';// process.env.NODE_ENV; //process.env.NODE_ENV
console.log('当前环境', process.env.NODE_ENV)
console.log('当前版本', __wxConfig.envVersion); // develop   trial  release
console.log('当前ENV', ENV);


const testApi = {
	BASE_URL: "https://www.jingjian168.com/test_apis/",
	IMG_URL: "https://img.jingjian168.com",
	BASE_UPLOAD_URL: "",
}
const prodApi = {
	BASE_URL: "https://www.jingjian168.com/apis/",
	IMG_URL: "https://img.jingjian168.com",
	BASE_UPLOAD_URL: "",
}

const apiHub = {
	//开发环境
	development: prodApi,
	develop: prodApi,

	//测试环境 
	test: prodApi,
	trial: prodApi,

	//生产环境
	production: prodApi,
	release: prodApi
}

// 导出配置
export default {
	ENV: ENV,
	...apiHub[ENV]
}
