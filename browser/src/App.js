import React from 'react';
import './App.css';

import UserPage from "./component/UserPage";
import SymmetricalEncryptionPage from "./component/SymmetricalEncryptionPage";
import AsymmetricEncryptionPage from "./component/AsymmetricEncryptionPage";
import HybridEncryptionPage from "./component/HybridEncryptionPage";

function App() {
  return (
    <div className="App">
      <UserPage></UserPage>
      <SymmetricalEncryptionPage></SymmetricalEncryptionPage>
      <AsymmetricEncryptionPage></AsymmetricEncryptionPage>
      <HybridEncryptionPage></HybridEncryptionPage>
    </div>
  );
}

export default App;
