
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";
import img from "./img/images(6).jpg";
let Msgbox = () => {

    return(
    <div style={{width:"100%",height:"fit-content"}}>
        <h1 style={{color:"red"}}>YEMA</h1>
        <h1>Messages</h1>
        <div style={{width:"100%",height:"fit-content",padding:"5px",margin:"5px"}}>
        <Link to="/auth/pmsg" style={{textDecoration:"none"}}>
            <div className="ms" style={{display:"flex",alignItems:"flex-start",padding:"3px" ,color:"black"}}>
                <div style={{width:"50px",height:"fit-content",borderRadius:"50%",overflow:"hidden"}}>
                    <img src={img} style={{width:"50px",height:"50px",borderRadius:"50%"}}></img>

                </div>
                <div style={{display:"flex",alignItems:"center",width:"100%" ,display:"flex",flexDirection:"column",marginLeft:"10px",position:"relative"}}>
                   <h4 style={{ width: "100%",margin:"0px",marginTop:"5px", height:"fit-content", wordBreak: "break-all" }}>jokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhn</h4>
                   <p style={{  width: "100%",maxWidth:"1000px",height:"fit-content", wordBreak: "break-all" }}>jokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhn</p>
                 
                    <button style={{position:"absolute",top:"10px",right:"10px",height:"20px",width:"20px"}}>1</button>

                </div>
            </div>
        </Link>
        </div>
    </div>)
}

export default Msgbox