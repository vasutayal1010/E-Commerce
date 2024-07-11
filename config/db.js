import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect();
        console.log(`Connected to Mongodb ${conn.connection.host}`.bgMagenta.white);
    }
    catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;