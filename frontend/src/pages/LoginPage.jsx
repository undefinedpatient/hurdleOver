import "../styles/styles.css";
import "../styles/authPage.css";
import { Link, Navigate } from 'react-router-dom';
import { useState } from "react";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function login(event){
        event.preventDefault();
        const res = await fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: "include"
        });
        if(res.status == 200){
            setRedirect(true);
        }else{
            alert("Login Failed");
        }   
    }

    if(redirect==true){
        return <Navigate to="/"/>;
    }
    
    return (
        <div className="authPage" onSubmit={login}>
            <form className="auth">
                <h3>HurdleOver</h3>
                <h4>Login</h4>
                <span>
                    <label>Username:&emsp;</label>
                    <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
                </span>
                <span>
                    <label>Password:&emsp;</label>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </span>
                <Link to="/register" className="toRegister">Create an account</Link>
                <button>Login</button>
                <Link to="/" className="toHome"></Link>
            </form>
        </div>
    );
}