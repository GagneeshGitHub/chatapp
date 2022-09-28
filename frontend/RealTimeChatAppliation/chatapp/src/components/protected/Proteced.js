import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import thistore from '../store/Store';
import { myUsername,currentUsername } from '../topglobalvaribales/TopGlobalVariable';

export default function Proteced(props) {
  const store = thistore;
  const {Component} = props;
  const navigate = useNavigate();

  const [userarray, setUserArray] = useState([]);

  useEffect(()=>{
    let storeobj = store.getState()
    //let login = storeobj.login;
    let login = 'true';
    if(login!=="true"){
      navigate("/");
    }else{
      fetch('http://localhost:5000/usercontacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({myUsername,currentUsername})
      }
      ).then((res)=>res.json()).then((data)=>setUserArray(data));
    }
  })

  return (
    <>
    <Component userDetails={userarray}/>
    </>
  )
}
