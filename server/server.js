const express = require("express");
// const _conectdb = require("./connect");
// const multer = require("multer");
// const crypto = require("crypto");
// const methodoveride = require("method-override");
// const Grid = require("gridfs-stream");
const path = require("path");
// const doc = require("pdfkit");
// const mongoose = require("mongoose");
// methidoveride
// const ejs = require("ejs")
let { account } = require("./db");
const app = express();
const cookieparser = require("cookie-parser");
app.use(cookieparser("29i2009i41i92093902032903921"));
require('dotenv').config()
app.set({ "view-engine": "ejs" });
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let insession = require("./insession");
let {authenticate,cryp} = require("./function")
let hostname = process.env.HOSTNAME;

const key = process.env.WEBTOKENKEY;
const jwt = require("jsonwebtoken");

let cors = require("cors")
let corobj=cors({
  origin: hostname,
  credentials: true,
})
app.use(
    corobj
);
    
    app.use("/auth", insession);
    let port = process.env.PORT || 2000

const io = require("socket.io")(app.listen(port), {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
    
io.on("connection", async (socket) => {
  console.log("user_connected")})


app.post("/login", async (req, res) => {
    let auth = await authenticate(account,{email: req.body.email})
     if (auth !="") {
         if (auth[0].password == req.body.password) {
             let authid = await cryp();
             auth.authid=authid
             account.findOneAndUpdate({ email: req.body.email }, { ...auth }, (e) => {
                 if (e) {
                     res.json({yeauth:false})
                 }
                 else {
                       res.json({ yeauth: jwt.sign(authid, key) });
                     
                 }
             })
          
      }
     }else{
         res.status(404).json({yeauth:false})
     }
    console.log(req.body)
    
  

});


let post ={

    post:"",
    img:[],
    reactions: [],
    comments:[],
    repost: {
        post:this
        
    }
}
app.post("/signup", async (req, res) => {
    let authid = await cryp()
    let userid = await cryp()
    let auth = await authenticate(account,{email: req.body.email})
    if (auth!="") {
        res.status(404).send("error")

    } else {
        console.log(req.body)
        req.body.authid=authid
        req.body.userid=userid
        account.create(req.body)
        
         res.json({ yeauth: jwt.sign(authid, key) });
    }
    
})
app.get("/", (req, res) => {
    
    
     res.json({ authenticate: true ,token:jwt.sign(req.body, key)});
    
})
