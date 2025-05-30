import "../styles/styles.css";
import "../styles/authPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(event){
        event.preventDefault();
        const res = await fetch('http://localhost:4000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'}
        });
        if(res.status == 200){
            alert("Success!");
        }else{
            alert("Failed.");
        }
    }

    return (
        <div className="authPage" onSubmit={register}>
            <form className="auth">
                <h3>HurdleOver</h3>
                <h4>Register</h4>
                <span>
                    <label>Username:&emsp;</label>
                    <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
                </span>
                <span>
                    <label>Password:&emsp;</label>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </span>
                <Link to="/login" className="toLogin">already have an account?</Link>
                <button>Register</button>
                <Link to="/" className="toHome"> </Link>
            </form>
        </div>
    );
}