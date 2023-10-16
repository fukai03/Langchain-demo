import service from "./request";

// 请求函数封装
const requestList = {
    // 获取用户信息
    getErineBot: (params: any) => {
        return service({
            url: '/ai/oauth/2.0/token',
            method: 'get',
            params
        })
    },
    // 测试express
    getExpress: (params: any) => {
        return service({
            url: '/test',
            method: 'get',
            params
        })
    },
    // 测试langchain
    getLangchain: (params: any) => {
        return service({
            url: '/test/langchain',
            method: 'get',
            params
        })
    }
}

export default requestList