const Koa = require('koa');
const cors = require('koa2-cors');
const { getRouters } = require("./router");
const bodyParser = require("koa-bodyparser");
const { hybridDecrypt, aesEncrypt } = require("./encrypt");
const { getUser } = require("./mock");
const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  const { path: curPath, method: curMethod, body } = ctx.request;
  const { path, method } = getRouters(ctx.request);
  if (curPath === path && curMethod === method) {
    /*
      服务端对 post 数据进行解密等操作
    */
    const { reqId, enctyptData } = body;

    // 1. 将 post 的数据进行混合加密的解密操作
    const decryptData = hybridDecrypt(enctyptData);
    let parseData = decryptData && JSON.parse(decryptData);
    console.log("解密结果：", parseData);
    if (routerKey === "user") {
      parseData = getUser(parseData.name);
    }

    // 2. 将解密后数据，封装成需要返回的数据格式
    const resultData = {
      data: parseData,
      isDecrypted: true
    };

    // 3. 使用 post 的数据的 key , iv 参数，对需要返回数据进行 AES 加密
    const { key, iv } = enctyptData;
    const aesEncryptData = aesEncrypt(key, iv, resultData);

    // 4. 携带 reqId 和 AES 加密后的数据一起返回给前端
    ctx.body = {
      reqId,
      data: aesEncryptData
    };
    console.log("加密结果：", ctx.body);
  } else {
    // 其他请求显示404
    ctx.body = {
      data: "decrypt failed!",
      isDecrypted: false
    }
  }
});

console.log("服务器已启动！")
app.listen(3001);