
import "./recbtn.css"
import React, { useState, useEffect } from "react";

import { hostname } from "./index";
let Recbtn = (prop) => {
  let emoji = ["❤️", "😂", "👍", "😡", "😢"];
  let timeOut;
  let reactfun = async (e) => {
    timeOut = setTimeout(async () => {
      clearTimeout(timeOut)
      
      let url;
      prop.commentid
        ? (url = prop.replyid && `${hostname}/auth/user/react/?id=${prop.userid}&replyid=${prop.replyid}&postid=${prop.postid}&commentid=${prop.commentid}`
        || `${hostname}/auth/user/react/?id=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`)
        : (url = `${hostname}/auth/user/react/?id=${prop.userid}&postid=${prop.postid}`);
            let dd = await fetch(url, {
           method: "post",
           body: JSON.stringify({react :e.target.innerText}),
               mode: "cors",
           credentials:"include",
  
           headers: {
             "Content-Type": "application/json",
             // 'Content-Type': 'application/x-www-form-urlencoded',
           },
         });
  
         dd.json().then((e) => {
           console.log(e);
  
           if (e.success) {
            
             // const navigate = useNavigate()
            
             // setredirect("/auth")
           }
         });
          
    },2000)
    
  }
  return (
    <div className="react"
      style={{ position: "absolute", bottom: "20px", left: "0px",  }}
    >
      {emoji.map((e) => {
          return <p className="emoji" onClick={reactfun} style={{ marginRight: "5px",fontSize:"25px" }}>{ e}</p>;
      })}
    </div>
  );
};



export default Recbtn