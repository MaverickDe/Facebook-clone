import "./Postext.css";
import React, { useState, useEffect } from "react";
import Post from "./post"
import { BrowserRouter as Router, Switch, Route, Link, useParams ,useNavigate  } from "react-router-dom";
import { hostname } from "./index";
// import { post } from "../server/insession";

let Postext = (prop) => {
    let navigate =useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    let query ={}
    let url_
    for (const [key, value] of urlParams) {
        console.log(`${key}:${value}`);
        query[key]=value
    }
    console.log(query)
    
    // let [url,seturl] =useState("")
   
    // useEffect(() => {

    //     if (Object.values(query) != "") {
    
    //         seturl(
    //           `${hostname}/auth/user/post/?userid=${query.userid}&postid=${query.postid}`
    //         );
    //      }
    //     },[])
        
        if (Object.values(query) != "") {
    
            
               url_ =`${hostname}/auth/user/post/?userid=${query.userid
                    }&postid=${query.postid}`
                
         }
        //    url =`${hostname}/auth/user/post/?userid=${query.userid
        //         }&postid=${query.postid}`
            
            
        
    
let [deploy, setdeploy] = useState({});
    let load = async () => {  
       
            
            if (Object.values(query) == "") {
               return
            }
             let dep = await fetch(
               url_,
               {
                 mode: "cors",
    
                 headers: {
                   "Content-Type": "application/json",
                   // 'Content-Type': 'application/x-www-form-urlencoded',
                 },
    
                 credentials: "include",
               }
            );
            
        dep.json().then(e => {
               setdeploy(e)
              
            if (e && e.post[0].repost) {
                console.log(e, "dsjjjjjjjjjjjjjjjj", e.post[0].repost);
                // seturl(e.post[0].repost);
                url_ = e.post[0].repost
           
              
            }
        })
       
        
    }
    let load_ = async () => {  
        return new Promise(async (res, rej) => {
            
            if (Object.values(query) == "") {
                res( false)
            }
             let dep = await fetch(
               url_,
               {
                 mode: "cors",
    
                 headers: {
                   "Content-Type": "application/json",
                   // 'Content-Type': 'application/x-www-form-urlencoded',
                 },
    
                 credentials: "include",
               }
            );
            
            dep.json().then(e => {
               
                
                if (e &&  e.post[0].repost) {
             console.log(e, "dsjjjjjjjjjjjjjjjj", e.post[0].repost);
           
             url_=e.post[0].repost
            res(e.post[0].repost)
                 
                } else {
                    res(false)
                }
              
        })
        })
        
    }
    let [input ,setinput] =useState("")
    let submit = async (e) => {
        e.preventDefault()
        let u = await load_();
        console.log("sksksksksksk")
        let post={}
        if (url_) {
            post.repost=(url_)
           
        }
        if (u) {
            post.repost=u
        }
        console.log(u,"dssssssssss")
        
        if (input == "") {
            return
        }

        post.post=input

           let dep =   await fetch(`${hostname}/auth/post/txt`, {
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
    
            body: JSON.stringify(post),
            credentials: "include",
        });
        dep.json().then((e) => {
           
                console.log("ddddddddddddddddd",e)
        })
    }
    
    let inpchg = (e) => {
       setinput(e.target.value)
        
    }
    useEffect(() => { load() },[])
    return (
        <div style={{width:"100%"}}>
            <h1 style={{color:"red"}}>YEMA</h1>
            <form style={{width:"100%",height:"fit-content"}}>
                <button>cancel</button>
                <textarea onChange={inpchg} value={ input}placeholder="what do you feel" className="pt"name="post"></textarea>
                 <button style={{ width: "100px" }} type="submit" onClick={submit}>post</button>
                <div>
                    {
                      
                        Object.values(deploy)!="" &&    <div>
                                 <Post
          {...{
            deploy: deploy ,
          }}
        />
                                
                        
                    </div>} 
                </div>
            </form>
        </div>
    )
}



export default Postext 