export const showAvatar = (messages, user)=>{
    return messages.map((msg, index) => {
    const previousMsg = messages[index-1]
    const nextMsg = messages[index + 1]
    if(msg.sender._id === user._id){
     return false
    }
    //if the current message has a next message
    if(nextMsg && !(index>messages.length -1)){
      //
      

      if(previousMsg){
          //is not same sender
        if(msg.sender._id !== previousMsg.sender._id && (msg.sender._id === nextMsg.sender._id) ){
          return false
        }
        //is new sender 
        else if(((msg.sender._id === previousMsg.sender._id) || (msg.sender._id !== previousMsg.sender._id) ) && (msg.sender._id !== nextMsg.sender._id )){
          return true
        }
        
        else {
          return false
        }
      }
      
      else {
        if(msg.sender._id === nextMsg.sender._id){
          return false
        }
        else {
          return true
        }
      }
      
      
    }
    
    else {
      if(!nextMsg && ((previousMsg.sender._id !== user._id) && (msg.sender._id === previousMsg.sender._id))){
        return true;
      }
      if(!nextMsg && ((previousMsg.sender._id === user._id) && (msg.sender._id !== previousMsg.sender._id))){
        return true;
      }

      return false
    }
  });
}