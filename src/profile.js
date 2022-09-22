import React, { useState } from "react";
import "./crtacctform.css";

import imgg from "./img/images(6).jpg"
import "./profile.css"

import img from "./img/images(6).jpg";
import img2 from "./img/The-Man-From-Toronto-2022-download-NetNaija.xyz_.jpg";
import img3 from "./img/Web capture_17-6-2022_03532_bankingapp12.herokuapp.com.jpeg";

import Post from "./post";

let profile = () => {
    
    return (
      <div className="profile__">
        <div className="propics">
          <button className="up">up</button>
          <img className="uppics" src={imgg} />
          <div className="profilepics">
            <div>
              <button className="down">down</button>
              <img className="downpics" src={imgg} />
            </div>
          </div>
        </div>
        <h1 className="myname">asotibe prince</h1>
        <div>
          <button
            className="addtostory"
            style={{ height: "30px", marginRight: "10px" }}
          >
            Add to story
          </button>
          <button
            className="editprofile"
            style={{ height: "30px", marginRight: "10px" }}
          >
            edit profile
          </button>
        </div>

        <div className="friends" style={{ width: "calc(100% - 20px )" }}>
          <div
            style={{
              width: "100%",
              marginRight: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <p>friends</p>
            <p className="seeallfriends">see all</p>
          </div>
          <div className="friendlist">
            <div className="friend">
              <div className="imggg">
                <img src={imgg} />
              </div>
              <p>namedfd</p>
            </div>
          </div>
        </div>

        <div>
          <button style={{ height: "30px", marginRight: "10px" }}>
            photos
          </button>
          <button style={{ height: "30px", marginRight: "10px" }}>
            message
          </button>
        </div>

        <div className="postme" style={{ margin: "20px" }}>
          whats on your mind
          <button>text</button>
          <button>picture</button>
        </div>

        <div className="info" style={{ marginRight: "auto" }}>
          <div>
            <span>lives in</span>
            <span>lagos</span>
          </div>
          <div>
            <span>work in</span>
            <span>techie limited</span>
          </div>
        </div>

        <div className="mypost">
          <Post
            {...{
              img: [img2, img, img3, img, img2],
            }}
          />
        </div>
      </div>
    );
    
}


export default profile