import React from 'react';
import './main.css';

export default function Memory({ memory: { memory } }) {
  return (
    <div>
      <p>{memory}</p>
    </div>
  );
}