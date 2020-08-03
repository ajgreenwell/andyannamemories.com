import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function PrivateMemories(props) {
  return (
    <div>
      <div id="private-memories" className="container">
        <div id="private-memories-location"></div>
        <h2>The Memories You Definitely Wouldn't Share.</h2>
        {props.isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor
          isPublic={false}
          memories={props.privateMemories}
          swapMemories={props.swapPrivateMemories}
          addMemory={props.addPrivateMemory}
          updateMemory={props.updatePrivateMemory}
          deleteMemory={props.deletePrivateMemory}
        />}
      </div>
    </div>
  );
}