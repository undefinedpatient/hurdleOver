import './styles/styles.css';
import './styles/index.css';
import logo from './assets/logo.svg';
import { Link } from 'react-router';

function Header(){
    return (
        <>  
            <header>
                <img className="icon" src={logo}></img>
                <h3>HurdleOver</h3>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
        </>
    );
}
export default Header;