
import React, { useState, useRef, useEffect, useReducer } from "react";


import { hostname } from "./index";
import { postmultiplepart, fetchgetfiles_,fetchget_,fetchimg_ } from "./functions";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import img from "./img/images(6).jpg";
import "./addfriends.css"

let Addfriends = () => {

    let [friend,setfriend] =useState([])
    // let friendreq,setfriendreq =useState([])

    let loadfriends = async () => {

        let v = await fetchget_(`${hostname}/auth/friendssugandreq`)
        console.log(v)
        setfriend(v)

        
        
        
    }
    
   let  loadimage = () => {
        
        friend.forEach(async (e,index) => {
            if (e.profileimage) {
                let url = await fetchimg_(e.profileimage)
                
               let vclone =[...friend]
               vclone[index].imageurl=url.url
               setfriend(vclone)

            }
            
        })
    }

    useEffect(() => {
        loadfriends()
        loadimage()
    },[])
    
    return (
        <div>
            <div className="friendreq" style={{ width: "100%" }}>
                <h1 style={{color:"red"}}>YEMA</h1>
                <h1 >Friend request</h1>
                <div >
                    
                    <div className="req">
                        <div>  <img src={img} style={{ marginRight: "20px", width:"50px",height:"50px",borderRadius:"50%"}}></img></div>
                        <h4 style={{ marginRight: "10px", width: "60%", wordBreak: "break-all" }}>jokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhn</h4>
                        <button style={{marginRight:"10px"}}>accept</button>
                        <button style={{marginRight:"10px"}}>reject</button>

                    </div>
                </div>

            </div>
            <div className="sugfrnds">
                <h1>Suggested friends</h1>
                <div>
                    {
                        friend.friendsug && 
                        friend.friendsug.map(e => {
                            
                   return <div className="sug">
                        <div>  <img src={e.url||img} style={{ marginRight: "20px", width:"50px",height:"50px",borderRadius:"50%"}}></img></div>
                      <h4 style={{ marginRight: "10px", width: "60%", wordBreak: "break-all" }}>{`${e.firstname} ${e.lastname}`}</h4>
                       <button style={{ marginRight: "10px" }} onClick={() => {
                           
                        }}>send request</button>
                      

                    </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}


export default Addfriends