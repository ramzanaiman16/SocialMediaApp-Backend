import mongoose from "mongoose";


export const dbConnection =async ()=>{

    try {
        let conn = await mongoose.connect(process.env.mongoose_url)
        console.log(`Database are connected`)
    } catch (error) {
        console.log(`Error in Database`)
        
    }
}

