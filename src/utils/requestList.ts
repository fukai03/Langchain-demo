import service from "./request";

// 请求函数封装
const requestList = {
    // 获取用户信息
    getErineBot: (params: any) => {
        return service({
            url: '/ai/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
            method: 'get',
            params
        })
    },
    // 测试express
    getExpress: (params: any) => {
        return service({
            url: '/express',
            method: 'get',
            params
        })
    },
    // 测试langchain
    getLangchain: (params: any) => {
        return service({
            url: '/express/langchain',
            method: 'get',
            params
        })
    }
}

export default requestList