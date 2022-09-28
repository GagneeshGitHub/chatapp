import React from 'react'
import './cssfile/file.css'
import Writetext from './subcomponent/Writetext'
import Display from './subcomponent/Display'

export default function ChatProfileSection() {


  return (
    <div className='chatProfileSection'>
      <Writetext />
      <Display />
    </div>
  )
}
