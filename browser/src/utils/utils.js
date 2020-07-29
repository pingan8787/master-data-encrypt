
import { getRandomAESKey } from "./encrypt";

export const RequestMap = new Map();

export const setRequestMap = data => {
    // 1. 生成一个唯一 reqId（这里使用 getRandomAESKey 方法生成）
    const reqId = getRandomAESKey();

    // 2. 保存到 Map 中
    RequestMap.set(reqId, data);
    return reqId;
}

export const getRequestMap = reqId => {
    // 1. 通过 reqId 读取详情数据
    const reqData = RequestMap.get(reqId);

    // 2. 删除已有记录
    RequestMap.delete(reqId);
    return reqData;
}