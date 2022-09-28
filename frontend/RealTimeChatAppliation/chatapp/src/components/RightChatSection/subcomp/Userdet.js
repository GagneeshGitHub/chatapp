import React from 'react'
import '../cssfile/file.css'
import { currentUsername, curUsername } from '../../topglobalvaribales/TopGlobalVariable';

export default function Userdet(props) {
  const element = props.element;
  const userId = element.username;
  const imageUrl = element.url;

  const setUsername  = (value)=>{
    curUsername(value);
    console.log('Value of currentUsename is: ', currentUsername)
  }

  window.addEventListener('rerender',()=>console.log('Event listener is called successfully'))

  return (
    <button id={userId} className='userDetails' onClick={()=>setUsername(userId)}>
      <div className='udd1'>
        <img src={imageUrl}/>
      </div>
      <div className='udd2'>
        <h1>{userId}</h1>
      </div>
    </button>
  )
}
