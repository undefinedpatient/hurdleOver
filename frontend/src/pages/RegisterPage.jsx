import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/styles.css";
import "../styles/authPage.css";

export default function RegisterPage(){
    // Local Variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nagivate = useNavigate();
    // 
    async function register(event){
        event.preventDefault();
        const res = await fetch('http://localhost:4000/register',{
            method: 'POST',
            body: JSON.stringify({
                username:username,
                password:password
            }),
            headers: {'Content-Type':'application/json'}
        });
        if(res.status == 200){
            alert("Success!");
            nagivate("/login");
        }else{
            alert("Registration Failed.");
        }
    }

    return (
        <div className="authPage" onSubmit={register}>
            <form className="auth">
                <h3>HurdleOver</h3>
                <h4>Register</h4>
                <span>
                    <label>Username:&emsp;</label>
                    <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
                </span>
                <span>
                    <label>Password:&emsp;</label>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                </span>
                <Link to="/login" className="toLogin">already have an account?</Link>
                <button type="submit">Register</button>
                <Link to="/" className="toHome"> </Link>
            </form>
        </div>
    );
}