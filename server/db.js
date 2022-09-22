// const { builtinModules } = require("module");
// const { boolean } = require("webidl-conversions");

try {
  let mongoose = require("mongoose");
  
  const messageconnection = `mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/accountyema?retryWrites=true&w=majority`;
  
  const msgconnect = mongoose.createConnection(messageconnection, {
    useNewUrlParser: true,
  });

  

  
    



  let account = msgconnect.model(
    "account",
    new mongoose.Schema({
      email: {
        type: String,
      },
      story: {
        type: Array,
      },
      password: {
        type: String,
      },
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      dob: {
        type: String,
      },
      gender: {
        type: String,
      },
      mainlocation: {
        type: Object,
    },
    temporallocation: {
            type: Object,
          
      },
    userlocation: {
            type: String,
          
      },
      message: {
        type: Array,
        },
        authid: {
          type:String
      },
        userid: {
          type:String
      },
      post: {
        type: Array,
      },
    })
  );
  

  module.exports.account = account;
} catch {
  (e) => {
    console.log(e);
  };
}
// 