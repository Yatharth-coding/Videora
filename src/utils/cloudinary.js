import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (localPath) =>{
    try{
        if(!localPath) {
            console.log("file is not been loaded in cloudinary")
            return null
        };

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localPath , {
            resource_type : "auto"
        })

        // file has been uploaded succesfully
        console.log("file has been uploaded on cloudinary" , response.url);
        return response ; 
    }
    catch(error){
        await fs.unlinkSync(localPath) // remove the locally saved temporary file as the upload operation got failed
        return null ;

    }
}


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export {uploadOnCloudinary}