import React from 'react'
import './cssfile/file.css'
import Userdet from './subcomp/Userdet';

export default function RightChatSection(props) {
  let userDetails = props.userDetails;

  return (
    <div id='usDet' className='rightChatSection'>
      {
         userDetails.map((element,index)=>{
           return (<Userdet key={`unique${index}`} element={element}/>)
         })
      }
    </div>
  )
}
