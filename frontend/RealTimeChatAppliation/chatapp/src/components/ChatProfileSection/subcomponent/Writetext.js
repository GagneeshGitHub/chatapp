import React from 'react'
import '../cssfile/file.css'
import { setMessage } from './currentChats';

export default function Writetext() {
  const addPara = ()=>{
    let text = document.getElementById('sendText').value;

    setMessage(text);

    document.getElementById('sendText').value = '';
  }

  return (
    <div id='srtextarea' className='sendingText'>
      <input id='sendText' className='inputText' type={'text'} />
      <button className='sendButton' onClick={()=>addPara()}>Send</button>
    </div>
  )
}
