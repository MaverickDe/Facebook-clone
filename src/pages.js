
import "./pages.css"
import React, { useState ,useEffect} from "react";

// let socket = io();
import {BrowserRouter as Router , Switch,Route ,Outlet,Link} from "react-router-dom"
import { hostname } from "./index"
import { fetchimg_, fetchpost_, fetchget_ } from "./functions";
// import vv from`${hostname}/socket.io/socket.io.js` ;
let Pages = () => {
    console.log("sss")
    let style = {
        textDecoration: "none",
        color:"black"
  }

  let fetchfile = async () => {
     let dep = await fetch(`${hostname}/socket.io/socket.io.js`, {
       headers: {
         "Content-Type": "text/javascript",

         // 'Content-Type': 'application/x-www-form-urlencoded',
       },

       credentials: "include",
     });

     console.log(dep)
  }
  useEffect(()=> {fetchfile()




    
  
},[])
  
        return (
          <React.Fragment>
            <div
              style={{
                width: "100%",
                height: "calc(100% - 70px)",
                overflow: "scroll",
              }}
            >
              <Outlet />

              {/* <script src={`${hostname}auth/socket.io/socket.io.js`}></script> */}
            </div>
            <div className="pages">
              <Link style={{ ...style }} to="/auth/dashboard">
                home
              </Link>
              <Link style={{ ...style }} to="/auth/Addfriends">
                find friends
              </Link>
              <Link style={{ ...style }} to="/auth/notification">
                notification
              </Link>
              <Link style={{ ...style }} to="/auth/messages">
                messages
              </Link>
              <Link style={{ ...style }} to="/auth">
                profile
              </Link>
              <Link style={{ ...style }} to="/auth">
                logout
              </Link>
            </div>
            ;
          </React.Fragment>
        );
}


export default Pages