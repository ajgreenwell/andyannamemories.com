import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import awsConfig, { userId as rootUserId } from './config.js';
import { initialState, storeItem } from './storage.js';
import ErrorBanner from './ErrorBanner.js';
import LoginPortal from './LoginPortal.js';
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
  const [userIds, setUserIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState('isLoggedIn', false));
  const [isError, setIsError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  function getAllMemoriesFromDatabase() {
    AWS.config.update(awsConfig);
    let ddb = new AWS.DynamoDB.DocumentClient();
    let params = { TableName: 'MyMemories' };
    ddb.scan(params, function(err, { Items }) {
      if (err) {
        console.log("Error retrieving memories:", err);
        setIsError(true);
      } else {
        const rootUserItem = Items.filter(({ userId }) => userId === rootUserId)[0];
        const allMemories = rootUserItem.mapAttr.allMemories;
        const allUserIds = Items.map(item => item.userId);
        const photoMemories = getPhotographedMemories(allMemories.cleanMemories);
        setPublicMemories(allMemories.cleanMemories);
        setPrivateMemories(allMemories.dirtyMemories);
        setUserIds(allUserIds);
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
    userIds.forEach(userId => saveMemoriesToUser(userId, memories, isPublic));
  }

  function saveMemoriesToUser(userId, memories, isPublic) {
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
        setIsUpdateError(true);
      }
    });
  }

  function addPublicMemory() {
    const newPublicMemories = publicMemories.slice();
    newPublicMemories.push({ memory: '' });
    setPublicMemories(newPublicMemories);
  }

  function addPrivateMemory() {
    const newPrivateMemories = privateMemories.slice();
    newPrivateMemories.push({ memory: '' });
    setPrivateMemories(newPrivateMemories);
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

  function deletePublicMemory(idx) {
    const newPublicMemories = publicMemories.slice();
    newPublicMemories.splice(idx, 1);
    setPublicMemories(newPublicMemories);
    saveMemoriesToDatabase(newPublicMemories, true);
  }

  function deletePrivateMemory(idx) {
    const newPrivateMemories = privateMemories.slice();
    newPrivateMemories.splice(idx, 1);
    setPrivateMemories(newPrivateMemories);
    saveMemoriesToDatabase(newPrivateMemories, false);
  }

  function swapPublicMemories(idx1, idx2) {
    if (isMemoryIdxOutOfRange(idx1, true) || isMemoryIdxOutOfRange(idx2, true))
      return;
    const newPublicMemories = publicMemories.slice();
    const temp = newPublicMemories[idx1];
    newPublicMemories[idx1] = newPublicMemories[idx2];
    newPublicMemories[idx2] = temp;
    setPublicMemories(newPublicMemories);
    saveMemoriesToDatabase(newPublicMemories, true);
  }

  function swapPrivateMemories(idx1, idx2) {
    if (isMemoryIdxOutOfRange(idx1, false) || isMemoryIdxOutOfRange(idx2, false))
      return;
    const newPrivateMemories = privateMemories.slice();
    const temp = newPrivateMemories[idx1];
    newPrivateMemories[idx1] = newPrivateMemories[idx2];
    newPrivateMemories[idx2] = temp;
    setPrivateMemories(newPrivateMemories);
    saveMemoriesToDatabase(newPrivateMemories, false);
  }

  function isMemoryIdxOutOfRange(idx, isPublic) {
    const isIdxTooHigh = isPublic ? idx >= publicMemories.length : idx >= privateMemories.length;
    return idx < 0 || isIdxTooHigh;
  }

  function login() {
    setIsLoginError(false);
    setIsLoggedIn(true);
    storeItem('isLoggedIn', true);
  }

  function logout() {
    setIsLoggedIn(false);
    storeItem('isLoggedIn', false);
  }

  useEffect(getAllMemoriesFromDatabase, []);

  return (
    <div>
      {isUpdateError && 
      <ErrorBanner closeErrorBanner={() => setIsUpdateError(false)}>
        There was a problem saving your memory to the database.
        Tell Andy and he can fix the problem.
      </ErrorBanner>}
      {isLoginError &&
      <ErrorBanner closeErrorBanner={() => setIsLoginError(false)}>
        The password you entered is incorrect. Please try again.
      </ErrorBanner>}
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <About />
      {isLoggedIn ?
      <div>
        <PhotoSlideshow memories={photographedMemories} />
        <PublicMemories
          isError={isError}
          publicMemories={publicMemories}
          addPublicMemory={addPublicMemory}
          updatePublicMemory={updatePublicMemory}
          deletePublicMemory={deletePublicMemory}
          swapPublicMemories={swapPublicMemories}
        />
        <PrivateMemories
          isError={isError}
          privateMemories={privateMemories}
          updatePrivateMemory={updatePrivateMemory}
          addPrivateMemory={addPrivateMemory}
          deletePrivateMemory={deletePrivateMemory}
          swapPrivateMemories={swapPrivateMemories}
        />
      </div> :
      <LoginPortal login={login} setIsLoginError={setIsLoginError} />}
    </div>
  );
}