const jwt = require("jsonwebtoken");


const Authenticate = (req, res, next)=>{
    const token = req.headers?.authorization?.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token, "shhh");
        if(decoded){
            
            const userID = decoded.userId;
            req.body.userId = userID;    
            next();
        }else{
            res.send("please login")
        }

    }else{
        res.send("please login");
    }
}


module.exports = {Authenticate};