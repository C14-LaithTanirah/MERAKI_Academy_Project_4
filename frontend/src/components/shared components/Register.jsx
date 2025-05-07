import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [value, setValue] = useState({});
  const [permission, setPermission] = useState("Custumer");
  const [message, setMessage] = useState("");
  const [messageDesign, setMessageDesign] = useState({});
  const navigate = useNavigate();

  const registerButtonEvent = () => {
    console.log(permission);
    axios
      .post("http://localhost:5000/users/register", {
        email: value.email,
        password: value.password,
        userName: value.userName,
        number: value.number,
        role: permission,
      })
      .then((res, req) => {
        console.log(res.data);
        setMessage(res.data.message);
        setMessageDesign({
          backgroundColor: "green",
          fontSize: "20px",
          margen: "20px",
        });
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.message);
        setMessage(e.response.data.message);
        setMessageDesign({
          backgroundColor: "red",
          fontSize: "20px",
          margenTop: "20px",
        });
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="h2">Register</h2>
        <div>
          <label className="label">User Name</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setValue({ ...value, userName: e.target.value })}
            required
          />
        </div>
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
        </div>{" "}
        <div>
          <label className="label">number</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setValue({ ...value, number: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Account Type</label>
          <select
            className="input"
            required
            onChange={(e) => {
              setPermission(e.target.value);
            }}
          >
            <option selected> Custumer </option>
            <option>Provider</option>
            <option>Admin</option>
          </select>
        </div>
        <button className="button" onClick={registerButtonEvent}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
