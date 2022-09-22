#!/usr/bin/env node


let arg =process.argv.slice(3)
let command_ = process.argv[2]



let commands={
    "--help": [
        {
            "genid":"genrate randomid",
            "options": {
                "-type": "specifies the type of id",
                "-lim":"specifies the length of the id"
                
            },
            "-type": {
                "n":"generate an id with only numbers",
                "a":"generate an id with only alphabet",
                "an":"generate an id with only numbers and alphabet",

            }

            
        }
        
    ],
    "-genid":[],
}
let _ = {
  "genid": {
    "options": {
          "-type": [
               "n",
                "a",
                "an"
          
          ],
      "-lim": 100
    },
    // functions
  },
};
    
function resolvecommand() {
    
    if (command_ == "genid") {
      let c = arg.reduce((total, acc, index) => {

        if (
          acc.split("")[0] == "-" &&
          Object.keys(_["genid"]["options"]).includes(acc)
        ) {
          total[acc] = arg[index + 1];
        }
        return total;
      }, {});
    
    
    
        let bbb = genid(c);
        console.log(bbb)
    
        
        return
    }
    if (command_ == "--help") {
        
      console.log(commands["--help"])
       
        return
    }
}
//  node server3.js genid -lim 100 -type -n
//  ./server3.js genid -lim 100 -type n
//  gencryp genid -lim 100 -type
let a = ["a", "b", "c", "d", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "t", "u", "v", "w", "x", "Y", "Z"]
let A = a.join("").toUpperCase().split("")
let n =[1,2,3,4,5,6,7,8,9,0]


let shuffle = (a) => {
    
// 
        let v = []
        let b =[...a]
     a.forEach((e,index)=>{

     
         let index2 = Math.floor(Math.random() * a.length)
       
         let ar1 =b[index]
         let ar2 =b[index2]

         b[index] = ar2
         b[index2] = ar1
          
        
     })
        
       
        return(b)

}

let returnarr = (a, lim) => {

    if (lim > a.length) {
        let num = Math.floor(lim / a.length);
        let arr = [...a]
        for (i = 0; i < num; i++){
            arr.push(...a)

        }
      
        return arr.slice(0,lim)
        
        
    }
    
    return a
    
}

function genid(options_) {
    console.log(options_)
    
    let options = {
        _lim : +options_["-lim"]&&!isNaN(+options_["-lim"])&&+options_["-lim"]  || 100,
        _type :options_["-type"]&& Object.values(_["genid"]["options"]["-type"]).includes(options_["-type"])&& options_["-type"] || "an"
        
    }
    console.log(
      options,"bol",
      Object.values(_["genid"]["options"]["-type"]).includes(options_["-type"])
    );

    if (options._type=="n") {
        
        
        
        
        
        
        let arr = returnarr([...n], options._lim)
       
        
        let id = shuffle(arr)
        
        return id.slice(0, options._lim).join("");
    }
    if (options._type=="a") {
        
        let arr = returnarr([...a, ...A], options._lim)
      
        
        let id = shuffle(arr)
        
        return id.slice(0, options._lim).join("");
    }
    if (options._type == "an") {
      let arr = returnarr([...a, ...n, ...A], options._lim);
    

      let id = shuffle(arr);

      return id.slice(0, options._lim).join("");
    }
    

    
    
    
}


resolvecommand()

// // let inputcommand = v[0]
// let vv = v.slice(0,1).reduce((total, acc) => {

    
//     return total
// },[])

