import mongoose from "mongoose";

let isConnected=false; //track the connection

export const connectToDB= async ()=> {
    mongoose.set('strictQuery', true);

    if (isConnected){
        console.log("MongoDB is connected")
        return
    }

    try {
        mongoose.connect(process.env.MONOGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB is connected!!");
        
    }
    catch(err){
        console.log(err);
    }
}

