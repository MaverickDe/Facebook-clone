import img from "./img/images(6).jpg";


let Pmsg = () => {
    return (
        <div style={{width:"100%" ,height:"100%",top:"0px",left:"0px",position:"relative"}}>
            
            <div style={{display:"flex",alignItems:"center",position:"absolute",top:"0px",left:"0px",position:"absolute"}}>
                 <div style={{width:"50px",height:"50px",borderRadius:"50%",overflow:"hidden"}}>
                    <img src={img} style={{width:"50px",height:"50px",borderRadius:"50%"}}></img>

                </div>
                <h4 style={{ marginLeft: "10px", width: "100%", wordBreak: "break-all" }}>jokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhn</h4>
            </div>
            <button style={{margin:"20px", marginTop:"70px",}}>back</button>

            <div style={{height:"calc(100% - 200px)" , overflowY:"scroll",display:"flex",flexDirection:"column"}}>
                
                <div style={{margin:"5px",display:"flex",alignItems:"center"}}>
                    <div style={{width:"50px",height:"50px",borderRadius:"50%",overflow:"hidden"}}>
                    <img src={img} style={{width:"50px",height:"50px",borderRadius:"50%"}}></img>

                    </div>
                    <div>

                    <p style={{width:"100%",height:"fit-content",wordBreak:"break-all",margin:"20px"}}>
                        jdnjkndsjnalncjnjaklcjnajn

                        </p>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="time">12/22/2</div>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{ position: "absolute", width: "100%", height: "70px",bottom:"0px",left:"0px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgb(241, 238, 238)" ,padding:"010px",borderRadius:"10px",boxSizing:"border-box"}}>
                <input type="text" placeholder="start_typing"   style={{width:"80%",height:"85%",border:"none",outline:"none",backgroundColor:"rgb(241, 238, 238)"}}/><button style={{width:"100px"}}>send</button>

            </div>
            </div>
    )
}

export default Pmsg