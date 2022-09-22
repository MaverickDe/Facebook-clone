import img from "./img/images(6).jpg";

let Viewpostpics = (prop) => {
    // let img = prop.img
    return (
        <div style={{position:"absolute",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",padding:"20px",boxSizing:"border-box"}}>
            <div style={{position:"relative",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>

            <div style={{position:"absolute" ,top:"10px" ,left:"0px",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding1:"10px"}} >
                <button>prev</button>
                <button>next</button>

            </div>
            <div class="imgg">
                <img src={img}></img>
            </div>
            </div>
        </div>
    )
}

export default Viewpostpics