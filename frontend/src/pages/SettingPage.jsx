import Header from "./Header";

import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";

import "../styles/settingPage.css";

export default function SettingPage(){
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
            if(info?.username==null){
                setUserInfo({});
                return;
            }
            setUserInfo(info);
            console.log(info);
            return;
        }

        checkLoginStatus();
    }, []);
    return (
        <div className="settingPage">
            <Header/>
            <div>
                <div className="settingPanel">
                    <h4>Settings</h4>
                    <form>
                        <span>Name: {userInfo.username}</span>
                        <span><input></input><button>Change Name</button></span>
                        <span>Email: {"Not Available (Dont have money for db)"}</span>
                        <span><input disabled placeholder="Not Available"></input><button>Change Email</button></span>
                        <span><button>Delete Account</button></span>
                    </form>
                </div>
            </div>
            
        </div>
    );
}