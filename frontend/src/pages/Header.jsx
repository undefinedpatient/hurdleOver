import '../styles/styles.css';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

// This function take username only but not the entire info
function Profile({username}){
    if(username!=null&&username.length!=0){
        return (
            <>
                <Link to="/createpost">Create New Post</Link>
                <div className="dropdown">
                    <Link to="/settings">{username}</Link>
                    <div className="dropdownContent">
                        <Link to="/myposts">MyPosts</Link>
                        <Link to="/login" onClick={logout}>Logout</Link>
                    </div>
                </div>
            </>
            
            
        );
    }else{
        return (
            <div>
                <Link to="/login">Login</Link>
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
    const nagivate = useNavigate();
    useEffect(()=>{
        async function checkLoginStatus(){
            const res = await fetch('http://localhost:4000/profile',
                {
                    method: 'GET',
                    credentials: "include"
                }
            )
            const info = await res.json();
            if(res.status != 200 || info == null || info?.username==null){
                nagivate("/login");
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