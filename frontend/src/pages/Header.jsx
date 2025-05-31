import '../styles/styles.css';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

// This function take username only but not the entire info
function Profile({username}){
    if(username!=null&&username.length!=0){
        return (
            <div className="dropdown">
                <Link to="/profile">{username}</Link>
                <div className="dropdownContent">
                    <Link to="/myposts">MyPosts</Link>
                    <Link to="/profile">Setting</Link>
                    <Link to="/login" onClick={logout}>Logout</Link>
                </div>
            </div>
            
        );
    }else{
        return (
            <div>
                <Link to="/Login">Login</Link>
            </div>
            
        );
    }
}
//Logout Handler
function logout(){
    fetch("http://localhost:4000/logout",{
        credentials: "include",
        method: "POST"
    })
}


export default function Header(){
    // Context
    const {userInfo, setUserInfo} = useContext(UserContext);
    // 
    useEffect(()=>{
        async function checkLoginStatus(){
            const res = await fetch('http://localhost:4000/profile',
                {
                    method: 'GET',
                    credentials: "include"
                }
            )
            const info = await res.json();
            if(info?.username==null){
                setUserInfo({});
                return;
            }
            setUserInfo(info);
            return;
        }

        checkLoginStatus();
    }, []);


    return (
        <header>
            <img className="icon" src={logo}></img>
            <h3>HurdleOver</h3>
            <nav>
                <span>
                    <Link to="/">Home</Link>
                    <Link to="/forum">Forum</Link>
                </span>
                <span>
                    <Profile username={userInfo.username}/>
                </span>
            </nav>
        </header>
    );
}