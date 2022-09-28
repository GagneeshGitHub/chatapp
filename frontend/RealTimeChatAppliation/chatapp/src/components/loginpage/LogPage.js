import React from 'react';
import './cssfiles/pagecss.css'
import logo from '../../assets/images/dotlogowithshadow.png';
import { useNavigate } from 'react-router-dom';
import thistore from '../store/Store';
import Actions from '../store/actions/Action';
import { myUsername, setMyUsername } from '../topglobalvaribales/TopGlobalVariable';

export default function LogPage(){
    const store = thistore;
    const actions = Actions;
    const navigate = useNavigate();
    const afThen = (data,username)=>{
        const imgUrlValue = `${username}${data.phone}`;
        const loginValue = data.login;

        store.subscribe(()=>{ navigateTo() });

        store.dispatch(actions('ADDING',{imgUrl: imgUrlValue,login: loginValue}))
    }

    const navigateTo = ()=>{
        console.log('Navigation is called')
        navigate('/profilesection');
    }

    const loginRequest = () => {
        const username = document.getElementById('userid').value;
        const password = document.getElementById('passwordid').value;
        setMyUsername(username);

        fetch(
            'http://localhost:5000/userlogin',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
        ).then((response) => {return response.json()}).then((data) => { /*console.log('Fetched data is: ',data);*/  afThen(data,username); })
    
    }

    return (
        <>
            <div>
                <div className='logoDivision'>
                    <img src={logo} className='logo-section' />

                    <div className='fields'>
                        <input type={'text'} placeholder='Username' name={'username'} id='userid' />
                        <br />
                        <input type={'text'} placeholder='Login Password' name={'password'} id='passwordid' />
                        <br />
                        <button onClick={() => {loginRequest() }}>LOG IN</button>
                    </div>
                </div>
            </div>
        </>
    )
}