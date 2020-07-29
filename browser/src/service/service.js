import axios from "axios";

import { hybridEncrypt, aesDecrypt } from "../utils/encrypt";
import { getRequestMap, setRequestMap } from "../utils/utils";

export const postMethod = async (url, params, useReqMessage) => {
    // 1. 将提交的数据进行混合加密
    const enctyptData = hybridEncrypt(params);

    // 2. 保存新的 reqId 到 Map 中
    const reqId = setRequestMap(enctyptData);

    // 3. 发起请求
    const data = await axios.post(url, { reqId, enctyptData });

    // 4. 使用 reqId 读取 Map 中的数据
    const { reqId: resRquId, data: resReqData } = data.data;
    const reqData = getRequestMap(resRquId);

    // 5. 解密请求结果
    const { key, iv } = reqData;
    const decryptData = JSON.parse(aesDecrypt(key, iv, resReqData));

    // 6. 返回解密后的结果
    // 当使用 useReqMessage 则连加密的请求和响应数据一起返回
    return useReqMessage ? {
        request: { reqId, enctyptData },
        response: data.data,
        data: decryptData
    } : decryptData;
}