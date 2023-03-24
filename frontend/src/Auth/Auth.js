// it is checking for token
export const isLoggedIn = () =>{
    let token  = localStorage.getItem("token");
    console.log(token);
     if(token!== null) return true;
     else return false;  
  }