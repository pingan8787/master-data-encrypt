const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require("./router");
// 引入koa-bodyparser中间件，这个中间件可以将post请求的参数转为json格式返回
const bodyParser = require('koa-bodyparser');
const { hybridDecrypt } = require('./encrypt');
const app = new Koa();

// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json
app.use(bodyParser());
app.use(cors());

// request.method可以获取请求方法。get，post或者其他类型(request对象被封在ctx内，所以也可以ctx.method获取)
app.use(async (ctx, next) => {
  const { path, method } = Router.user;
  const { path: curPath, method: curMethod, body } = ctx.request;
  if(curPath === path){
    if(curMethod === method){
      const decryptData = hybridDecrypt(body);
      ctx.body = {
        data: decryptData && JSON.parse(decryptData),
        isDecrypted: true
      };
      console.log("解密结果：", ctx.body);
    }else {
      // 其他请求显示404
      ctx.body = {
        data: "decrypt failed!",
        isDecrypted: false
      }
  }
  }else{
    ctx.body = 'Hello World';
  }
});

console.log("服务器已启动！")
app.listen(3001);