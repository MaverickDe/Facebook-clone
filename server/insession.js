let express = require("express");
let router = express.Router();
router.use(express.static("public"));
let {  account } = require("./db");
;
const cookieparser = require("cookie-parser");
// const { createStructParentTreeNextKey } = require("pdfkit");

require("dotenv").config();
let  hostname = process.env.HOSTNAME 
  console.log(hostname,"aa")
// const { includes, split, values } = require("lodash");
router.use(cookieparser("29i2009i41i92093902032903921"));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const crypto = require("crypto");
const methodoveride = require("method-override");
const Grid = require("gridfs-stream");
// const path = require("path");
const mongoose = require("mongoose");
router.use(methodoveride("_method"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
let cors = require("cors");
const { appendFile } = require("fs");
let key = process.env.WEBTOKENKEY;
const jwt = require("jsonwebtoken");
const path = require("path");
let { authenticate, cryp ,returnobj } = require("./function");
// router.use(
//   cors({
//     origin: hostname,
//   })
// );


router.use("/", (req, res, next) => {
    console.log(req.signedCookies.yeauth,req.cookies);
    if(!req.cookies.yeauth){
        res.json({authenticate:false})
        return
    }
    let _cookie = req.cookies.yeauth
    console.log(_cookie)
    jwt.verify(_cookie, key, (err, data) => {
        if (err) {
            console.log(err)
            res.json({authenticate:false})
            
            return;
        }
        account.findOne({ authid: data }, (e, data) => {
            console.log(data ,e)
            if (!data || e) {
                res.json({authenticate:false})
                
                return;
                
            }
            req.user=data
           
            next()
               
           })
    
        // res.send("hello")
        // next()
    });



    
})





const connection = `mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/accountyemafiles?retryWrites=true&w=majority`;

const connect = mongoose.createConnection(connection, {
  useNewUrlParser: true,
});
let gfs;
connect.once("open", () => {
  //   console.log("hllo");
  // gfs = new mongoose.mongo.gridFsBucket(connect.db,{
  //     bucketName:"uploads2"
  // })
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection("uploads2");
  //   console.log("Ddd");
});
const _storage = new multer_gridfs_storage_1.GridFsStorage({
  url: connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(file,"fileeeeee")
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileinfo = {
          filename,
          bucketName: "uploads2",
        };
        resolve(fileinfo);
      });
    });
  },
});

const upload2 = multer({ storage: _storage });
let chunk = connect.model(
  "uploads2.chunks",
  new mongoose.Schema({}, { strict: false })
);
let file = connect.model(
  "uploads2.files",
  new mongoose.Schema({}, { strict: false })
);

console.log(gfs);
function findimg(req,res) {
  console.log("efe",req.body)

    file.find({ filename: req.body.filename }, (e, docs) => {
        if (!docs || e) {
          res.status(404).json({success:false})
          return
      }
    console.log(e, docs);
    chunk.find({ files_id: docs[0]._id }, (e, data) => {
      // console.log(e, data);
      let chunks = data;

      let fileData = [];
      for (let i = 0; i < chunks.length; i++) {
        //This is in Binary JSON or BSON format, which is stored
        //in fileData array in base64 endocoded string format

        fileData.push(chunks[i].data.toString("base64"));
      }

    //   console.log(fileData)

      //Display the chunks using the data URI format
      let finalFile =
        "data:" + docs[0].contentType + ";base64," + fileData.join("");
      res.json({ url: finalFile });
    });
  });
}

setTimeout(() => {}, 3000);






router.post(
  "/post",
  upload2.fields([{ name: "img", maxCount: 20 },]),
   async (req, res) => {
     
    console.log(req.signedCookies.token);
        console.log(req.files);
        let post = {}
        let id = Math.random().toString()
        
        if (req.body.post) {
            post.post=req.body.post
        }
       let crypto = await cryp()
       post.postid = crypto
       
        post.postedtime=new Date().toDateString()
        
        post.imgs=[...req.files.img]
        // let post = {
        //   post: "",
        //   img: [],
        //   reactions: [],
        //   comments: [],
        //   repost: {
        //     post: this,
        //   },
        // };

        if (req.user.post) {
            req.user.post.push(post)
        }else{
            req.user.post=[post]
        }

        account.findOneAndUpdate({authid:req.user.authid},{post:req.user.post},(e)=>{
            if (e) {
                res.json({success:false})
                return
            }
            res.json({success:true})
        })
        // findimg(res)
        
    // res.json({filke:"F"})
    
  }
);


router.get("/dashboard", (req, res) => {
    let obj = returnobj(req.user)
    // console.log(req.obj)
    delete obj.password
    delete obj.authid
    delete obj.email
    res.json(obj)
    

});
router.post("/post/txt",async (req, res) => {
  
    console.log(req.signedCookies.token);
        console.log(req.files);
        let post = {}
        let id = Math.random().toString()
        
        if (req.body.post) {
            post.post=req.body.post
        }
       let crypto = await cryp()
       post.postid = crypto
       
        post.postedtime=new Date().toDateString()
        
  if (req.body.repost) {
         post.repost=req.body.repost
       }
        // let post = {
        //   post: "",
        //   img: [],
        //   reactions: [],
        //   comments: [],
        //   repost: {
        //     post: this,
        //   },
        // };

        if (req.user.post) {
            req.user.post.push(post)
        }else{
            req.user.post=[post]
        }

        account.findOneAndUpdate({authid:req.user.authid},{post:req.user.post},(e)=>{
            if (e) {
                res.json({success:false})
                return
            }
            res.json({success:true})
        })
        // findimg(res)
        
    // res.jso
  
});

router.post("/profile/img", (req, res) => {
    // console.log(req.body)
    findimg(req, res);
   
    

});
router.post("/user/replycomment", (req, res) => {
  account.findOne({ userid: req.query.id }, async (e, data) => {
    if (data) {
      let index = data.post.findIndex((e) => e.postid == req.query.postid);
      if (index == -1) {
        res.json({ success: false });
        return;
      }
      
      
      let index1 = data.post[index].comment.findIndex((e) => e.commentid == req.query.commentid);
      

      let crypto = await cryp();
      let crypto2 = await cryp();
      let v = {};
      v.profileimage = req.user.profileimage;
      v.lastname = req.user.lastname;
      v.firstname = req.user.firstname;
      v.commentuserid = req.user.userid;
      v.commentid = crypto;
      v.write = req.body.write;
      v.time = new Date().toDateString();
      if(!data.post[index].comment[index1].reply){
        data.post[index].comment[index1].reply = []
      }
      
      console.log("lslslslCc")
      let replyuser = req.query.replyid &&  (() => {
        return new Promise((res, rej) => {
          
          account.findOne({ userid: req.query.replyid }, async (e, data) => {
            if (data) {

              res(data)
              
            } if (!data || e) {
              res(false)
            }
          })



        })
      })()
        console.log("Cc")
        
     let rep= await replyuser
        console.log("mmbmbmbmCc",rep)
      if (rep) {

        v.reply = {
           profileimage : rep.profileimage,
      lastname : rep.lastname,
      firstname : rep.firstname,
      replyuserid : rep.userid,
     
      write :req.body.write,
      time  :new Date().toDateString(),
          
        }
        
      } else {
        v.reply = {
          profileimage: data.post[index].comment[index1].profileimage,
          lastname: data.post[index].comment[index1].lastname,
          firstname: data.post[index].comment[index1].firstname,
          replyuserid: data.post[index].comment[index1].commentuserid,
        
          write: req.body.write,
          time: new Date().toDateString(),
        };
        
     }

      

       data.post[index].comment[index1].reply.push(v);

      account.findOneAndUpdate(
        { userid: req.query.id },
        { post: data.post },
        (e) => {
          if (e) {
            res.json({ success: false });
            return;
          }
          res.json({ success: true });
        }
      );
    }
  });

  console.log(req.body);
  console.log(req.query);
});
router.post("/user/comment", (req, res) => {
    account.findOne({ userid: req.query.id }, async (e, data) => {
        if (data) {
            let index =   data.post.findIndex(e => e.postid == req.query.postid)
               if (index == -1) {
                   res.json({success:false})
                   return
               }
       
               
           if(!data.post[index].comment){
              data.post[index].comment=[]
            }
            let crypto = await cryp()
            let v = {}
            v.profileimage=req.user.profileimage
            v.lastname=req.user.lastname
            v.firstname=req.user.firstname
            v.commentuserid=req.user.userid
            v.commentid = crypto
            v.write = req.body.comment
            v.time=new Date().toDateString()

           data.post[index].comment.push(v)
            
            account.findOneAndUpdate({userid:req.query.id},{post:data.post},(e)=>{
                   if (e) {
                       res.json({success:false})
                       return
                   }
                   res.json({success:true})
               })
        }

    })

  console.log(req.body)
  console.log(req.query)
 
});
router.post("/user/react", (req, res) => {
    account.findOne({ userid: req.query.id }, async (e, data) => {
      if (data) {
          

        let index =   data.post.findIndex(e => e.postid == req.query.postid)
           if (index == -1) {
               res.json({success:false})
               return
           }
           else if (req.query.replyid) { 
          
             
             
             
             let index_ =  data.post[index].comment.findIndex(e => e.commentid == req.query.commentid)
                if (index == -1) {
                    res.json({success:false})
                    return
             }
               if (!data.post[index].comment[index_].react) {
                 data.post[index].comment[index_].react = [];
               }
             let index_1 = data.post[index].comment[index_].reply.findIndex(e => e.commentuserid == req.user.userid)
             if (!data.post[index].comment[index_].reply[index_1].react) {
               data.post[index].comment[index_].reply[index_1].react = [];
             }
             let index_3 =  data.post[index].comment[index_].reply[index_1].react.findIndex(e => e.userid == req.user.userid)
             
             
             let v = {}
            v.profileimage = req.user.profileimage;
            v.lastname = req.user.lastname;
            v.firstname = req.user.firstname;
             v.userid = req.user.userid;
             v.react=req.body.react
        if (index_3 == -1) {
          
         data.post[index].comment[index_].reply[index_1].react.push(v);
         } else {
                  data.post[index].comment[index_].reply[index_1].react[
                    index_3
                  ] = v;
          
                }
           }
           else if (req.query.commentid) { 
          
             
             
             
             let index_ =  data.post[index].comment.findIndex(e => e.commentid == req.query.commentid)
                if (index == -1) {
                    res.json({success:false})
                    return
             }
               if (!data.post[index].comment[index_].react) {
                 data.post[index].comment[index_].react = [];
               }
             let index_1 =  data.post[index].comment[index_].react.findIndex(e => e.userid == req.user.userid)
             let v = {}
            v.profileimage = req.user.profileimage;
            v.lastname = req.user.lastname;
            v.firstname = req.user.firstname;
             v.userid = req.user.userid;
             v.react=req.body.react
        if (index_1 == -1) {
          
          data.post[index].comment[index].react.push(v)
         } else {
                   data.post[index].comment[index_].react[index_1]=v
          
                }
           }
           else {
            
            let v = {}
            v.profileimage = req.user.profileimage;
            v.lastname = req.user.lastname;
            v.firstname = req.user.firstname;
            v.userid = req.user.userid;
             v.react = req.body.react
             if (!data.post[index].react) {
               data.post[index].react=[]
           
             }
            let index_1 =  data.post[index].react.findIndex(e => e.userid == req.user.userid)
        if (index_1 == -1) {
          
          data.post[index].react.push(v)
         } else {
                   data.post[index].react[index_1]=v
          
                }
             
             
          
        }
       
               
          
           
            
            account.findOneAndUpdate({userid:req.query.id},{post:data.post},(e)=>{
                   if (e) {
                       res.json({success:false})
                       return
                   }
                   res.json({success:true})
               })
        }

    })

  console.log(req.body)
  console.log(req.query)
 
});


router.get("/user/post", (req, res) => {
  account.findOne({ userid: req.query.userid }, (e, data) => {
    if (!data || e) {
      res.json({ success: false })
      return
    }
    
    let post = data.post.find(e => e.postid == req.query.postid)
    if (!post) {
      res.json({ success: false })
      return
    }

    let obj = returnobj(data);
    // console.log(req.obj)
    delete obj.password;
    delete obj.authid;
    delete obj.email;
    
    
    obj.post = [post]
    res.json({...obj})

    let v={}
  })
  
});

router.post("/post/edit", (req, res) => {
  console.log(req.query,req.body)
  let index = req.user.post.findIndex(e=>e.postid==req.query.postid)
  if (index == -1) {
    console.log(index,"Ddd")
    res.json({success:false})
 
    return
  }
  req.user.post[index].post=req.body.post
  account.findOneAndUpdate({ userid: req.user.userid }, { post: req.user.post }, (e) => {
    if (e) {
      console.log(e,"ee")
      res.json({ success: false })
      return
      
    }
    res.json({ success: true })
  })
});

router.post("/post/delete", (req, res) => {
  let index = req.user.post.find(e=>e.postid==req.body.postid)
  if (index == -1) {
    res.json({success:false})
    
    return
  }
  req.user.post.splice(index,1)
  account.findOneAndUpdate({ userid: req.user.userid }, { post: req.user.post }, (e) => {
    if (e) {
      res.json({ success: false })
      return
      
    }
    res.json({ success: true })
  })
});
router.get("/comment/get", (req, res) => {
  console.log(req.query)
 
  account.findOne({ userid: req.query.id }, (e, data) => {
    console.log(data,"data")
    if (e || !data) {
      res.json({success:false})
      return
    }
    
    let post = data.post.find(e=>e.postid==req.query.postid)
    console.log(post,"post")
    if (!post) {
      res.json({success:false})
      return
    }
    
    let comment =  post.comment.find(e=>e.commentid==req.query.commentid)
    console.log(comment,"comment")
    if (!comment) {
    res.json({success:false})
    return
    }
    
    res.json({ comment })

})


});
router.post("/comment/delete", (req, res) => {
  console.log(req.query)
 
  account.findOne({ userid: req.query.id }, (e, data) => {
    console.log(data,"data")
    if (e || !data) {
      res.json({success:false})
      return
    }
    
    let postindex = data.post.findIndex(e=>e.postid==req.query.postid)
   
    if (postindex == -1) {
      res.json({success:false})
      return
    }
    
    let index1 = data.post[postindex].comment.findIndex(e=>e.commentid==req.query.commentid)
    if (req.query.replyid) {
      
      let index2 = data.post[postindex].comment[index1].reply.findIndex(e => e.commentuserid == req.query.replyid)
      console.log(req.query.reply,index2,"babe")
      data.post[postindex].comment[index1].reply.splice(index2, 1);
      
    } else {
      console.log("babylon")
    data.post[postindex].comment.splice(index1, 1);
      
    }
     account.findOneAndUpdate(
       { userid: req.query.id },
       { post: data.post },
       (e) => {
         if (e) {
           res.json({ success: false });
           return;
         }
         res.json({ success: true });
       }
     );

})


});
router.post("/comment/edit", (req, res) => {
  console.log(req.query)
 
  account.findOne({ userid: req.query.userid }, (e, data) => {
    console.log(data,"data")
    if (e || !data) {
      res.json({success:false})
      return
    }
    
    let postindex = data.post.findIndex(e=>e.postid==req.query.postid)
    // console.log(post,"post")
    if (postindex== -1) {
      res.json({success:false})
      return
    }
    console.log("kwkwkwkst")
    
    let index1 =  data.post[postindex].comment.findIndex(e=>e.commentid==req.query.commentid)
    if (req.query.replyid) {
      
      let index2 = data.post[postindex].comment[index1].reply.findIndex(e => e.commentuserid == req.query.replyid)
     data.post[postindex].comment[index1].reply[index2].write =
       req.body.write || req.body.comment;
     data.post[postindex].comment[index1].reply[index2].reply.write=req.body.write || req.body.comment
    } else {
      data.post[postindex].comment[index1].write =
        req.body.write || req.body.comment;
      
    }
    console.log(req.query,req.body)
     account.findOneAndUpdate(
       { userid: req.query.userid },
       { post: data.post },
       (e) => {
         if (e) {
           res.json({ success: false });
           return;
         }
         res.json({ success: true });
       }
     );

})


});

router.post(
  "/poststory",
  upload2.fields([{ name: "img", maxCount: 20 }]),
  (req, res) => {
    console.log(req.files, "djjjjjjjjjjjjjjjjjjjjjj",);
    let story = []
    for (val in req.body) {
      console.log(JSON.parse(req.body[val]))
      story.push(
        {img:req.files.img.find(e=>e.originalname==val),data:JSON.parse(req.body[val])}
      )
    }


    if (req.user.story) {
     req.user.story.push(...story)
    } else {
      req.user.story=[]
      req.user.story.push(...story)
      
   }

      account.findOneAndUpdate(
        { userid: req.user.userid },
        { story: req.user.story },
        (e) => {
          if (e) {
            res.json({ success: false });
            return;
          }
          res.json({ success: true });
        }
      );
    
  }
);


router.get("/friendssugandreq", (req, res) => {
  account.find(
    // { mainlocation: { $elemMatch: { info: { $elemMatch: { countryName: "Nigeria" } }} } },
    { "mainlocation.info.countryName":"Nigeria"},
    (e, data) => {
      if (data) {
        data.forEach((e,index )=> {
          delete data[index].password
          delete data[index].authid;
        })
        res.json({friendsug:data});
      }
    }
  );
});



module.exports=router