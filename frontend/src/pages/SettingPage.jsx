import Header from "./Header";

import "../styles/settingPage.css";

export default function SettingPage(){
    return (
        <div className="settingPage">
            <Header/>
            <div>
                <div className="settingPanel">
                    <h4>Settings</h4>
                    <form>
                        <span>Name:&nbsp;<input></input><button>Change Name</button></span>
                        <span>Email:&nbsp;<input></input><button>Change Email</button></span>
                        <span><button>Delete Account</button></span>
                    </form>
                </div>
            </div>
            
        </div>
    );
}