import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import awsConfig, { userId } from './config.js';
import Navbar from './Navbar.js';
import About from './About.js';
import PhotoSlideshow from './PhotoSlideshow.js';
import PublicMemories from './PublicMemories.js';
import PrivateMemories from './PrivateMemories.js';
import './main.css';

export default function App() {
  const [publicMemories, setPublicMemories] = useState([]);
  const [privateMemories, setPrivateMemories] = useState([]);
  const [photographedMemories, setPhotographedMemories] = useState([]);
  const [isError, setIsError] = useState(false);

  function getAllMemoriesFromDatabase() {
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
        setPublicMemories(allMemories.cleanMemories);
        setPrivateMemories(allMemories.dirtyMemories);
        const photoMemories = getPhotographedMemories(allMemories.cleanMemories);
        setPhotographedMemories(photoMemories);
      }
    });
  }

  function getPhotographedMemories(memories) {
    const photoMemories = [];
    memories.forEach(memory => {
      if (memory.photo) {
        photoMemories.push(memory);
      }
    });
    return photoMemories;
  }

  function saveMemoriesToDatabase(memories, isPublic) {
    AWS.config.update(awsConfig);
    let ddb = new AWS.DynamoDB.DocumentClient();
    let memoryType = isPublic ? 'cleanMemories' : 'dirtyMemories';
    let params = {
      TableName: 'MyMemories',
      Key: {'userId': userId},
      UpdateExpression: `set mapAttr.allMemories.${memoryType} = :c`,
      ExpressionAttributeValues: {
        ":c": memories
      }
    };
    ddb.update(params, function(err, _) {
      if (err) {
        console.log("Error retrieving memories:", err);
        setIsError(true);
      } else {
        // pop success message
      }
    });
  }

  function updatePublicMemory(newMemory, idx) {
    const newPublicMemories = publicMemories.slice();
    newPublicMemories[idx].memory = newMemory;
    setPublicMemories(newPublicMemories);
    saveMemoriesToDatabase(newPublicMemories, true);
  }

  function updatePrivateMemory(newMemory, idx) {
    const newPrivateMemories = privateMemories.slice();
    newPrivateMemories[idx].memory = newMemory;
    setPrivateMemories(newPrivateMemories);
    saveMemoriesToDatabase(newPrivateMemories, false);
  }

  useEffect(getAllMemoriesFromDatabase, []);

  return (
    <div>
      <Navbar />
      <About />
      <PhotoSlideshow memories={photographedMemories} />
      <PublicMemories
        isError={isError}
        publicMemories={publicMemories}
        updatePublicMemory={updatePublicMemory}
      />
      <PrivateMemories
        isError={isError}
        privateMemories={privateMemories}
        updatePrivateMemory={updatePrivateMemory}
      />
    </div>
  );
}