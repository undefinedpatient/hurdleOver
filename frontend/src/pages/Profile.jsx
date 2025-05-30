import '../styles/styles.css';
import '../styles/index.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

//username: String
export default function Profile({username}){
    if(username.length!=0){
        return (
            <Link to="/profile">{username}</Link>
        );
    }else{
        return (
            <Link to="/login">Login</Link>
        );
    }
    
}