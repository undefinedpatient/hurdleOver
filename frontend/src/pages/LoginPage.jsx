import "../styles/styles.css";
import "../styles/login.css";
import { Link } from 'react-router';
import { useState } from "react";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function login(event){
        event.preventDefault();
        const res = fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'}
        });
    }
    return (
        <div className="loginPage" onSubmit={login}>
            <form className="login">
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