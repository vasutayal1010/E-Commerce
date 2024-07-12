import mongoose from "mongoose";


const connectDB = async () =>{
    const URL = "mongodb+srv://vasutayal1010:Vasu123456@e-commerce.cbe1gls.mongodb.net/"
    try{
        const conn = await mongoose.connect(URL);
        console.log(`Connected to Mongodb ${conn.connection.host}`.bgMagenta.white);
    }
    catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;