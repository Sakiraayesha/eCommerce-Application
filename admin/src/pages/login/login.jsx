import { useState } from "react";
import "./login.scss";
import { login } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <label className="loginLabel">
                    Username: 
                    <input className="loginInput" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label className="loginLabel">
                    Password:
                    <input className="loginInput" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <button className="loginButton" onClick={handleClick} disabled={isFetching}>Login</button>
                {error && <span style={{color: "red"}}>Login Failed!</span>}
            </div>
        </div>
    );
}

export default Login;