import React, { useState } from 'react';
import './main.css';

export default function Memory({ memory: { memory }, isPublic, idx, swapMemories, updateMemory, deleteMemory }) {
  const [isEditing, setIsEditing] = useState(!memory || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [memoryText, setMemoryText] = useState(memory);

  function saveMemory() {
    setIsEditing(false);
    updateMemory(memoryText, idx);
  }

  function confirmDeleteMemory(idx) {
    setIsDeleting(false);
    deleteMemory(idx)
  }

  const memoryId = isPublic ? `public-memory-${idx}` : `private-memory-${idx}`;

  return (
    <div id={memoryId} className="memory">
      {isEditing ?
      <textarea className='memory-input' value={memoryText} onChange={e => setMemoryText(e.target.value)} autoFocus></textarea> :
      <p className="memory-text">{memoryText}</p>}

      <div className="memory-buttons">
        <div className="memory-buttons-left">
          {isEditing ?
          <button className="memory-button" onClick={saveMemory}>
            <i className="memory-button-icon fas fa-save"></i>
            Save
          </button> :
          <button className="memory-button" onClick={() => setIsEditing(true)}>
            <i className="memory-button-icon fas fa-edit"></i>
            Edit
          </button>}

          <button className="memory-button" onClick={() => setIsDeleting(true)}>
            <i className="memory-button-icon fas fa-times-circle"></i>
            Delete
          </button>
        </div>
        <div className="memory-buttons-right">
          <button className="slideshow-button" onClick={() => swapMemories(idx - 1, idx)}>
            <i className="slideshow-button-icon fas fa-arrow-circle-up"></i>
          </button>
          <button className="slideshow-button" onClick={() => swapMemories(idx, idx + 1)}>
            <i className="slideshow-button-icon fas fa-arrow-circle-down"></i>
          </button>
        </div>
      </div>
      
      {isDeleting &&
      <div>
        <h3 className="delete-confirmation-text">Are you sure you want to delete this memory?</h3>
        <div>
          <button className="memory-button" onClick={() => confirmDeleteMemory(idx)}>
            <i className="memory-button-icon fas fa-check-circle"></i>
            Yes, Delete this Memory
          </button>
          <button className="memory-button" onClick={() => setIsDeleting(false)}>
            <i className="memory-button-icon fas fa-times-circle"></i>
            No, Keep this Memory
          </button>
        </div>
      </div>}
    </div>
  );
}