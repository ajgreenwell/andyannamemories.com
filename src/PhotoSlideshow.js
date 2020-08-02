import React, { useState } from 'react';
import './main.css';

function Photo({ src, idx }) {
  const className = idx === 0 ? 'visible' : 'hidden';
  return (
    <img
      id={`slideshow-photo-${idx}`}
      className={className}
      src={src}
      alt="A memory from Andy and Anna's past"
    />
  );
}

function Caption({ memory, idx }) {
  const className = idx === 0 ? 'visible' : 'hidden';
  const text = memory.writtenMemory ? memory.writtenMemory : memory.memory;
  return (
    <div>
      <p id={`slideshow-caption-${idx}`} className={className}>{text}</p>
      {idx === 0 ?
        <p id={`hidden-caption-${idx}`} style={{display: "block"}}>{text}</p> :
        <p id={`hidden-caption-${idx}`} >{text}</p>
      }
    </div>
  );
}

export default function PhotoSlideshow({ memories }) {
  const [photoIdx, setPhotoIdx] = useState(0);

  function hidePhoto(idx) {
    const photo = document.querySelector(`#slideshow-photo-${idx}`);
    photo.style.opacity = "0%";
  }

  function showPhoto(idx) {
    const photo = document.querySelector(`#slideshow-photo-${idx}`);
    photo.style.opacity = "100%";
  }

  function hideCaption(idx) {
    const caption = document.querySelector(`#slideshow-caption-${idx}`);
    caption.style.opacity = "0%";
    const hiddenCaption = document.querySelector(`#hidden-caption-${idx}`);
    hiddenCaption.style.display = 'none';
  }

  function showCaption(idx) {
    const caption = document.querySelector(`#slideshow-caption-${idx}`);
    caption.style.opacity = "100%";
    const hiddenCaption = document.querySelector(`#hidden-caption-${idx}`);
    hiddenCaption.style.display = 'block';
  }

  function changePhotoIdx(changeBy) {
    let newPhotoIdx = photoIdx + changeBy;
    if (newPhotoIdx < 0) newPhotoIdx = memories.length - 1;
    else if (newPhotoIdx >= memories.length) newPhotoIdx = 0;
    hidePhoto(photoIdx);
    hideCaption(photoIdx);
    showPhoto(newPhotoIdx);
    showCaption(newPhotoIdx);
    setPhotoIdx(newPhotoIdx);
  }

  return (
    <div>
      <div id="photo-slideshow" className="container">
        <div id="photo-slideshow-location"></div>
        <h2>The Memories You've Captured.</h2>
        <div id="slideshow">
          <button className="slideshow-button" onClick={() => changePhotoIdx(-1)}>
            <i className="slideshow-button-icon fas fa-arrow-circle-left"></i>
          </button>
          <div id="slideshow-photos">
            {memories.map((memory, idx) => <Photo src={memory.photo} idx={memories.length - 1 - idx} key={idx} />)}
          </div>
          <button className="slideshow-button" onClick={() => changePhotoIdx(1)}>
            <i className="slideshow-button-icon fas fa-arrow-circle-right"></i>
          </button>
        </div>
        <div id="slideshow-captions">
          <i id="quote-left" className="fas fa-quote-left"></i>
          {memories.map((memory, idx) => <Caption memory={memory} idx={memories.length - 1 - idx} key={idx} />)}
          <i id="quote-right" className="fas fa-quote-right"></i>
        </div>
      </div>
    </div>
    
  );
}