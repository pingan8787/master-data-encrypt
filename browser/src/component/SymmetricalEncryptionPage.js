import React, { useState } from 'react';
import '../App.css';

const CryptoJS = require("crypto-js");

function AESPage() {
  const [inputText, setInputText] = useState("");
  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");

  const sk = CryptoJS.SHA256("pingan8787");
  // const sk = CryptoJS.enc.Utf8.parse("pingan8787");
  const iv = CryptoJS.enc.Utf8.parse("hello world!");

  const encrypt = () => {
    setEncryptText(AESEncrypt(inputText));
  };
  
  const decrypt = () => {
    setDecryptText(AESDecrypt(encryptText));
  }

  const AESEncrypt = content => {
    const text = CryptoJS.enc.Utf8.parse(JSON.stringify(content));
    return CryptoJS.AES.encrypt(text, sk, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }

  const AESDecrypt = content => {
    return CryptoJS.AES.decrypt(content, sk, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }

  return (
    <div className="content">
      <h3>阿宝哥：AES 对称加密与解密示例（CBC 模式）</h3>
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
  );
}

export default AESPage;
