import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function CleanMemories({ isError, cleanMemories }) {
  return (
    <div>
      <div id="clean-memories-location"></div>
      <div className="container">
        <h1>Clean Memories</h1>
        {isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor memories={cleanMemories}/>}
      </div>
    </div>
    
  );
}