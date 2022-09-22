
import {hostname } from "./index"

let location = new Promise((resolve, reject) => {
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      reject("no location");
    }
  }

  function showPosition(position) {
    resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
});



async function  positionname (lat, lon) {
return new Promise( async (res,rej) =>{
        let b = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            {}
        );

    if (b) {
          
        b.json().then(e => {
           res(e)

        
        })
    } else {
        rej("not found")
      }

        
    }
    )
}



let fetchpost_ = (url,body) => {
  return new Promise(async (res, rej) => {
    let dep = await fetch(url, {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(body),
      credentials: "include",
    });
    dep
      .json()
      .then((e) => {
        res(e);
      })
      .catch((e) => {
        rej(e);
      });
  });
};
let fetchget_ = (url) => {
  return new Promise(async (res, rej) => {
    let dep = await fetch(url, {
      mode: "cors",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

   
      credentials: "include",
    });
    dep
      .json()
      .then((e) => {
        res(e);
      })
      .catch((e) => {
        rej(e);
      });
  });
};
let fetchgetfiles_ = (url) => {
  return new Promise(async (res, rej) => {
    let dep = await fetch(url, {
      mode: "cors",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

   
      credentials: "include",
    });
    dep.blob()
      .then((e) => {
        console.log(e,"file")
        res(e);
      })
      .catch((e) => {
        rej(e);
      });
  });
};
let postmultiplepart = (url,data) => {
  return new Promise(async (res, rej) => {
   
     let oData = new FormData();

     data.forEach((e) => {
       oData.append(`img`, e.file,e.id.toString());
       console.log(e)
          oData.append(e.id.toString(), JSON.stringify(e.state));
     });

    // if (post != "") {
       
    //  }

     const oReq = new XMLHttpRequest();
     oReq.open("POST", url, true);
     oReq.withCredentials = true;
     oReq.onload = function (oEvent) {
       if (oReq.status === 200) {
         console.log("uploaded");
         console.log(JSON.parse(oReq.response));
         res(JSON.parse(oReq.response));
        //  navigate("/auth/dashboard");
       } else {
rej(false);
       }
     };

     oReq.send(oData);
      
  });
};

let fetchimg_ = (body) => {
  return new Promise(async (res, rej) => {
    let dep = await fetch(`${hostname}/auth/profile/img`, {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(body),
      credentials: "include",
    });
    dep
      .json()
      .then((e) => {
        res(e);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

export {
  location,
  positionname,
  fetchimg_,
  fetchpost_,
  fetchget_,
  postmultiplepart,
  fetchgetfiles_,
};