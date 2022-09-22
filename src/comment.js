import React, { useState ,useEffect ,useRef} from "react";
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import Recbtn from "./recbtn";
import Viewreactors from "./viewreactors";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { fetchpost_, fetchget_ } from "./functions";

import "./comment.css"
let fetchimg_ =async (body) => {
  return new Promise(async (res, rej) => {
    let dep = await fetch(`${hostname}/auth/profile/img`, {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(body),
      credentials: "include",
    });
    dep
      .json()
      .then((e) => {
        res(e);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

let Cmmsg = (prop) => {
    const [cmt, setcmt] = useState(prop.comment)
      async function loadimg() {
        
              if (!prop.comment.profileimage) {
                  return
                
            }
          let deploy_ = await fetchimg_(prop.comment.profileimage);

          if (deploy_.url) {
              let imx = { ...cmt };
            imx.url = deploy_.url;
            setcmt(imx);
          
          }
        
      }
      useEffect(() => {
        loadimg();
      }, []);

  let [viewreact, setviewreact] = useState(false)
  let viewrect = () => {
    setviewreact(!viewreact)
    console.log(document.querySelector(".backviewreactors"));
    document.querySelector(".backviewreactors").onClick = (e) => {
      setviewreact(!viewreact);
      console.log("dd")
    };
  }

  let edit = (e) => {
    prop.reff.current.querySelector(".input").value = prop.comment.write;
    prop.reff.current.querySelector(".input").id=`${hostname}/auth/comment/edit/?userid=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`
    prop.reff.current.querySelector(".submitcmt").innerText="edit"
    prop.reff.current.querySelector(".cancel").style.display="flex"
    
  }
  let delete_ = async (e) => {
   
  let url =`${hostname}/auth/comment/delete/?id=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`
      await fetchpost_(url,{})
  }
    console.log(prop,"ptop")
      return (
        <div
          className="uscmtt"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            className="usrinfo"
            style={{ display: "flex", padding: "5px", marginRight: "20px" }}
          >
            <img
              src={cmt.url || img}
              style={{
                marginRight: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            ></img>
            <p
              style={{ wordBreak: "break-all" }}
            >{`${prop.comment.firstname}${prop.comment.lastname}`}</p>
          </div>
          <p
            className="cmt"
            style={{ marginRight: "20px", wordBreak: "break-all" }}
          >
            {prop.comment.write}
          </p>
          <div style={{ display: "flex", position: "relative" }}>
            <div className="tn" style={{ marginRight: "20px" }}>
              {prop.comment.time}
            </div>
            <div>
              <Link
                to={`/auth/comment/reply/?userid=${prop.userid}&postid=${prop.postid}&commentid=${prop.commentid}`}
              >
                reply
              </Link>
              <button onClick={edit}>edit</button>
              <button onClick={delete_}>delete</button>
            </div>

            <div className="tn" onClick={viewrect}>
              likebtn {(prop.comment.react && prop.comment.react.length) || ""}
              <Recbtn
                {...{
                  userid: prop.userid,
                  postid: prop.postid,
                  commentid: prop.comment.commentid,
                }}
              />
            </div>
          </div>

          {viewreact && prop.comment.react && (
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
                {...{ react: prop.comment.react }}
              />
            </div>
          )}
        </div>
      );

    
}
let Comment = (prop) => {

   


    let [com_, setcom_] = useState("")
    let changecom = (e) => {
        setcom_(e.target.value)
    }

    let submt = async (e) => {
        if (com_ == "") {
            return

        }
         let dd = await fetch(inputref.current.querySelector(".input").id, {
         method: "post",
         body: JSON.stringify({comment:com_}),
             mode: "cors",
         credentials:"include",

         headers: {
           "Content-Type": "application/json",
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
       });

       dd.json().then((e) => {
         console.log(e);

         if (e.yeauth) {
           
           // const navigate = useNavigate()
          
           // setredirect("/auth")
         }
       });
        
  }
  
  let url =`${hostname}/auth/user/comment/?id=${prop.userid}&postid=${prop.postid}`
  let cancel = () => {
     inputref.current.querySelector(".input").value = "";
    inputref.current.querySelector(".input").id=url
    inputref.current.querySelector(".submitcmt").innerText="submit"
    inputref.current.querySelector(".cancel").style.display="none"
  }

    let inputref= useRef(null)
    return (
    <div style={{position:"relative",display:"flex",flexDirection:"column",width:"100%",minHeight:"70px",maxHeight:"600px",overflowY:"scroll",}}>

    <div className="discmt" style={{flexDirection:"column",width:"100%",height:"fit-content", maxHeight:"500px",marginBottom:"100px" ,overflowY:"scroll"}}>
          
                {prop.comment && prop.comment.map(e => {
                    return <Cmmsg {...{reff:inputref,comment:e,userid:prop.userid,postid:prop.postid,commentid:e.commentid}}/>
                })}
           
        </div>
        <div className="wrtcmt"  ref={inputref} style={{width:"100%",position:"absolute",bottom:"0px",left:"0px",display:"flex",backgroundColor:"white",height:"60px",borderRadius:"20px" ,justifyContent:"center",alignItems:"center"}}>
          <input className="input" placeholder=" comment" id={url} onChange={changecom} value={com_} style={{ width: "80%", borderRadius: "20px", border: "none", height: "50px" }} />
          <button className="submitcmt"  onClick={(e) => { submt(e) }}>send</button>
          <button className="cancel" style={{display:"none"}} onClick={() => { cancel() }}>cancel</button>
        </div>
    </div>
    )
}


export default Comment