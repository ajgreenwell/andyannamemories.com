import React, { useState } from 'react';
import './main.css';

export default function Memory({ memory: { memory }, idx, updateMemory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [memoryText, setMemoryText] = useState(memory);

  function saveMemory() {
    const memoryInput = document.getElementById(`memory-input-${idx}`);
    setIsEditing(!isEditing);
    updateMemory(memoryInput.value, idx);
  }

  return (
    <div className="memory">
      {isEditing ?
      <textarea id={`memory-input-${idx}`} value={memoryText} onChange={(e) => setMemoryText(e.target.value)} autoFocus></textarea> :
      <p className="memory-text">{memoryText}</p>}

      {isEditing ?
      <button className="memory-button" onClick={saveMemory}>
        <i className="memory-button-icon far fa-save"></i>
        Save
      </button> :
      <button className="memory-button" onClick={() => setIsEditing(!isEditing)}>
        <i className="memory-button-icon far fa-edit"></i>
        Edit
      </button>}

      <button className="memory-button">
        <i className="memory-button-icon far fa-times-circle"></i>
        Delete
      </button>
    </div>
  );
}