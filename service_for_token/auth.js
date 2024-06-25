                                //🛑STATEFULL🛑-----USE IN BANKS


// service--- cabin of parker
//  --auth--- parker-----------> /* parker has registor(sessionToUserMap---🛑STATE🛑)---[ in which he get "userdetail" and map it with "id"]----[ give "id" to the user so when he came,he get his "userdetail" only on "id" mapped ]   */
//                                                                                                                                           ^
//                                                                                                                                           ^-------this "id" is put in "cookies"----[when to need the "id" took from here]                       
// const sessionidToUserMap = new Map();  // registor

//     function SetUser(id,user)               
//     {
//        sessionidToUserMap.set(id,user);                 // [ in which he get "userdetail" and map it with "id"]
//     }
    
//     function GetUser(id)
//     {
//         return sessionidToUserMap.get(id);             // [ give "id" to the user so when he came,he get his "userdetail" only on "id" mapped ]
//     }

// module.exports={
//     SetUser,
//     GetUser
// }

                              // DRAWBACK OF STATEFULL -----> 1. "loss of state" leads to "loss of data"
                               //                             2. "state" use memory of server also
                               
                               
                                //🛑STATELESS🛑---USE IN WEBSITES

const jwt = require("jsonwebtoken");
const secret_key = "Tarun$123#";
   
   function SetUser(LogInUser)              //creation of token---called "sign of token"
   {  const LogInUser_detail = {                 //                  includes:- 1. LogInUser_details (person whose vehicle)
         _id:    LogInUser._id,                   //                                    +
         email: LogInUser.email,                  //                             2. secret_key ()
         role: LogInUser.role
        }  
                                      
      return jwt.sign(LogInUser_detail,secret_key)   
   } 
   
   
   function GetUser(token)
   {
      if(!token){return null}

      try{
          return jwt.verify(token,secret_key)   //verification of token---called "verify of token"
                                                //                  includes:- 1. token (which to verify)
                                                //                                    +
                                                //                             2. secret_key ()
      } catch (error) {
         return null;
      }
   }


module.exports={
    SetUser,
    GetUser
}