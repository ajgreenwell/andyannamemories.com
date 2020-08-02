import React from 'react';
import Memory from './Memory.js';
import './main.css';

export default function MemoriesEditor({ memories, updateMemory }) {
  return (
    <div>
      {memories.map((memory, idx) => {
        return (
          <Memory
           memory={memory}
           idx={idx}
           key={idx}
           updateMemory={updateMemory}
          />
        );
      })}
    </div>
  );
}