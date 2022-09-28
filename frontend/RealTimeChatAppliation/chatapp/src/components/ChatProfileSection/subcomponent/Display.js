import React, { useEffect, useState } from 'react'
import '../cssfile/file.css'
import { changeValue, numOfRows } from './globalVaribales';
import { currentUsername, myUsername } from '../../topglobalvaribales/TopGlobalVariable';
import { io } from 'socket.io-client';
import { messageSend } from './currentChats';

var clientSocket;
var setConnection = true;
var loadOnlyOneTime = true;
var preivousDate = 0;

export default function Display() {

  if (setConnection) {
    clientSocket = io('http://localhost:5000', { query: { 'username': myUsername } });
    setConnection = false;
  }

  useEffect(() => {
    clientSocket.on(`privateMessage`, (message) => {
      if (message.sender === currentUsername && preivousDate!==message.time) {
        console.log('Creating a new paragraph');
        let para = document.createElement('p');
        para.innerHTML = message.message;
        para.setAttribute('class','recText');
        document.getElementById('displaySection').append(para);
        preivousDate = message.time;
      }
      console.log('Message received from socket is: ', message)
    })
  })

  useEffect(() => {
    if (messageSend !== '' && messageSend.trim().length !==0) {
      console.log('Message is definitely sent!')
      let para = document.createElement('p');
      para.innerHTML = messageSend;
      para.setAttribute('class','sentText');
      document.getElementById('displaySection').append(para);
      document.getElementById('displaySection').scrollTo(0,document.getElementById('displaySection').scrollHeight);
      clientSocket.emit('privateMessage', {
        sender: myUsername,
        message: messageSend,
        receiver: currentUsername
      });
    }
  }, [messageSend])

  useEffect(() => {
    console.log('Username useeffect is called')
    if (currentUsername !== 'Empty' && loadOnlyOneTime) {
      fetchingData();
      loadOnlyOneTime=false
    }
  }, [currentUsername])

  const fetchingData = () => {
    fetch('http://localhost:5000/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ currentUsername, myUsername })
    }).then((res) => res.json()).then((data) => { addingComponents(data); console.log(data) })
  }

  const addingComponents = (data) => {
    let rows = 1;
    data.map((element) => {
      let para = document.createElement('p');
      para.innerHTML = element.message;
      if (element.status === 'rec') {
        para.setAttribute('class', 'recText');
      } else {
        para.setAttribute('class', 'sentText');
      }
      para.style.gridRow = `${rows}`
      document.getElementById('displaySection').appendChild(para);
      rows = rows + 1;
    })
    changeValue(rows);
    console.log('Number of rows Is: ', numOfRows);
  }

  return (
    <div id='displaySection' className='displayChats'>
    </div>
  )
}
