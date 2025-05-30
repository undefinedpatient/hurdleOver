import '../styles/styles.css';
import '../styles/index.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Profile from './Profile.jsx';

function Header(){
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
                    <a href="#">Home</a>
                    <Link to="/forum">Forum</Link>
                </span>
                <span>
                    <Profile username={username}/>
                </span>
                
            </nav>
        </header>
    );
}
export default Header;