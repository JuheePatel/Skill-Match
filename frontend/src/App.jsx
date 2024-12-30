import React from 'react';
import './App.css';
import SubmitSkill from './Components/SubmitSkill';

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Get Skills</h1>
        <p>Select your skill level for each category</p>
      </div>
      <SubmitSkill />
    </div>
  );
};

export default App;
