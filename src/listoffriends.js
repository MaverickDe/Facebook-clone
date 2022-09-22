import img from "./img/images(6).jpg";

let Listfriends = (prop) => {
  return (
    <div>
     
      <div className="sugfrnds">
        <h1 style={{color:"red"}}>Yema</h1>
        <h1>friends</h1>
        <div>
          <div  style={{ display: "flex", justifyContent:"flex-start",alignItems:"center",width:"100%",margin:"10px"}} className="req">
                      <div >
              {" "}
              <img
                src={img}
                style={{
                  marginRight: "20px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              ></img>
            </div>
            <p style={{marginRight:"20px"}}>john</p>
            <button style={{height:"30px"}} >message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listfriends;
