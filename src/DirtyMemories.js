import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function DirtyMemories({ isError, dirtyMemories }) {
  return (
    <div>
      <div id="dirty-memories-location"></div>
      <div className="container">
        <h1>Dirty Memories</h1>
        {isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor memories={dirtyMemories}/>}
      </div>
    </div>
  );
}