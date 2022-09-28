import React from 'react'
import './cssfiles/cssfile.css'
import ProfilePopup from '../ProfilePop/ProfilePopup'
import RightChatSection from '../RightChatSection/RightChatSection'
import ChatProfileSection from '../ChatProfileSection/ChatProfileSection'
import toplogo from '../../assets/images/topdotlogo.png'
import profileIcon from '../../assets/images/tprofileicon.png'

var buttonClicked = false

export default function Profilesection(props) {
  let userDetails = props.userDetails;

  const displayPopup = () => {
    if (buttonClicked === false) {
      document.getElementById('profileId').style.transition = '0.5s';
      document.getElementById('popUpProfile').style.visibility = 'visible';
      document.getElementById('popUpProfile').style.width = '400px';
      document.getElementById('popUpProfile').style.height = '500px';
      document.getElementById('profileId').style.opacity = '1';
      document.getElementById('subDetails').style.visibility = 'visible';
      document.getElementById('subDetails').style.opacity = '1';
      buttonClicked = true;
    }
    else if (buttonClicked === true) {
      document.getElementById('profileId').style.transition = '0.5s';
      document.getElementById('popUpProfile').style.visibility = 'hidden';
      document.getElementById('popUpProfile').style.width = '0px';
      document.getElementById('popUpProfile').style.height = '0px';
      document.getElementById('profileId').style.opacity = '0';
      document.getElementById('subDetails').style.visibility = 'hidden';
      document.getElementById('subDetails').style.opacity = '0';
      buttonClicked = false;
    }
  }

  return (
    <div className='outerDivision'>
      <div className='navDotDivision'>
        <img src={toplogo}/>
        <button onClick={() => displayPopup()} className='pushItButton'><img src={profileIcon}/></button>
      </div>
      <ProfilePopup />
      <div className='chatDivision'>
        <ChatProfileSection />
        <RightChatSection userDetails={userDetails}/>
      </div>
    </div>
  )
}
