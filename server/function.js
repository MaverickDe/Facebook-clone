
const crypto = require("crypto");
function authenticate(db,obj) {
    return new Promise((res, rej) => {
        db.find(obj,(e,data)=>{
            if (!data || e) {
                rej(false)
                return
                
            }

            res(data)

        })
        
        
    })
}


let cryp = async () => {
    return new Promise((res,rej) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
             res(Math.random().toString())
            }
           
            res(buf.toString("hex"));
          });
        
    })
}


function returnobj(obj) {
  if (obj.schema) {
    let _obj = {};

    for (value of Object.keys(obj.schema.obj)) {
      if (obj[value]) {
        _obj[value] = obj[value];
      }
    }

    return _obj;
  } else {
    return obj;
  }
}

module.exports = { authenticate, cryp ,returnobj};