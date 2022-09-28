import React, { Component, useEffect, useState } from 'react'
import './cssfile/cssfile.css'
import profilePhoto from '../../assets/images/tprofileicon.png';
import { myUsername } from '../topglobalvaribales/TopGlobalVariable';

export default function ProfilePopup() {

  var username = '';

  useEffect(() => {
    username = myUsername
  }, [myUsername])

  return (
      <div id='popUpProfile' className='profilePopupSection'>
        <div className='popUpPhoto'>
          <img id='profileId' src={profilePhoto} />
        </div>
        <div id="subDetails" className='detailUser'>
          <h5>username</h5>
          <h3>{myUsername}</h3>
        </div>
      </div>
  )
}
