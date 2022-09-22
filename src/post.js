import React, { useState,useEffect } from "react";


import Reactionbtn from "./reactionbuttons"
import Viewpostpics from "./viewpostpics";

import "./post.css"
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import {postmultiplepart} from "./functions"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { resolveTo } from "react-router/lib/router";
// import { returnobj } from "../server/function";

let justify = {
    display:"flex",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  justifyItems: "center",
};


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
let Post = (prop) => {


    let style = {
        width: "100%",
        height:"100%"
    }
    console.log(prop)

    function imgpos(url) {
    
            let im = document.createElement("img")
            im.src=url
            if (im.width <= im.height) {
                return {
                    width: "100%",
                   
                }
                
            }
            if (im.width >= im.height) {
                return {
                    height: "100%",
                    justifySeld:"center"
                 
                };
                
            }
        
        
    }

    let Vv = (prop) => {

        const [imggs , setimggs] =useState(prop.img)
        let img = prop.img[0]
     async function loadimg (){  prop.img.forEach( async (e,index) => {



 let deploy_ = await fetchimg_(e)



if (deploy_.url) {
                  let imx = [...imggs]
                  imx[index].url=deploy_.url
                  setimggs(imx);
                  console.log(imggs)
              }

          
            
      })
        }
        useEffect(() => {
            loadimg()
        },[])
            if (prop.img.length == 1) {
           
                return (
                  <div className="imgs">
                    <img style={{width:"100%"}} src={img} alt="story" />
                       
                  </div>
                );    
            
                
            }
        if (prop.img.length == 2) {
                  let x = 1;
                  let y = 2;
           
                return (
                    <div className=" imgs" style={{ display: "grid", gridTemplateColumns: " 1fr 1fr", justifyContent: "center", alignContent: "center" }}>
                        <div className="_2a" style={{ width: "100%",  border: "1px solid white", overflow: "hidden", ...justify}}>
                            
                            {imggs[0].url&&<img style={{ ...imgpos(imggs[0].url) }} src={imggs[0].url} alt="story" />}
                         </div>
                        <div className="_2a" style={{ width: "100%",  border: "1px solid white", overflow: "hidden",...justify }}>
                            
                            {imggs[1].url && <img style={{ ...imgpos(imggs[1].url) }} src={imggs[1].url} alt="story" />}
                         </div>
                  </div>
                );    
            
                
            }
        if (prop.img.length == 3) {
             
            let  x = 1 
            let y = 1.5
             let im = document.createElement("img");
             im.src = imggs[0].url;
          

                return (
                    <div className="imgss__" style={{...(() => { if (im.width <= im.height) { return { flexDirection:"row" } } })()}}>
                            
                        <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center",...(() => { if (im.width <= im.height) { return { height:"100%" ,width:"250px"} } })()  }}>
                        <div style={{width:"100%" ,height:"100%",border:"1px solid white",overflow:"hidden",...justify}}>
                            
                       {imggs[0].url&&     <img style={{...(() => { if (im.width <= im.height) { return { height:"100%" } }else{return{width:"100%"}} })()}} src={imggs[0].url} alt="story" />}
                         </div>
                        </div>
                        
 <div className="_4a" style={{gridTemplateColumns:"1fr 1fr",...(() => { if (im.width <= im.height) { return { gridTemplateColumns:"1fr" ,gridTemplateRows:"1fr  1fr" ,height:"100%"} } })() }}>
                               
                              {imggs.slice(1).map((e, index) => {
                                //   console.log(index)
                                  
                              return   <div key={Math.random()} style={{width:"100%",height:"100%",overflow:"hidden",border:"1px solid white",boxSizing:"border-box",...justify}}>
                                  {e.url &&<img src={e.url} style={{ ...imgpos(e.url) }} alt="s" />}
                              </div>
                              })}


                         
                        </div>
                  </div>
                );  
             
           
            
            }
        if (prop.img.length == 4) {
             let x = 1;
            let y = 1.5;
            
           let pos =imgpos()
            let im = document.createElement("img");
            im.src = imggs[0].url;
            // console.log(imgpos())
            
            console.log(im.width, im.height)
            
            
           
                  return (
                    <div className="imgss__" style={{
                        display: "flex", flexDirection:"column",justifyContent:"center",alignItems:"center",...(() => { if (im.width <= im.height) { return { flexDirection:"row" } } })()
                    }}>
                          <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center",...(() => { if (im.width <= im.height) { return { height:"100%"} } })()  }}>
                              <div style={{width:"100%" ,height:"100%",border:"1px solid white",overflow:"hidden",}}>
                             {imggs[0].url&&       <img src={imggs[0].url} style={{...(() => { if (im.width <= im.height) { return { height:"100%" } }else{return{width:"100%"}} })()}}/>}
                              </div>
                              
                          </div>
                          <div className="_4a" style={{...(() => { if (im.width <= im.height) { return { gridTemplateColumns:"1fr" ,gridTemplateRows:"1fr 1fr 1fr" ,height:"100%"} } })() }}>
                               
                              {imggs.slice(1).map((e, index) => {
                                //   console.log(index)
                                  
                                  return <div key={ Math.random()}style={{width:"100%",height:"100%",overflow:"hidden",border:"1px solid white",boxSizing:"border-box"}}>
                              {  e.url && <img src={e.url} style={{ ...imgpos(e.url) }} alt="s"/>}
                              </div>
                              })}


                          </div>
                   </div>
                 );  
                
            

            }
     
        if (prop.img.length >= 5) {
            let x = 1;
            let y = 1.5;
            
            let Morepics = () => {
                return (
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px",
                        backgroundColor:"rgb(128, 128, 128,0.5)"
                    }}>
                        <p style={{color:"white"}}>{ prop.img.slice(5).length} more</p>
                    </div>
                )
            }
           
                return (
                    <div className="imgss__" style={{
                      
                    }}>

                        <div className="_5b"style={{display:"grid",gridTemplateColumns:"1fr 1fr " ,width:"100%"}}>
                        <div style={{ width:"100%",height:"100%",overflow:"hidden"}}>
                     <img style={{...imgpos()[0]}} src={img} alt="story" />
                        </div>   
                        <div style={{width:"100%",height:"100%",overflow:"hidden"}}>
                     <img style={{...imgpos()[1] }}src={prop.img[1]} alt="story" />
                        </div>   
                            
                        </div>
                      
                      
                      
                        <div className="_5a" style={{gridTemplateColumns:  "1fr 1fr 1fr 1fr"}}>

                        {prop.img.slice(1,5).map((e, index) => {
                                //   console.log(index)
                                  
                              return  <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",border:"1px solid white",boxSizing:"border-box"}}>
                                  <img src={e} style={{ ...imgpos()[index + 1] }} alt="s" />
                                  {(()=>{if(prop.img.length>5 && index==3){return <Morepics />}})()}
                              </div>
                              })}  
                        </div>
                   </div>
                 );  
                
            }
    }
    
    
   
    let [proimg, setproimg] = useState(false)
   let  fetchim = async (test,body)=> {
    if (test) {
        let bb = await fetchimg_(body)
        setproimg(bb)
        
    }
    
    }

    useEffect(() => {
        fetchim(prop.deploy.profileimage)
        
    })

  let del = async (a) => {
     let dd = await fetch(`${hostname}/auth/post/delete`, {
           method: "post",
           body: JSON.stringify(a),
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
      
    }
    return (
        <div className="gh" style={{ margin: "40px" }}>
            

            {
          prop.deploy.post.map(e => {
            if (e.repost) {
              
              return (
                < Repost {...{
                  post: e, firstname: prop.deploy.firstname, lastname: prop.deploy.lastname, profileimage: prop.deploy.profileimage, userid: prop.deploy.userid
               ,}} />
                    )
                  }
                    return (
                      <div
                        className="post_"
                        key={Math.random()}
                        style={{ width: "100%" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "70px",
                            ...justify,

                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              ...justify,
                              height: "100%",
                              width: "90%",
                              justifyContent: "flex-start",
                            }}
                          >
                            <img
                              src={proimg || img}
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                  marginRight: "10px",
                                border:"1px solid grey"
                              }}
                            ></img>
                            <h4>{`${prop.deploy.firstname} ${prop.deploy.lastname}`}</h4>
                          </div>
                          
                          {!prop.unrepost && <div> <button style={{ marginLeft: "auto" }}>...</button><div>
                          <div onClick={()=>{del({  postid: e.postid })}}>delete</div>
                         < Link to={`/auth/post/edit/?postid=${e.postid}&userid=${prop.deploy.userid}`}><div  >edit</div></Link>
                          </div></div>}
                        </div>
                        <p style={{ marginRight: "auto" }}>{e.postedtime}</p>

                        {e.imgs && <Vv {...{ img: e.imgs }} />}
                        <p style={{ width: "100%", wordBreak: "break-all" }}>
                          {e.post}
                        </p>{!prop.unrepost && 
                          <Reactionbtn {...{ comment: e.comment || false, userid: prop.deploy.userid, postid: e.postid, react: e.react }} />
                        }
                        {/* <Viewpostpics /> */}
                      </div>
                    );
                })
            }
      </div>
    );
    
}

let Repost = (prop) => {
  
   
let [deploy, setdeploy] = useState({});
  let load = async () => {
 let  url = prop.post.repost
  
  let dep = await fetch(url, {
    mode: "cors",

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    credentials: "include",
  });

  dep.json().then((e) => {
    setdeploy(e);
  });
};
 useEffect(() => {
   load();
 }, []);
  return (
    <div style={{ width: "100%", height: "fit-content" }}>
      <div
        style={{
          width: "100%",
          height: "70px",
          ...justify,

          padding: "10px",
        }}
      >
        <div
          style={{
            ...justify,
            height: "100%",
            width: "90%",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={img}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginRight: "10px",
              border: "1px solid grey",
            }}
          ></img>
          <h4>{`${prop.firstname} ${prop.lastname}`}</h4>
        </div>
        <button style={{ marginLeft: "auto" }}>...</button>
      </div>
      <p style={{ marginRight: "auto" }}>{prop.postedtime}</p>

      {Object.values(deploy) != "" && (
        <Post
          {...{
            deploy: deploy,
            unrepost: true,
          }}
        />
      )}
      <p style={{ width: "100%", wordBreak: "break-all" }}>{prop.post.post}</p>
      <Reactionbtn
        {...{
          comment: prop.post.comment || false,
          userid: prop.userid,
          postid: prop.post.postid,
          react: prop.post.react,
          repost:prop.post.repost
        }}
      />
    </div>
  );
}
export default Post