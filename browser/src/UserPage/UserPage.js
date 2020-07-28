import React, { useState, useEffect } from "react";
import '../App.css';
import axios from "axios";
import { hybridEncrypt, aesDecrypt } from "../encrypt";
import { getRequestMap, setRequestMap } from "../utils";

const leoUrl = "http://127.0.0.1:3001/leo";
const userUrl = "http://127.0.0.1:3001/user";

const postMethod = async (url, params) => {
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
    return decryptData;
}

const UserPage = () => {
    const [leo, setLeo] = useState({ user: "无名小子", isDecrypted: false })
    const [user, setUser ] = useState("Leo");
    const [userList, setUserList ] = useState([{name: "Leo",    age: 18, address: "QuanZhou"}]);

    const getLeo = async () => {
        const params = { user: "leo" };
        const result = await postMethod(leoUrl, params);
        const { data: userData, isDecrypted } = result;
        setLeo({
            user: userData.user,
            isDecrypted
        });
    }

    const getUser = async () => {
        console.log("当前搜索：", user)
        const result = await postMethod(userUrl, {name: user});
        setUserList(result.data);
        console.log("当前搜索结果：", result)
    }

    useEffect(() => {
        (async () => {
            // getLeo();
        })();
    }, []);
    return (
        <div className="content">
            <h3>Leo：前后端混合加密实战 - POST 请求（CBC 模式）</h3>
            <div>用户请求结果:{leo.user}</div>
            <div>是否解密:{leo.isDecrypted ? "已解密" : "未解密"}</div>
            <div className="Content">
                <div>
                    <p>①明文加密 => <button onClick={getUser}>搜索</button></p>
                    <p>目前支持输入值：Leo / Robin / Rooney，输入控制返回全部。</p>
                    <textarea placeholder="目前支持 username：Leo / Robin / Rooney" value={user} onChange={event => setUser(event.target.value)} rows="5" cols="15"></textarea>
                    <div>
                        <p>用户列表：</p>
                        <ul className="userList">
                            {
                                userList && userList.map(item => {
                                    const { name, age, address } = item;
                                    return <li>姓名:{name}，年龄:{age}，地址:{address}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/* <div>
                    <p>②密文解密 => <button onClick={decrypt}>解密</button></p>
                    <textarea value={encryptText} onChange={event => setEncryptText(event.target.value)} rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>③解密后的明文</p>
                    <textarea value={decryptText} readOnly rows="5" cols="15"></textarea>
                </div> */}
            </div>
        </div>
    )
}

export default UserPage;