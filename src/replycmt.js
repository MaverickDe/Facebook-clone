
import React, { useState, useEffect, useRef } from "react";
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import Recbtn from "./recbtn";
import Viewreactors from "./viewreactors";
import{ fetchimg_,fetchpost_,fetchget_} from "./functions";
import "./replycmt.css";


let Replycmt = (prop) => {
   let [viewreact, setviewreact] = useState(false);
   let viewrect = () => {
     setviewreact(!viewreact);
     console.log(document.querySelector(".backviewreactors"));
    
   };
    
let [input ,setinput] =useState("")
  let inputref = useRef(null)
  let inputdivref = useRef(null)
  let changecom = (e) => {
    setinput(e.target.value)
    
  }
  let submt = async (e) => {
    if (input == "") {
      return
    }

    await fetchpost_(inputref.current.id,{write:input})
    
  }
   let query = {};
   let url_;
   const urlParams = new URLSearchParams(window.location.search);
   let [comt ,setcomt]=useState({})
   for (const [key, value] of urlParams) {
     console.log(`"kk"`);
     query[key] = value;
  }
  let load = async () => {
       let dep = await fetch(`${hostname}/auth/comment/get/?id=${query.userid}&postid=${query.postid}&commentid=${query.commentid}`, {
      mode: "cors",
   
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

    
      credentials: "include",
    });
    dep
      .json()
      .then((e) => {
        console.log(e,"jdjdjdjdj")
        if (e.comment) {
          setcomt(e.comment)
          if (e.profileimage) {
            
            async function loadimg() {
              prop.img.forEach(async (e, index) => {
                let deploy_ = await fetchimg_(e);
                
                if (deploy_.url) {
                  let imx = [...comt];
                  imx[index].profileimage = deploy_.url;
                ;
                  setcomt(imx)
                    
                  }
                });
              }
            console.log(e.comment)
          }
          }
      
      })
     
    

  }

  useEffect(()=>{load()},[])
  let Btn = (prop) => {
    let reply = (e) => {
      let url;
      prop.replyid
        ? (url = `${hostname}/auth/user/replycomment/?id=${prop.userid}&replyid=${prop.replyid}&postid=${prop.postid}&commentid=${prop.commentid}`)
        : (url = `${hostname}/auth/user/replycomment/?id=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`);
    inputref.current.id=url
    inputdivref.current.querySelector(".submit").innerText = "reply";
    inputdivref.current.querySelector(".cancel").style.display = "none";
    inputdivref.current.querySelector(".input").value = "";
    }
    
  let edit = async (e) => {
    let url;
   prop.replyid
      ? (url = `${hostname}/auth/comment/edit/?userid=${prop.userid}&replyid=${prop.replyid}&postid=${prop.postid}&commentid=${prop.commentid}`)
      : (url =`${hostname}/auth/comment/edit/?userid=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`);
      inputdivref.current.querySelector(".input").value = prop.write;
      inputdivref.current.querySelector(
      ".input"
    ).id = url;
      inputdivref.current.querySelector(".submit").innerText = "edit";
      inputdivref.current.querySelector(".cancel").style.display = "flex";
  };
    let delete_ = async  (e) => {
      let url;
     prop.replyid
        ? (url = `${hostname}/auth/comment/delete/?id=${prop.userid}&replyid=${prop.replyid}&postid=${prop.postid}&commentid=${prop.commentid}`)
        : (url =`${hostname}/auth/comment/delete/?id=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`);
    await fetchpost_(url,{})
  };
  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ marginRight: "10px" }} onClick={reply}>
          reply
        </div>
      </div>
      <div
        className="recbt"
        style={{ position: "relative", width: "50px", height: "100%" }}
      >
        react
        {(prop.replyid && (
          <Recbtn
            {...{
              userid: prop.userid,
              postid: prop.postid,
              commentid: prop.commentid,
              replyid: prop.replyid,
            }}
          />
        )) || (
          <Recbtn
            {...{
              userid: prop.userid,
              postid: prop.postid,
              commentid: prop.commentid,
            }}
          />
        )}
      </div>
      <button onClick={edit}>edit</button>
      <button onClick={delete_}>delete</button>
    </div>
  );
}
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <button style={{ marginBottom: "20px" }}>back</button>
      <div style={{ width: "100%", height: "70%", overflowY: "scroll" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex" }}>
            <img
              src={img}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></img>
            <h3>{comt && `${comt.firstname} ${comt.lastname}`}</h3>
          </div>
          <p className="time">{comt && comt.time}</p>
          <p>{comt && comt.write}</p>
          {comt && (
            <Btn
              {...{
                commentid: query.commentid,
                userid: query.userid,
                postid: query.postid,
                write: comt.write,
              }}
            />
          )}
          <div className="tn" onClick={viewrect}>
            ❤️👍
            {(comt.react && comt.react.length) || ""}
          </div>
          {viewreact && comt.react && (
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
              <Viewreactors
                style={{ marginBottom: "100px" }}
                {...{ react: comt.react }}
              />
            </div>
          )}
        </div>
        <div style={{ width: "100%", marginLeft: "15px" }} className="maincmt">
          {comt &&
            comt.reply &&
            comt.reply.map((e) => {
              return (
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={img}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    ></img>
                    <h3>{`${e.firstname} ${e.lastname}`}</h3>
                  </div>
                  <p>{`${e.time}`}</p>
                  <div>
                    <p>
                      <b
                        style={{ marginRight: "10px" }}
                      >{`${e.reply.firstname} ${e.reply.lastname}`}</b>

                      {`${e.reply.write} `}
                    </p>
                    <div className="tn" onClick={viewrect}>
                      ❤️👍
                      {(e.react && e.react.length) || ""}
                    </div>
                    {
                      <Btn
                        {...{
                          commentid: query.commentid,
                          userid: query.userid,
                          postid: query.postid,
                          replyid: e.commentuserid,
                          write: e.reply.write,
                        }}
                      />
                    }
                    {viewreact && e.react && (
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
                        <Viewreactors
                          style={{ marginBottom: "100px" }}
                          {...{ react: e.react }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        
        ref = {inputdivref}
        className="wrtcmt"
        style={{
          width: "100%",
          position: "absolute",
          bottom: "0px",
          left: "0px",
          display: "flex",
          backgroundColor: "white",
          height: "60px",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          className="input"
          ref={inputref}
          placeholder=" comment"
          id={`${hostname}/auth/user/replycomment/?id=${query.userid}&postid=${query.postid}&commentid=${query.commentid}`}
          onChange={changecom}
          value={input}
          style={{
            width: "80%",
            borderRadius: "20px",
            border: "none",
            height: "50px",
          }}
        />
        <button
          className="submit"
          onClick={() => {
            submt();
          }}
        >
          send
        </button>
        <button
          className="cancel"
          onClick={(e) => {   inputdivref.current.querySelector(".input").value = "";
         inputdivref.current.querySelector(
            ".input"
          ).id = `${hostname}/auth/user/replycomment/?id=${query.userid}&postid=${query.postid}&commentid=${query.commentid}`;
            inputdivref.current.querySelector(".submit").innerText = "send";
            e.target.style.display = "none"
            
          }}
        >
        cancel
        </button>
      </div>
    </div>
  );
}

export default Replycmt;

// {
//   reply: {
 
//     userid
//     firstname 
//     lastname
//     write
//   }
//   userid
//   firstname 
//   lastname
  
// }