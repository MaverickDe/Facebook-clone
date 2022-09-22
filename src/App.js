import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./login.css"
import backgroundimg from "./img/images(6).jpg";

function App() {
    


    return (
      <div className="loginpg">
        <img className="img_" src={backgroundimg} alt="CREATE ACCOUNT" />
        <div
          style={{
            width: "300px",
            height: "300px",
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red" }}>YEMA</h1>
          <button className="login">Login</button>
                <button className="crtacct" style={{ marginTop: "10px" }}> create account</button>
                <button style={{ margin:"20px",border:"none",backgroundColor:"white"}} className="forgotAccount">forgot password</button>
        </div>
      </div>
    );
    
}

//  <Router>
//    <App />
//  </Router>;
export default App;