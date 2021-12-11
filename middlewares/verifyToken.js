const jwt = require("jsonwebtoken");
const models = require("../libs/sequelize");

async function verifyToken(req,res,next){
    const token = req.headers["token"];
    if(token){
      
        jwt.verify(token,"secret",(error,decoded)=>{
            console.log(`this is decoded ${decoded}`);
            if(error){
                res.status(403).json({
                    mensaje: "error en verificacion",
                    error: error,
                })
            }
            else{
               if(req.sesion){
                req.decoded = decoded;
               }
                
                next();
            }
        });
       
        
    }else{
        res.status(403).json({
            erorr: "no hay token"
        });
    }

}
module.exports = verifyToken;