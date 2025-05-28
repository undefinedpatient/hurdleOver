import "./styles/styles.css";
import "./styles/login.css";

export default function Login(){
    return (
        <div className="loginPage">
            <form className="login">
                <h3>HurdleOver</h3>
                <span>
                    <label>Username:&emsp;</label>
                    <input type="text" placeholder="username"/>
                </span>
                <span>
                    <label>Password:&emsp;</label>
                    <input type="password" placeholder="password"/>
                </span>
                
                <button>Login</button>
            </form>
        </div>
    );
}