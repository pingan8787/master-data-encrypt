import React, { useState, useEffect } from "react";
import axios from "axios";
import { hybridEncrypt } from "../encrypt";

const UserPage = () => {
    const [ user, setUser ] = useState({user: "无名小子", isDecrypted: false})
    const userUrl = "http://127.0.0.1:3001/user";
    useEffect(() => {
        const getUser = async () => {
            const params = {
                user : "leo"
            }
            const enctyptData = hybridEncrypt(params);
            const data = await axios.post(
                userUrl,
                enctyptData
            );
            setUser({
                user: data.data.user,
                isDecrypted: data.isDecrypted
            });
            console.log("data:", user)
        }
        getUser();
    }, [])
    return(
        <div>
            <div>用户请求结果:{user.user}</div>
            <div>是否解密:{user.isDecrypted ? "已解密" : "未解密"}</div>
        </div>
    )
}

export default UserPage;