import '../styles/styles.css';
import '../styles/header.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile({username}){
    if(username.length!=0){
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

function logout(){
    fetch("http://localhost:4000/logout",{
        credentials: "include",
        method: "POST"
    })
}


export default function Header(){
    const [username, setUsername] = useState("");
    useEffect(()=>{
        async function checkLoginStatus(){
            const res = await fetch('http://localhost:4000/profile',
                {
                    method: 'GET',
                    credentials: "include"
                }
            )
            const info = await res.json();
            if(info.username==null){
                setUsername("");
                return;
            }
            setUsername(info.username);
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
                    <Profile username={username}/>
                </span>
                
                
            </nav>
        </header>
    );
}