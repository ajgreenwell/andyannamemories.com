import React from 'react';
import MemoriesEditor from './MemoriesEditor.js';
import './main.css';

export default function PublicMemories(props) {
  return (
    <div>
      <div id="public-memories" className="container">
        <div id="public-memories-location"></div>
        <h2>The Memories You Might Share.</h2>
        {props.isError ?
        <p>There was a problem retrieving the memories from your bank. Tell Andy and he can fix the problem.</p> :
        <MemoriesEditor
          isPublic={true}
          memories={props.publicMemories}
          swapMemories={props.swapPublicMemories}
          addMemory={props.addPublicMemory}
          updateMemory={props.updatePublicMemory}
          deleteMemory={props.deletePublicMemory}
        />}
      </div>
    </div>
    
  );
}