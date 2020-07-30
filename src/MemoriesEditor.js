import React from 'react';
import Memory from './Memory.js';
import './main.css';

export default function MemoriesEditor({ memories }) {
  return (
    <div>
      {memories.map((memory, idx) => <Memory memory={memory} key={idx} />)}
    </div>
  );
}