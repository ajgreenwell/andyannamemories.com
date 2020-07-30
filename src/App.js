import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import awsConfig, { userId } from './config.js';
import Navbar from './Navbar.js';
import About from './About.js';
import PhotoSlideshow from './PhotoSlideshow.js';
import CleanMemories from './CleanMemories.js';
import DirtyMemories from './DirtyMemories.js';
import './main.css';

export default function App() {
  const [cleanMemories, setCleanMemories] = useState([]);
  const [dirtyMemories, setDirtyMemeories] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    AWS.config.update(awsConfig);
    let ddb = new AWS.DynamoDB.DocumentClient();
    let params = {
      TableName: 'MyMemories',
      Key: {'userId': userId}
    };
    ddb.get(params, function(err, {Item: {mapAttr: {allMemories}}}) {
      if (err) {
        console.log("Error retrieving memories:", err);
        setIsError(true);
      } else {
        setCleanMemories(allMemories.cleanMemories);
        setDirtyMemeories(allMemories.dirtyMemories);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <About />
      <PhotoSlideshow />
      <CleanMemories isError={isError} cleanMemories={cleanMemories} />
      <DirtyMemories isError={isError} dirtyMemories={dirtyMemories} />
    </div>
  );
}