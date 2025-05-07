import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { tokenFun } from "../../redux/slices/tokenSlice";

const Login = () => {
  const [value, setValue] = useState({});
  const [message, setMessage] = useState("");
  const [messageDesign, setMessageDesign] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.tokenReducer.token;
  });

  const loginButtonEvent = (e) => {
    axios
      .post("http://localhost:5000/users/login", {
        email: value.email,
        password: value.password,
      })
      .then((res, req) => {
        setMessage(res.data.message);
        setMessageDesign({ backgroundColor: "green", fontSize: "20px" });
        localStorage.setItem("token", res.data.token);
        dispatch(tokenFun(res.data.token));
        navigate("/register");
      })
      .catch((e) => {
        console.log(e.message);
        setMessage(e.message);
        setMessageDesign({ backgroundColor: "red", fontSize: "20px" });
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="h2">Login</h2>
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            required
          />
        </div>
        <button className="button" onClick={loginButtonEvent}>
          Login
        </button>
        <div style={{fontSize:"16px",fontWeight:"normal"}}>
        Don’t have an account? <Link to={navigate("/register")}>Join</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
