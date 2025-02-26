import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Navbar title="TextUtils" about="About us" onSearch={setSearchText} />
      <div className="container my-3">
        <TextForm heading="Enter text to analyze below" searchText={searchText} />
      </div>
    </>
  );
}

export default App;
