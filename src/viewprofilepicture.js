import img from "./img/images(6).jpg";
let imgs= [
    img,
    img,
    img,
    img,
    img,
    img,
    img,
]
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
  
  flexWrap:"wrap"
};
let Viewprofilepics = (prop) => {
    // let img = prop.img
    return (
        <div style={{overflowY:"scroll",width:"100%",height:"100%",padding:"20px",boxSizing:"border-box"}}>
            <div style={{overflowY:"scroll",position:"relative",width:"100%",height:"90%",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>

             <div style={{...stylee,height:"fit-content",width:"100%",border:"none",justifyContent:"flex-start"}}>
            {imgs.map((e) => {
              let im = document.createElement("img");
              im.src = e;
              if (im.width >= im.height) {
                return (
                    <div style={{ ...stylee, position: "relative" }} key={Math.random()}>
                        
                    <img src={e.url} style={{ height: "100%" }} />
                  </div>
                );
              } else {
                return (
                    <div style={{ ...stylee ,position:"relative"}} key={Math.random()}>
                      
                    <img src={e.url} style={{ width: "100%" }} />
                  </div>
                );
              }
            })}
          </div>
            </div>
        </div>
    )
}

export default Viewprofilepics