const express = require('express');
const axios = require('axios');
const {ChatBaiduWenxin} = require('langchain/chat_models/baiduwenxin');
const {HumanMessage} = require('langchain/schema');

const app = express();
const port = process.env.PORT || 5003;
const CHAT_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions';
const baiduApiKey = 'Zuy4sbkGfSwe9eHxjX5d97bs';
const baiduSecretKey = 'kgDLqZNQmQHsCCPjDxcKTPuDGhLEGtcW';

let accessToken = {
    value: '',
    expiredTime: 0
};

async function getAccessToken() {
    if (accessToken.value && Date.now() < accessToken.expiredTime) {
        return accessToken.value;
    };
    const res = await axios.get('https://aip.baidubce.com/oauth/2.0/token', {
        params: {
            grant_type: 'client_credentials',
            client_id: baiduApiKey,
            client_secret: baiduSecretKey
        }
    })
    accessToken = {
        expiredTime: Date.now() + 29 * 86400 * 1000, // 29 days
        value: res.data.access_token,
    };
    return res.data.access_token;
};

async function getChatResult(text) {
    const messages = [{role: 'user', content: text}];
    const token = await getAccessToken();
    const res = await axios.post(CHAT_URL, {messages}, {
        params: {
            access_token: token
        }
    });
    const {data = {}} = res;
    return data;
}

const ernieTurbo = new ChatBaiduWenxin({
    baiduApiKey, // In Node.js defaults to process.env.BAIDU_API_KEY
    baiduSecretKey, // In Node.js defaults to process.env.BAIDU_SECRET_KEY
  });
  
const ernie = new ChatBaiduWenxin({
    modelName: "ERNIE-Bot",
    temperature: 1, // Only ERNIE-Bot supports temperature
    baiduApiKey, // In Node.js defaults to process.env.BAIDU_API_KEY
    baiduSecretKey, // In Node.js defaults to process.env.BAIDU_SECRET_KEY
});
  

// langchain中的文心模型
async function getChatResultLangchain(text) {
    const messages = [new HumanMessage(text)];
    let res = await ernieTurbo.call(messages);
    res = await ernie.call(messages);
    return res;
}





// 接口定义
app.get('/', async (req, res) => {
    const text = req.query.text;
    const data = await getChatResult(text);
    res.send(data)
})

app.get('/langchain', async (req, res) => {
    const text = req.query.text;
    const data = await getChatResultLangchain(text);
    res.send(data || '')
})


app.listen(port, () => {
    console.log(`Langchain demo app listening at http://localhost:${port}`)
})
