import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function PublicMemories({ isError, publicMemories, updatePublicMemory }) {
  return (
    <div>
      <div id="public-memories" className="container">
        <div id="public-memories-location"></div>
        <h2>The Memories You Might Share.</h2>
        {isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor memories={publicMemories} updateMemory={updatePublicMemory}/>}
      </div>
    </div>
    
  );
}