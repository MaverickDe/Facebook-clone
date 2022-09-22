// import ReactDOM from "react-dom/client";
import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Switch, Route ,Link } from "react-router-dom";
import "./dashboard.css";
import img from "./img/images(6).jpg";
import img2 from "./img/The-Man-From-Toronto-2022-download-NetNaija.xyz_.jpg";
import img3 from "./img/Web capture_17-6-2022_03532_bankingapp12.herokuapp.com.jpeg";
import {hostname} from "./index"

import Post from "./post";

import { fireEvent } from "@testing-library/react";
const Dashoard = () => {
  let [searchstyle, setsearchstyle] = useState("none");
  let [deploy, setdeploy] = useState({});

  let dashboardstyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  };

  let search = (e) => {
    searchstyle == "none" ? setsearchstyle("flex") : setsearchstyle("none");
    };
    
    let vv = async () => {
        let deploy_ = await fetch(`${hostname}/auth/dashboard`, {
          mode:"cors",
          credentials:"include"
      });
        deploy_.json().then((e) => {
            console.log(e, "SCsccs")
            if (e.userid) {
                
                setdeploy(e);
            }
            console.log(deploy)
      });
    };
    useEffect(() => {
        vv()
        
    }
        , []);

    // let viewstory=()

  return (
    <div style={dashboardstyle} className="dashboard">
      <div className="logohead">
        <h1 className="logo">YEMA</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={search}>search</button>
          <input
            style={{ width: "300px", height: "30px", borderRadius: "30px" }}
            className="search_usr"
          />
        </div>
      </div>

      <div className="story">
        <div className="storydiv" style={{ position: "relative" }}>
          <img src={deploy.profileimg || img} alt="story" />
          <button
            style={{
              position: "absolute",
              top: "12px",
             left: "18px",
              backgroundImage:"none",
                          backgroundColor: "rgb(240, 248, 255,7)",
              color:"black"
            }}
          >
            +
          </button>
        </div>
        {deploy.story &&
          deploy.story.map((e) => {
            return (
              <Link to={`/auth/viewstory/:${e.userid}`}>
                <div className="storydiv">
                  <img src={e.profileimg} alt="story" />
                </div>
              </Link>
            );
          })}
      </div>
      <div className="postme">
        whats on your mind
        <button>
          <Link to={"/auth/postext"} className="link_">
            text
          </Link>
        </button>
        <button>
          <Link to={"/auth/postimg"} className="link_">
            picture
          </Link>
        </button>
      </div>
          <div className="post">
              {
                  deploy.post &&
        <Post
          {...{
            deploy: deploy,
          }}
        />
              }
      </div>
    </div>
  );
};

export default Dashoard;
