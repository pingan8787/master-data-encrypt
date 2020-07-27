import React, { useState } from 'react';
import '../App.css';
const CryptoJS = require("crypto-js");
const JSEncrypt = require("jsencrypt").default;

const PUBLIC_KEY = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC++rfD5AOR//0qwuy25vm70juC
    QQH4WE5nerc/tgz3OuPPIyy4OrkClChzYqSWLddSGbUoMKivs/+qGGgf2+einmY/
    LyF1xL6BpnbKofanY7WQ9wW50o0BppYHYiTXLOtzRHS9Fb04mWa1NqnQ2jO9w/B9
    6XGxufRg9wGRXa6pWQIDAQAB
    -----END PUBLIC KEY-----
`;
const PRIVATE_KEY = `
    -----BEGIN RSA PRIVATE KEY-----
    MIICXgIBAAKBgQC++rfD5AOR//0qwuy25vm70juCQQH4WE5nerc/tgz3OuPPIyy4
    OrkClChzYqSWLddSGbUoMKivs/+qGGgf2+einmY/LyF1xL6BpnbKofanY7WQ9wW5
    0o0BppYHYiTXLOtzRHS9Fb04mWa1NqnQ2jO9w/B96XGxufRg9wGRXa6pWQIDAQAB
    AoGBAI7YQrkvhAghG8BvOdT4YFS+w6oCa7HQgxxdKlFqHrqQ/rIBEkLeEWG/ZZ4g
    axC1SvdqqRhdhN6e2JzmUoN53P93ZLUUUF/AEudaT6JBOihaGcskNkKI56i71nJC
    j6pSRQo9XNfK9gYgQ6j6U3ELTxCnVTOTtC3S8O9jUTwLxQ2NAkEA4+gjwWcaIxAv
    mt6jw1NBbE8IW6ehlgGvZRHC5DtB+4FsiAExpbswtFtpwmZB85aTkuTPTG//h9Jl
    mng+p30jwwJBANaFSnDuo8MMkBefKvmq57pGqjVNhm39UF42koqifsX4c2HXVbBe
    3BT6HeYPKMbfB94SZg2JThih+OqBgM90OLMCQQDcLR6t779OdIqpIcIwJ7SiwE+g
    zHfNBd++0sPn3l/GbKi/U/f01r0c4NtxlXzNqYD0ftzOSb0iKF9ENjrBcKIlAkBQ
    dQWKfbal/Rw9/9Cae2MWFlLYUw9MSWnPLCCiJnftwFVmKOFWmP1qULTOCHl+vT+y
    Jqxn/0tvKbC2I4QwSqLJAkEAiRMnVrz3nCIB/AvOD8HzTKZtu7InNsySG7DytrvN
    zACol/vo+5BFTgxIr7as7VD33gqBd23P4xs4MD70FwPkFA==
    -----END RSA PRIVATE KEY-----
`;

function HybridEncryptionPage() {
    const [inputText, setInputText] = useState("");
    const [encryptText, setEncryptText] = useState("");
    const [decryptText, setDecryptText] = useState("");

    // 生成 AES KEY
    const getRandomAESKey = () => {
        return (
            Math.random.toString(36).substring(2, 10) +
            Math.random.toString(36).substring(2, 10)
        )
    }

    // 对称加密 - 加密方法
    const aesEncrypt = (key, iv, content) => {
        const text = CryptoJS.enc.Utf8.parse(JSON.stringify(content));
        return CryptoJS.AES.encrypt(text, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }

    // 对称加密 - 解密方法
    const aesDecrypt = (key, iv, content) => {
        return CryptoJS.AES.decrypt(content, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }


    // 非对称加密 - 加密器
    const rsaEncryptor = new JSEncrypt();
    rsaEncryptor.setPublicKey(PUBLIC_KEY);

    // 非对称加密 - 解密器
    const rsaDecryptor = new JSEncrypt();
    rsaDecryptor.setPublicKey(PRIVATE_KEY);

    // 混合加密 - 加密方法
    const hybridEncrypt = data => {
        const iv = getRandomAESKey();
        const key = getRandomAESKey();
        const encryptedData = aesEncrypt(key, iv, data);
        const encryptedIv = rsaEncryptor.encrypt(iv);
        const encryptedKey = rsaEncryptor.encrypt(key);
        return {
            iv: encryptedIv,
            key: encryptedKey,
            data: encryptedData
        }
    }

    // 混合加密 - 解密方法
    const hybridDecrypt = encryptedResult => {
        encryptedResult = JSON.parse(encryptedResult);
        const iv = rsaDecryptor.decrypt(encryptedResult.iv);
        const key = rsaDecryptor.decrypt(encryptedResult.key);
        const data = encryptedResult.data;
        return aesDecrypt(key, iv, data);
    }

    // 按钮事件 - 加密事件
    const encrypt = () => {
        const encryptedResult = hybridEncrypt(inputText);
        setEncryptText(JSON.stringify(encryptedResult));
    }

    // 按钮事件 - 解密事件
    const decrypt = () => {
        const decryptedResult = hybridDecrypt(encryptText);
        setDecryptText(decryptedResult);
    }

    return (
        <div className="App">
            <h3>阿宝哥：混合加密与解密示例</h3>
            <div className="Content">
                <div>
                    <p>①明文加密 => <button onClick={encrypt}>加密</button></p>
                    <textarea value={inputText} onChange={event => setInputText(event.target.value)} rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>②密文解密 => <button onClick={decrypt}>解密</button></p>
                    <textarea value={encryptText} onChange={event => setEncryptText(event.target.value)} rows="5" cols="15"></textarea>
                </div>
                <div>
                    <p>③解密后的明文</p>
                    <textarea value={decryptText} readOnly rows="5" cols="15"></textarea>
                </div>
            </div>
        </div>
    )
}

export default HybridEncryptionPage