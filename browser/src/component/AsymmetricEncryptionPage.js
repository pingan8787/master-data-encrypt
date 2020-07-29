import React, { useState } from 'react';
import '../App.css';

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

function RSAPage() {
  const [inputText, setInputText] = useState("");
  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");

  const encryptor = new JSEncrypt(); // RSA 加密器
  encryptor.setPublicKey(PUBLIC_KEY);

  const decryptor = new JSEncrypt(); // RSA 解密器
  decryptor.setPrivateKey(PRIVATE_KEY);

  const encrypt = () => {
    setEncryptText(encryptor.encrypt(inputText));
  };
  
  const decrypt = () => {
    setDecryptText(decryptor.decrypt(encryptText));
  }


  return (
    <div className="content">
        <h3>阿宝哥：RSA 非对称加密与解密示例</h3>
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

export default RSAPage;
