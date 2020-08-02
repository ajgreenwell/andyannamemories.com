import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function PrivateMemories({ isError, privateMemories, updatePrivateMemory }) {
  return (
    <div>
      <div id="private-memories" className="container">
        <div id="private-memories-location"></div>
        <h2>The Memories You Definitely Wouldn't Share.</h2>
        {isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor memories={privateMemories} updateMemory={updatePrivateMemory}/>}
      </div>
    </div>
  );
}