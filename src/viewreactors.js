import React, { useState, useEffect } from "react";

import { hostname } from "./index";
let Viewreactors = (prop) => {
  
 
  console.log((prop))

  
  return (
   
    <div
      style={{ display: "flex" ,flexWrap:"wrap",width:"100%",minHeight:"100px"}}
    >
      {prop.react.map((e) => {
          return <ul >
         <li style={{display:"flex"}}>
              <p style={{ marginRight: "5px" }}>{`${e.firstname} ${e.lastname}`}</p><p>{` ${e.react}`}</p>
              </li>
        
              </ul>
      })}
    </div>
 
  );
};


export default Viewreactors;
