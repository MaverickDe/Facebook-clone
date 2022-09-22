import React, { useState, useRef ,useEffect, useReducer} from "react";
import "./editstory.css";
import img from "./img/images(6).jpg";
import { hostname } from "./index";
import { postmultiplepart, fetchgetfiles_ } from "./functions";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";



let Story = (prop) => {
  let img = JSON.parse(localStorage.getItem("story"));
console.log(img)
  let arr = 
    img.map((e) => {
      return {
        img: e, state: [], };
    })
    let [num, setnum] =useState(0)
  console.log(arr)
  const reducer = (state, action) => {
    let v = state
    console.log(v,action)
    
    
    let num = v.num;
    switch (action.type) {
      
      case "next":
     
        v.arr[num].state = action.state_
        v.num += 1
        if (v.num >= v.arr.length-1) {
          v.num = v.arr.length-1;
        }
        return {...v};
      case "prev":
        v.arr[num].state = action.state_;
        v.num -= 1
        if(v.num<=0){
          v.num=0
        }
        return {...v};
      case "save":
        v.arr[num].state = action.state_;
       
        return {...v};
      case "imageurl":
        v.arr[action.id].file = action.file;
       
        return {...v};
        
        
        
        
      }
      
      
      return {...state}
    }
    let [story,dispatch]=useReducer(reducer,{arr,num:0})
    console.log(story)

     useEffect(() => {
       story.arr.forEach(async (e, index) => {
         let file_ = await fetchgetfiles_(e.img);
         

         dispatch({type:"imageurl" ,id:index,file:file_})
        //  arr[index] = { img: e, file: file_ };
         // setimg(arr)
       });
     }, []);



  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
    
        <Editstory {...{ story_: story.arr[story.num], story, dispatch }} />
      {/* </div>
      <button onClick={() => {
        story.arr.forEach(e => {
          // if (e != "") {
            e.state.forEach(a => {
              
              a.setstate()
              console.log(a)
          })
        })
      }} style={{ width: "100px", margin: "10px" }}>post</button> */}
    </div>
  );


}




let Editstory = (prop) => {
  let navigate = useNavigate()
  console.log("substatechange")
  let img = JSON.parse(localStorage.getItem("story"));
  if(!img || img ==""){
    navigate("/auth/dashboard")
  }

  let checkimg = (e) => {
    let img = document.createElement("img");
    img.src = e;
    if (img.width > img.height) {
      return {
        maxHeight: "100%",
      };
    } else {
      return {
        maxWidth: "100%",
      };
    }
  };





  let [txe, settxe] = useState(prop.story_.state);
  
  let [sticker, setsticker] = useState({sticker:""});
  let move = false;
  let zoom_ = false;
  let maxzoom = 200;
  let defaultzoom = 200;
  let stickerref = useRef(null);
  let inputref = useRef(null);
  console.log("state change");
  console.log("state change");
  //  settxe(prop.story_.state);
  useEffect(() => {
    console.log("usestate")
    settxe(prop.story_.state)
  }, [prop])
  let Textandsticker_ = (prop) => {
    let [input, setinput] = useState(prop.obj.text);
    // let [obj ,setobj] =setState(prop.obj)

    let reff = useRef(null)
    let _ref = useRef(null)
    useEffect(() => {
      prop.obj.changeinp = (e) => {
        console.log(e);
        let this_ = e.currentTarget;
        prop.obj.text = this_.value
        setinput(this_.value)
        this_.value=prop.obj.text
        console.log(this_.value);
        
        this_.style.width = `${this_.scrollHeight}px`;
        this_.style.height = `${this_.scrollHeight}px`;
        console.log(this_);
      };
      prop.obj.init(reff,_ref)
    }, [])
    
    console.log(prop.obj);
    if (prop.obj.divstyle) {
      
    }
    return (
      <div
        ref={reff}
        style={{
          position: "absolute",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          top: `${
            (prop.obj.divstyle && prop.obj.divstyle.top) ||
            ""
          }`,
          left: `${
            (prop.obj.divstyle && prop.obj.divstyle.left) ||
            ""
          }`,
          height: "fit-content",
          boxSizing: "border-box",
        }}
        className="__txz"
      >
        <div
          className="zoom"
          style={{
            display: "none",
            backgroundColor: "blue",
            width: "10px",
            height: "100px",
            marginBottom: "auto",
          }}
        >
          <div className="zoombar" style={{ width: "100%", height: "100%" }}>
            <div
              style={{ marginBottom: "auto", backgroundColor: "red" }}
              className="bar"
            ></div>
          </div>
        </div>

        {(prop.type == "text" && (
          <textarea
            ref={_ref}
            className="input"
            onChange={(e) => {
              prop.obj.changeinp(e);
            }}
            onInput={(e) => {
              console.log(e, "input");
            }}
            style={{
              fontSize: `${
                (prop.obj.refstyle &&
                  prop.obj.refstyle.fontSize) ||
                "50px"
              }`,

              border: "none",
              outline: "none",
              padding: "0px",
              width: "100%",

              maxWidth: "400px",
              height: "100px",
              width: "100px",
              // backgroundColor:"none",
              background: "transparent",
              // overflowX:"scroll",

              margin: "0px",
              boxSizing: "border-box",
            }}
            value={input}
          ></textarea>
        )) ||
          (prop.type == "emoji" && (
            <p
              ref={_ref}
              style={{
                fontSize: `${
                  (prop.obj.refstyle &&
                    prop.obj.refstyle.fontSize) ||
                  "50px"
                }`,

                padding: "0px",
                margin: "0px",
              }}
            >
              {input}
            </p>
          ))}
        <div
          style={{ fontSize: "20px" }}
          onClick={() => {
            prop.obj.delete(txe);
          }}
        >
          X
        </div>
      </div>
    );


    
    
  
}
  class Textandsticker{
    constructor({ type ,text}) {
     
      this.type = type
     

      this.zoom_ =false
      this.move=false
      this.text = text || ""
      let vv =[...txe]
      if (txe != "") {
      vv.forEach((e) => {
        e.setstate();
         });
       }
       this.id=Math.random().toString()
      settxe([...vv,this])
      
      
      
    }
    setstate() {
      this.divstyle = {
        top:window.getComputedStyle(this.div).getPropertyValue("top"),
        left:window.getComputedStyle(this.div).getPropertyValue("left")
      }
      this.refstyle={fontSize:window.getComputedStyle(this.ref).getPropertyValue("font-size")}
      // this.text = this.ref.value || this.ref.innerText
      
      // console.log()
     
     
    }
    
    delete(txe) {
      let objindex = txe.findIndex(e => e.id == this.id)
      console.log(objindex,this.id,txe)
      let v = [...txe]
      if (objindex != -1) {
        
        v.splice(objindex, 1)
      }
       if (v != "") {
         v.forEach((e) => {
           e.setstate();
         });
       }
       settxe([...v]);
      
    }

    init = (reff, ref, set) => {
      

     
      // console.log(window.getComputedStyle(reff.current))
      this.div=reff.current
      this.ref = ref.current
      this.ref.hasOwnProperty("value") ? this.ref.focus() : console.log();
    
      this.zoomm=this.div.querySelector(".zoombar")
      console.log(this.zoomm)
      if (this.zoomm) {

     this.zoomm.onmouseleave=(e) => {
              this.zoom_ = false;
              let doc = e.currentTarget;
                            // doc.style.width = `${10}px`;
                            //  doc.style.height = `${10}px`;
                            //  doc.style.width = `${doc.scrollHeight}px`;
                          
                            //  doc.style.height = `${doc.scrollHeight}px`;
              setTimeout((e) => {
                if (!zoom_ && !move) {
               this.div.querySelector(".zoom").style.display = "none";
                 
                }
              }, 3000);
            }
            this.zoomm.ontouchend=(e) => {
              this.zoom_ = false;
              let doc = e.currentTarget;
              setTimeout((e) => {
                if (!this.zoom_ && !this.move) {
                  document.querySelector(".zoom").style.display = "none";
                  // this.fontSize =doc.fontSize
                  
                }
              }, 3000);
            }
            this.zoomm.onmousemove=(e) => {
                let this_ = this.ref
                this.zoom_ = true;
              console.log(this_.scrollWidth);
              
                this_.style.width = `${this_.scrollHeight}px`;
                // this_.style.maxWidth = `${300}px`;
                this_.style.height = `${this_.scrollHeight}px`;

              this.zoom(e, this.ref);
            }
            this.zoomm.ontouchmove=(e) => {
              zoom(e, inputref);
                let this_ = this.ref;
                console.log(this_.scrollWidth);
                this_.style.width = `${this_.scrollHeight}px`;
                this_.style.height = `${this_.scrollHeight}px`;
            }
            this.zoomm.onmouseover=() => {
              this.zoom_ = true;
            }
            this.zoomm.onmousedown=() => {
              this.zoom_ = true;
            }
        if (this.zoomm.aux) {
          this.zoomm.aux()
        }
      }
      if (this.div) {
       
        
           this.div.onmousedown=(e) => {
          this.move = [e.offsetX,e.offsetY]
          // movesticker(e);
          this.div.querySelector(".zoom").style.display = "flex";
        }
        this.div.onmousemove=(e)=>{this.movesticker(e)}
        this.div.onmouseup=(e) => {
          this.move = false;
          let doc = e.currentTarget;

          setTimeout(() => {
            if (!this.zoom_ && !this.move) {
              
             
              this.div.querySelector(".zoom").style.display = "none";
            }
          }, 3000);
        }
        this.div.ontouchmove=(e)=>{this.movesticker(e)}
       this.div. ontouchend=(e) => {
          this.move = false;
          let doc = e.currentTarget;
          setTimeout(() => {
            if (!this.zoom_ && !this.move) {
              console.log("vvv");
            this.div.querySelector(".zoom").style.display = "none";
             
            }
          }, 3000);
        }
        this.div.ontouchstart=(e) => {
          this.div.querySelector(".zoom").style.display = "flex";
          this.move = true;
        }
        
      
        





        if (this.div.aux) {
          this.div.aux()
        }
      }
      console.log(txe)
        // prop.dispatch({
        //   type: "save",
        //   state_: [...txe].map((e) => {
        //     e.setstate();
        //     return e;
        //   }),
        // });
   
  
    }

    





    returnval =(e)=> {
  
    }
    zoom = (e, ref) => {
       
      console.log("valuedddddddddddddddd")
      this.zoom_ = true;
      console.log(e);
      this.move = false;
      let bar = e.currentTarget.querySelector(".bar");
      let height =
        e.offsetY ||
        e.changedTouches[0].clientY - e.currentTarget.getBoundingClientRect().y;
      if (height > e.currentTarget.offsetHeight) {
        height = e.currentTarget.offsetHeight;
      }
      
        
        bar.style.height = `${height}px`;
      
      console.log(height);
  
      // let width = (video.currentTime * seeked.offsetWidth) / video.duration;
      let zz = (defaultzoom * height) / e.currentTarget.offsetHeight;
      ref.style.fontSize = `${zz}px`;
    };
     movesticker = (e) => {
      console.log(e,
        e.currentTarget.offsetHeight / 1.5,
        "kkk",
        e.currentTarget.offsetWidth / 1.5
      );
      console.log(e.offsetY,"lll",e.offsetX);
      
      let x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
      let y = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
      console.log("Left",
        x -
          e.currentTarget.parentElement.getBoundingClientRect().x -
          e.offsetX
      );
      console.log("top",
        e.currentTarget.style.top = 
          y -
          e.currentTarget.parentElement.getBoundingClientRect().y -
      e.offsetY
      );
      if (this.move) {
        this.zoom_=false
        e.currentTarget.style.top = `${
          y -
          e.currentTarget.parentElement.getBoundingClientRect().y -
     this.move[1]
        }px`;
        e.currentTarget.style.left = `${
          x -
          e.currentTarget.parentElement.getBoundingClientRect().x -
       this.move[0]
        }px`;
        // setstickerposition([`${x}px`, `${y}px`])
      }
    };
  }


  let zoom = (e,ref) => {
    zoom_ = true;
    console.log(e);
    move = false;
    let bar = e.currentTarget.querySelector(".bar");
    let height =
      e.nativeEvent.offsetY ||
      e.changedTouches[0].clientY - e.currentTarget.getBoundingClientRect().y;
    if (height > e.currentTarget.offsetHeight) {
      height = e.currentTarget.offsetHeight;
    }
    
      
      bar.style.height = `${height}px`;
    
    console.log(height);

    // let width = (video.currentTime * seeked.offsetWidth) / video.duration;
    let zz = (defaultzoom * height) / e.currentTarget.offsetHeight;
ref.current.style.fontSize = `${zz}px`;
  };
  
  let movesticker = (e) => {
    console.log(
      e.currentTarget.offsetHeight / 1.5,
      "kkk",
      e.currentTarget.offsetWidth / 1.5
    );
    console.log(e.nativeEvent.offsetY,"lll",e.nativeEvent.offsetX);
    
    let x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    let y = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
    console.log("Left",
      x -
        e.currentTarget.parentElement.getBoundingClientRect().x -
        e.nativeEvent.offsetX
    );
    console.log("top",
      e.currentTarget.style.top = 
        y -
        e.currentTarget.parentElement.getBoundingClientRect().y -
    e.nativeEvent.offsetY
    );
    if (move) {
      zoom_=false
      e.currentTarget.style.top = `${
        y -
        e.currentTarget.parentElement.getBoundingClientRect().y -
   move[1]
      }px`;
      e.currentTarget.style.left = `${
        x -
        e.currentTarget.parentElement.getBoundingClientRect().x -
     move[0]
      }px`;
      // setstickerposition([`${x}px`, `${y}px`])
    }
  };
  let write = false;
  let changeinp = (e) => {
    console.log(e)
    let this_ = e.currentTarget
    console.log(this_.scrollWidth);
    this_.style.width=`${this_.scrollHeight}px`
    this_.style.height = `${this_.scrollHeight}px`;
    console.log(this_);
    
  }
  

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        position: "relative",

        flexDirection:"column"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20px",
            position: "absolute",
            bottom: "50%",
            left: "0px",
          }}
          className="btn"
        >
          <button
            style={{ marginRight: "auto" }}
            onClick={() => {
              prop.dispatch({
                type: "prev",
                state_: [...txe].map((e) => {
                  e.setstate();
                  return e;
                }),
              });
            }}
          >
            prev
          </button>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => {
              console.log(txe);
              prop.dispatch({
                type: "next",
                state_: [...txe].map((e) => {
                  e.setstate();
                  return e;
                }),
              });
            }}
          >
            next
          </button>
        </div>

        <div
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
          className="options"
        >
          <button
            onClick={(e) => {
              new Textandsticker({ type: "text", text: "kkkkkk" });
              // let doc = document.querySelector(".input");
              // // doc.style.display="flex"
              // doc.focus();

              // document.querySelector(".text").style.display = "flex";
              // doc.onblur = () => {
              //   console.log("blur");
              //   if ((input.input = "")) {
              //     document.querySelector(".text").style.display = "none";
              //   }
              // };

              // setTimeout(e => {
              //   if (input.input = "") {

              //     doc.style.display="none"
              //   }
              // },3000)
            }}
          >
            Text
          </button>
          <button>
            sticker
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "300px",
                height: "fit-content",
                position: "absolute",
                right: "0px",
                top: "0px",
              }}
            >
              {Array.from("😢😡😂😍💕😘😒😊").map((e) => (
                <p
                  onClick={() => {
                    new Textandsticker({ type: "emoji", text: e });
                  }}
                  style={{ fontSize: "40px" }}
                >
                  {e}
                </p>
              ))}
            </div>
          </button>
          <button>tag</button>
        </div>

        {txe.map((e) => (
          <Textandsticker_ {...{ type: e.type, obj: e }} />
        ))}

        <img src={prop.story_.img} style={{ ...checkimg(prop.story_.img) }} />
      </div>
      <button
        onClick={async () => {
          let v = prop.story
          console.log(v,"V")
          v.arr[prop.story.num].state=txe
          v.arr.forEach((e) => {
            e.id = Math.random().toString()
            console.log();
            // if (e != "") {
           e.state = e.state.map((a) => {
             a.setstate();
             
             console.log(a);
             return {
               text:a.text,
               divstyle:a.divstyle,
               refstyle:a.refstyle,
             }
           });
            
           
           console.log(e.file.id="ccccc");
           
          });

          console.log(v)
          let po = await postmultiplepart(`${hostname}/auth/poststory`, v.arr)
          localStorage.removeItem("story");
          navigate("/auth/dashboard")
          
        }}
        style={{ width: "100px", margin: "10px" }}
      >
        post
      </button>
      
    </div>
  );
};

export default Story;
