// // const { builtinModules } = require("module");
// // const { boolean } = require("webidl-conversions");

// try {
//   let mongoose = require("mongoose");

//   const messageconnection = `mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/accountyemastory_post?retryWrites=true&w=majority`;

//   const msgconnect = mongoose.createConnection(messageconnection, {
//     useNewUrlParser: true,
//   });

//   let post = msgconnect.model(
//     "post",
//     new mongoose.Schema({
     
    
//         userid: {
//         type:String
//     },
    
//       post: {
//         type: Array,
//       },
//     })
   
//   );
//   let story = msgconnect.model(
//     "story",
//     new mongoose.Schema({
     
    
    
    
//       Userid: {
//         type: Array,
//       },
    
//       post: {
//         type: Array,
//       },
//     })
   
//   );

//   module.exports.post = post;
//   module.exports.story = story;
// } catch {
//   (e) => {
//     console.log(e);
//   };
// }
// //
