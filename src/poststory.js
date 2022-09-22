import React, { useState } from "react";
import "./Postext.css";
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
let stylee = {
  width: "100px",
  height: "100px",
  borderRadius: "20px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid grey",
  margin: "10px",

  flexWrap: "wrap",
};
let Postimg = () => {
  const navigate = useNavigate();

  let [imgs, setimgs] = useState([]);
  let [post, setpost] = useState("");
  let file = (e) => {
    console.log(Array.from(e.target.files));
    let url_ = [];
    Array.from(e.target.files).forEach((e) => {
      //   var blob2 = new Blob(audd2.items, { type: "video/mp4" });
      let url = URL.createObjectURL(e);
      // console.log
      url_.push({ url, file: e });

      console.log(url_, imgs);
    });
    setimgs(url_);
  };

  let delete_ = (e) => {
    e.preventDefault();
    let v = [...imgs];
    console.log(imgs);
    let index = imgs.findIndex((a) => a.url == e.target.id);
    if (index != -1) {
      v.splice(index, 1);
      setimgs(v);
    }
    console.log(index, e.target.id);
    console.log(imgs);
  };

  let next = async (e) => {
    e.preventDefault();
    if (imgs == "") {
      return;
    }

      localStorage.setItem("story", JSON.stringify(imgs.map(e => e.url)))
      navigate("/auth/editstory");
      
  };

  
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ color: "red" }}>YEMA</h1>
      <h1>Post</h1>
      <button style={{ margin: "10px" }}>cancel</button>
      <form style={{ width: "100%", height: "fit-content" }}>
     
        <div>
          <input type="file" onChange={file} multiple className="v" />
          <div
            style={{
              ...stylee,
              height: "fit-content",
              width: "100%",
              border: "none",
              justifyContent: "flex-start",
            }}
          >
            {imgs.map((e) => {
              let im = document.createElement("img");
              im.src = e;
              if (im.width >= im.height) {
                return (
                  <div
                    style={{ ...stylee, position: "relative" }}
                    key={Math.random()}
                  >
                    <button
                      onClick={delete_}
                      id={e.url}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "white",
                      }}
                    >
                      X
                    </button>
                    <img src={e.url} style={{ height: "100%" }} />
                  </div>
                );
              } else {
                return (
                  <div
                    style={{ ...stylee, position: "relative" }}
                    key={Math.random()}
                  >
                    <button
                      onClick={delete_}
                      id={e.url}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "white",
                      }}
                    >
                      X
                    </button>
                    <img src={e.url} style={{ width: "100%" }} />
                  </div>
                );
              }
            })}
          </div>
          <button
            type="submit"
            onClick={next}
            style={{ width: "100px", margin: "10px" }}
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Postimg;
