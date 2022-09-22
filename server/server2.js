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
require("dotenv").config();
app.set({ "view-engine": "ejs" });
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let insession = require("./insession");
let { authenticate, cryp } = require("./function");
let hostname = process.env.HOSTNAME;

const key = process.env.WEBTOKENKEY;
const jwt = require("jsonwebtoken");

let cors = require("cors");
const { userInfo } = require("os");
app.use(
  cors({
    origin: hostname,
    credentials: true,
  })
);

app.get("/savepost", (req, res) => {

    if (req.body.url || req.body.url != "") {
        
        res.json({success:true})
    }
        
    account.findOne({ userid: req.body.userid }, (e, data) => {
        if (data && !e) {
            data.friend.forEach(e => {
                
                account.findOne({ userid: req.body.userid }, (e, data) => { 

                    
                    account.findOneAndUpdate({ userid:e.userid },  {post:[...data.post,{friendspost:req.body}]})

                })
            })
            
        }
    })
    }
    

    
)
app.get("/savestory", (req, res) => {

    if (req.body.url || req.body.url != "") {
        
        res.json({success:true})
    }
        
    account.findOne({ userid: req.body.userid }, (e, data) => {
        if (data && !e) {
            data.friend.forEach(e => {
                
                account.findOne({ userid: req.body.userid }, (e, data) => { 
                    let index = data.friendsstory.findIndex(e => e.userid == req.body.userid)
                    if (index != -1) {
                        data.friendsstory[index] = req.body
                    } else {
                        
                        data.friendsstory.push({ ...req.body }); 
                    }
                    
                    account.findOneAndUpdate({ userid:e.userid },  {friendsstory:data,friendsstory})

                })
            })
            
        }
    })
    }
    

    
)