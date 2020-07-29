import React, { useState, useEffect } from "react";
import { postMethod } from "../service/service";
import '../App.css';

const leoUrl = "http://127.0.0.1:3001/leo";
const userUrl = "http://127.0.0.1:3001/user";

const UserPage = () => {
    const [ leo, setLeo ] = useState({ user: "无名小子", isDecrypted: false })
    const [ user, setUser ] = useState("Leo");
    const [ userList, setUserList ] = useState([{name: "Leo", age: 18, address: "QuanZhou"}]);
    const [ reqText, setReqText ] = useState("");
    const [ resText, setResText ] = useState("");
    const [ reqTextMsg, setReqTextMsg ] = useState("");
    const [ resTextMsg, setResTextMsg ] = useState("");

    const getLeo = async () => {
        try {
            const params = { user: "leo" };
            const result = await postMethod(leoUrl, params);
            const { data: userData, isDecrypted } = result;
            setLeo({
                user: userData.user,
                isDecrypted
            });
        } catch (error) {
            console.log("getLeo failed:", error);
        }
    }

    const getUser = async () => {
        try {
            console.log("当前搜索：", user)
            const userData = {name: user};
            const result = await postMethod(userUrl, userData, true);
            const { data: {data}, request, response } = result;
            setUserList(data);
            setReqText(JSON.stringify(userData));
            setResText(JSON.stringify(data));
            setReqTextMsg(JSON.stringify(request));
            setResTextMsg(JSON.stringify(response));
            console.log("当前搜索结果：", result)
        } catch (error) {
            console.log("getUser failed:", error);
        }
    }

    useEffect(() => {
        (async () => {
            getLeo();
        })();
    }, []);
    return (
        <div className="content">
            <h3>Leo：前后端混合加密实战 - POST 请求（CBC 模式）</h3>
            <div>用户请求结果:{leo.user}</div>
            <div>是否解密:{leo.isDecrypted ? "已解密" : "未解密"}</div>


            <h3>Leo：前后端混合加密实战 - 手动发起 POST 请求（CBC 模式）</h3>
            <p>目前支持输入值：Leo / Robin / Rooney，输入控制返回全部。</p>
            <div>
                <p>用户列表：</p>
                <ul className="userList">
                    {
                        userList && userList.map((item, index) => {
                            const { name, age, address } = item;
                            return <li key={index}>姓名:{name}，年龄:{age}，地址:{address}</li>
                        })
                    }
                </ul>
            </div>
            <div className="Content">
                <div>
                    <p>①明文加密 => <button onClick={getUser}>搜索</button></p>
                    <textarea placeholder="目前支持 username：Leo / Robin / Rooney" value={user} onChange={event => setUser(event.target.value)} rows="5" cols="15"></textarea>

                </div>
                <div>
                    <p>②请求密文</p>
                    <textarea value={reqTextMsg} readOnly rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>请求明文</p>
                    <textarea value={reqText} readOnly rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>③响应密文</p>
                    <textarea value={resTextMsg} readOnly rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>响应明文</p>
                    <textarea value={resText} readOnly rows="5" cols="15"></textarea>
                </div>
            </div>
        </div>
    )
}

export default UserPage;