import React from 'react';
import Memory from './Memory.js';
import './main.css';

export default function MemoriesEditor(props) {
  return (
    <div>
      {props.memories.map((memory, idx) => {
        return (
          <Memory
           memory={memory}
           key={memory.memory}
           idx={idx}
           isPublic={props.isPublic}
           swapMemories={props.swapMemories}
           updateMemory={props.updateMemory}
           deleteMemory={props.deleteMemory}
          />
        );
      })}
      <div className="new-memory-container">
        <button className="new-memory-button" onClick={props.addMemory} >
          <i className="new-memory-icon fas fa-plus-circle"></i>
          New Memory
        </button>
      </div>
    </div>
  );
}