import React from 'react';
import logo from '../../assets/images/dotlogowithshadow.png';
import './cssfiles/pagecss.css'

export default function Signup() {

  const signuprequest = () => {
    const susername = document.getElementById('signuserid').value;
    const spassword = document.getElementById('signpasswordid').value;

    console.log('We got a username: ', susername)

    fetch(
      'http://localhost:5000/signup',
      {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ susername, spassword })
      }
  ).then((response) => {return response.json()}).then((data) => { /*console.log('Fetched data is: ',data);*/ console.log(data); return data; })


  }

  return (
    <>
            <div>
                <div className='logoDivisionSignup'>
                    <img src={logo} className='logo-sectionSignup' />

                    <div className='fieldsSignup'>
                        <input type={'text'} placeholder='Username' name={'ssusername'} id='signuserid' />
                        <br />
                        <input type={'text'} placeholder='Login Password' name={'sspassword'} id='signpasswordid' />
                        <br />
                        <button onClick={() => { signuprequest() }}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </>
  )
}
