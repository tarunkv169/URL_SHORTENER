// service--- cabin of parker
//  --auth--- parker-----------> /* parker has registor(sessionToUserMap)---[ in which he get "userdetail" and map it with "id"]----[ give "id" to the user so when he came,he get his "userdetail" only on "id" mapped ]   */
//                                                                                                                                           ^
//                                                                                                                                           ^-------this "id" is put in "cookies"----[when to need the "id" took from here]                       
const sessionidToUserMap = new Map();  // registor

    function SetUser(id,user)               
    {
       sessionidToUserMap.set(id,user);                 // [ in which he get "userdetail" and map it with "id"]
    }
    
    function GetUser(id)
    {
        return sessionidToUserMap.get(id);             // [ give "id" to the user so when he came,he get his "userdetail" only on "id" mapped ]
    }

module.exports={
    SetUser,
    GetUser
}

