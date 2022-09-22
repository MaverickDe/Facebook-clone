import React, { useState, useEffect } from "react";
import "./reactionbtn.css";
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import Comment from "./comment";
import Recbtn from "./recbtn"
import { BrowserRouter as Router, Switch, Route, Link, useParams, useSearchParams } from "react-router-dom";
import Viewreactors from "./viewreactors";
function Reactionbtn(prop) {
  let comment = prop.comment 

let fetchimg_ = (body) => {
    return new Promise(async (res,rej) => {
        
     let dep =   await fetch(`${hostname}/auth/profile/img`, {
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
    
            body: JSON.stringify(body),
            credentials: "include",
        });
        dep.json().then((e) => {
                 res(e)
        }).catch((e) => {
            rej(e)
        })
    })
}
  console.log(prop.deploy);
  let [proimg, setproimg] = useState(false);
  let fetchim = async (test, body) => {
    if (test &comment!="") {
      let bb = await fetchimg_(test);
      setproimg(bb);
    }
  };
    console.log(comment);
    // console.log(comment[0]);

  useEffect(() => {
    fetchim(
      comment && comment!=""&& comment[comment.length-1].profileimage,
   
    );
  },[]);


  let [viewcmt ,setviewcmt] =useState(false)
  let cmtfun = () => {
    // document.querySelector(".discmt").style.display = "flex"
    setviewcmt(!viewcmt)
    // document.querySelector(".auxc").style.display="none"
  }
 
  let [viewre, setviewre] = useState(false)
  let viewrect = () => {
    setviewre(!viewre)
  
  }
  return (
    <React.Fragment>
      <div className="con">
        <div className="recbtndiv" style={{ position: "relative" }}>
          {viewre && prop.react && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                top: "0px",
                marginTop: "50px",
                left: "0px",
                flexWrap: "wrap",
                width: "100%",
                height: "fit-content",
              }}
            >
              <button onClick={viewrect}>back</button>
              <Viewreactors {...{ react: prop.react }} />
            </div>
          )}
          <Link
            to={ `/auth/postext/?userid=${prop.userid}&postid=${prop.postid}`}
          >
            <div className="shrbtn">
              <button>share</button>
            </div>
          </Link>
          <div className="comment">
            <button onClick={cmtfun}>comment</button>
          </div>
          <div className="reaction" style={{ position: "relative" }}>
            <div>
              <span>👍❤️</span>
              <span style={{ marginLeft: "10px" }}>
                {(prop.react && prop.react.length) || ""}
              </span>
            </div>
            <button onClick={viewrect}>reaction</button>
            <Recbtn {...{ userid: prop.userid, postid: prop.postid }} />
            {/* <div>
          
        </div> */}
          </div>
        </div>
        {comment && !viewcmt && (
          <div
            className="auxc"
            style={{
              width: "100%",
              height: "auto",
              display: "flex",

              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={proimg || img}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  border: "1px solid grey",
                }}
              ></img>
              <h3>{`${comment[comment.length - 1].firstname}  ${
                comment[comment.length - 1].firstname
              }`}</h3>
            </div>
            <p> {comment[comment.length - 1].write}</p>
          </div>
        )}
      </div>
      {viewcmt && (
        <Comment
          {...{
            comment: prop.comment,
            userid: prop.userid,
            postid: prop.postid,
            viewcmt: viewcmt,
          }}
        />
      )}
    </React.Fragment>
  );
}

export default Reactionbtn;
