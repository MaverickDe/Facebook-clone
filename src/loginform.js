import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";
import "./loginpage.css"
import { hostname } from "./index";
import { location, positionname } from "./functions";

let Loginform = () => {
     const [input, setinput] = useState({});
     const [redirect, setredirect] = useState("");
     const navigate = useNavigate();
     let onChangeHandler = (e) => {
       console.log(e.target.value, e.target.name);
       let obj = {};
       let name = e.target.name;
       let value = e.target.value;
       console.log(e.target.id);

       obj[name] = value;
       setinput({ ...input, ...obj });
     };
     console.log(input);
     let onSubmit = async (e) => {
       e.preventDefault();
       console.log(input);
       let formd = document.querySelector(".lgfrm");
       let formData = new FormData(formd);
       console.log(navigator);

       let loc = await location;

       if (loc) {
         let b = await positionname(loc.latitude, loc.longitude);
         if (b) {
           loc.info = b;
         }
         setinput({ ...input, temporallocation: loc });
       }
       // console.log(mainlocation)

       for (const [key, value] of formData) {
         console.log(key, value);

         if (value == "") {
           return;
         }

         // output.textContent += `${key}: ${value}\n`;
       }

       let dd = await fetch(`${hostname}/login`, {
         method: "post",
         body: JSON.stringify(input),
         mode: "cors",

         headers: {
           "Content-Type": "application/json",
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
       });

       dd.json().then((e) => {
         console.log(e);

         if (e.yeauth) {
           document.cookie = `yeauth=${e.yeauth}`;
           // const navigate = useNavigate()
           navigate("/auth/dashboard");
           // setredirect("/auth")
         }
       });
     };
    return (
      <form className="lgfrm">
        <h1 style={{ color: "red" }}>YEMA</h1>
        <div className="divv">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="email"
            type="email"
            value={input.email || ""}
            name="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="divv">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="password"
            type="password"
            name="password"
            value={input.password || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="login_" type="submit" onClick={onSubmit}>
            login
          </button>
          <Link to="/signup">create account</Link>
          <div >forgot password</div>
        </div>
      </form>
    );
}


export default Loginform