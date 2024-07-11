import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../modals/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body

        if(!name){
            return res.send({message: 'Name is Required'})
        }
        if (!email) {
          return res.send({ message: "Email is Required" });
        }
        if (!password) {
          return res.send({ message: "Password is Required" });
        }
        if (!phone) {
          return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
          return res.send({ message: "Address is Required" });
        }
        if (!answer) {
          return res.send({ message: "Answer is Required" });
        }

        //exixting user
        const exisitingUser = await userModel.findOne({email});

        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered please Login',
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer,}).save();

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        })
    }
};

//POST LOGIN
export const loginController = async (req,res)=>{
  try{
    const {email,password} = req.body
    //Validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:'Invalid email or password',
      })
    }

    //Check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:'Email is not registered'
      })
    }

    const match = await comparePassword(password,user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message:'Inavlid Password'
      })
    }

    //Token
    const JWT_SECRET = "HGRHYGFKGFIYIVIYFIHJK";
    const token = await JWT.sign({_id:user._id}, JWT_SECRET, {expiresIn:'7d'});
    res.status(200).send({
      success:true,
      message:'Login Successfully',
      user:{
        name:user.name,
        email:user.email,
        phonr:user.phone,
        address:user.address,
      },
      token,
    })


  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in login',
      error,
    })
  }
}

export const forgotPasswordController =  async(req,res)=>{
  try{
    const [email,answer,newPassword] = req.body
    if(!email){
      res.status(400).send({message:'Email is required'})
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" })
    }

    //Check
    const user = await userModel.findOne({email,answer})
    //validation
    if(!user){
      return res.status(404).send({
        success:false,
        message:'Wrong email or password'
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password: hashed});
    res.status(200).send({
      success:true,
      message: "Password Reset Successfully"
      
    });

  }catch(error){
    console.log(error)
    res.send(500).send({
      success:false,
      message: 'Someting went wrong',
      error
    })
  }
}

//test controller
export const testController = (req,res)=>{
  try{
    res.send("Protected Route");
  }catch(error){
    console.log(error);
    res.send({error});
  }
}