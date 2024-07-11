import JWT from 'jsonwebtoken'
import userModel from '../modals/userModel.js';

//Protected Routes token base

export const requireSignIn = async (req,res,next)=>{
    const JWT_SECRET = "HGRHYGFKGFIYIVIYFIHJK";
    try{
        const decode = JWT.verify(req.headers.authorization, JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
    }
    
}

//admin access
export const isAdmin = async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access'
            });
        }
        else
        {
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            message:'Error in middleware',
        })
    }
}