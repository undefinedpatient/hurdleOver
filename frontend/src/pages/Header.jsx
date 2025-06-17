import '../styles/styles.css';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

// This function take username only but not the entire info
function Profile({username}){
    async function toggleDropdownMenu(event){
        event.preventDefault();
        if(!document.querySelector(".dropdownContent").classList.contains("active")){
            document.querySelector(".dropdownContent").classList.add("active");
        }else{
            document.querySelector(".dropdownContent").classList.remove("active");
        }
    }
    if(username!=null&&username.length!=0){
        return (
            <>
                <Link to="/createpost">Create New Post</Link>
                <div className="dropdown">
                    <button className="dropdownButton" onClick={toggleDropdownMenu}>{username}</button>
                    <div className="dropdownContent">
                        <Link to="/settings">My Profile</Link>
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
                setUserInfo({});
                
                return;
            }
            await setUserInfo(info);
            
            return;
        }

        checkLoginStatus();
    }, []);

    async function toggleVerticalMenu(event){
        event.preventDefault();
        if(!document.querySelector(".verticalNav").classList.contains("active")){
            document.querySelector(".verticalNav").classList.add("active");
        }else{
            document.querySelector(".verticalNav").classList.remove("active");
        }
        
    }

    

    return (
        <header>
            <img className="icon" src={logo}></img>
            <h3>HurdleOver</h3>
            <nav className="horizontalNav">
                <span>
                    <Link to="/">Home</Link>
                    <Link to="/forum">Forum</Link>
                </span>
                <span>
                    <Profile username={userInfo.username}/>
                </span>
            </nav>
            <nav className="verticalNav">
                <span>
                    <Link to="/">Home</Link>
                    <Link to="/forum">Forum</Link>
                </span>
                <span>
                    <Profile username={userInfo.username}/>
                </span>
            </nav>
            <button className="verticalMenuButton" onClick={toggleVerticalMenu}></button>
        </header>
    );
}