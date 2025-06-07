import Header from "./Header";

import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "../styles/settingPage.css";

export default function SettingPage(){
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
            if(info?.username==null){
                setUserInfo({});
                return;
            }
            setUserInfo(info);
            return;
        }
        checkLoginStatus();
    }, []);

    async function onChangeNameClicked(event){
        event.preventDefault();
        // Since there are only one "username" class, just use the first item found
        const changeProperty = document.getElementsByClassName("username")[0].value;
        console.log(userInfo.id);
        const response = await fetch(`http://localhost:4000/changeProfileInfo/${userInfo.id}`,
            {
                method: "put",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    username: changeProperty
                }),
                credentials: "include"

            }
        );
        if(response.status==200){
            nagivate("/login");
        }
        
    }
    return (
        <div className="settingPage">
            <Header/>
            <div>
                <div className="settingPanel">
                    <h4>Settings</h4>
                    <form>
                        <span>Name: {userInfo.username}</span>
                        <span><input className="username"></input><button onClick={onChangeNameClicked}>Change Name</button></span>
                        <span>Email: {"Not Available (Dont have money for db)"}</span>
                        <span><input disabled placeholder="Not Available"></input><button>Change Email</button></span>
                        <span><button>Delete Account</button></span>
                    </form>
                </div>
            </div>
            
        </div>
    );
}