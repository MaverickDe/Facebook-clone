import React, { useEffect, useState } from "react";
import "./crtacctform.css"
import { hostname } from "./index"
import { location, positionname } from "./functions";
import { BrowserRouter as Router, Routes, Route,Link ,useNavigate} from "react-router-dom";

let Crtacctform = () => {


    const [input , setinput]=useState({})
    const [redirect , setredirect]=useState("")
     const navigate = useNavigate();
    let onChangeHandler = (e) => {
        console.log(input)
        let obj = {}
        let name = e.target.name;
        let value = e.target.value;
        console.log(e.target.id)
       
        obj[name]=value
        setinput({...input,...obj})
        
    }

    let loadpos =async ()=>{
      
    console.log("kkk")
  
    let loc = await location
    console.log(loc)
        
        if (loc) {
            
          let b = await positionname(loc.latitude, loc.longitude);
          console.log(b)
            if (b) {
                loc.info=b
            }
            console.log(input)
            setinput({ ...input, mainlocation:loc });
            console.log(input)
          }
          setinput({ ...input, mainlocation:loc });
    }
  useEffect(()=> {
      
  loadpos()
  console.log(input)
    },[])
    let onSubmit = async (e) => {
        e.preventDefault()
        console.log(input)
        let formd = document.querySelector(".loginfrm");
        let formData = new FormData(formd)
        console.log(navigator)
      


        

       
         for (const [key, value] of formData) {
          console.log(key,value)
          
             if (value == "") {
              
               return
             }
             
             
             // output.textContent += `${key}: ${value}\n`;
             
            }
            
            let dd = await fetch(`${hostname}/signup`, {
                                         method: "post",
                body: JSON.stringify(input),
                mode: "cors",
                
                                         
                                         headers: {
                                             'Content-Type': 'application/json'
                                             // 'Content-Type': 'application/x-www-form-urlencoded',
                                         },
            })
        
        dd.json().then(e => {
            console.log(e)
            
            if (e.yeauth) {
    
                document.cookie = `yeauth=${e.yeauth}`;
                // const navigate = useNavigate()
                navigate('/auth')
                // setredirect("/auth")
            }
        })
        
    }
    
 
    return (
      <form className="loginfrm" style={{height:"fit-content"}}>
        <h1 style={{ color: "red" }}>YEMA</h1>
        <div className="divv">
          <label htmlFor="email">email</label>
          <input
            type="email"
            value={input.email || ""}
            onChange={onChangeHandler}
            name="email"
            id="email"
          />
        </div>
        <div className="divv">
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={input.password || ""}
            onChange={onChangeHandler}
            name="password"
            id="password"
          />
        </div>
        <div className="divv">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            value={input.firstname || ""}
            onChange={onChangeHandler}
            name="firstname"
            id="firstname"
          />
        </div>
        <div className="divv">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            value={input.lastname || ""}
            onChange={onChangeHandler}
            name="lastname"
            id="lastname"
          />
        </div>
        <div className="divv">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            value={input.dob || ""}
            onChange={onChangeHandler}
            name="dob"
            id="dob"
          />
        </div>
        <div className="divv">
          <label htmlFor="male">male</label>
          <input
            type="radio"
            checked={input.gender == "M" || false}
            onChange={onChangeHandler}
            name="gender"
            id="male"
            value="M"
          />
          <label htmlFor="female">female</label>
          <input
            type="radio"
            checked={input.gender == "F" || false}
            onChange={onChangeHandler}
            name="gender"
            value="F"
            id="female"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="login_" onClick={onSubmit} type="submit">
            create account
          </button>
          <Link to="/">login</Link>
          
        </div>
      </form>
    );
}


export default Crtacctform