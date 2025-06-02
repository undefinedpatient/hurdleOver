import "../styles/styles.css";
import "../styles/authPage.css";
import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    // Local Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nagivate = useNavigate();
    // Context
    const {userInfo, setUserInfo} = useContext(UserContext);
    async function login(event){
        event.preventDefault();
        const res = await fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({username:username,password:password}),
            headers: {'Content-Type':'application/json'},
            credentials: "include"
        });
        if(res.status == 200){
            nagivate("/");
        }else{
            alert("Login Failed");
        }   
    }
    return (
        <div className="authPage" onSubmit={login}>
            <form className="auth">
                <h3>HurdleOver</h3>
                <h4>Login</h4>
                <span>
                    <label>Username:&emsp;</label>
                    <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
                </span>
                <span>
                    <label>Password:&emsp;</label>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                </span>
                <Link to="/register" className="toRegister">Create an account</Link>
                <button type="submit">Login</button>
                <Link to="/" className="toHome"></Link>
            </form>
        </div>
    );
}