import React from 'react';
import './App.css';

import UserPage from "./UserPage/UserPage";
import SymmetricalEncryptionPage from "./SymmetricalEncryptionPage/SymmetricalEncryptionPage";
import AsymmetricEncryptionPage from "./AsymmetricEncryptionPage/AsymmetricEncryptionPage";
import HybridEncryptionPage from "./HybridEncryptionPage/HybridEncryptionPage";

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
