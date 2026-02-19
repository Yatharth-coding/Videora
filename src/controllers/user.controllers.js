import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"

const registerUser = await asyncHandler(async (req,res)=>{
    // get the user details from the user
    // check for validation - non empty
    // check if the user already exist -> no duplication in username and email
    // check for images , specially for avatar
    // create user object - create entry in db
    // remove password and refreshToken field from the response
    // check for user creation
    // return res

    const { fullname , email , username , password } = req.body
    console.log("email :" , email);

    // if(fullname === ""){
    //     throw new ApiError(400 , "fullname is recquired");
    // }
    // we can go by this method by this will be very wrong if try to compare individual field it is not a bad method but for short we'll going to use second method

    if(
        [fullname , email , password , username].some((field)=>
        field?.trim() === "")
    ){
            throw new ApiError(400 , "All fields are required")
    }

    const existedUser = User.findOne({
        $or : [{username} ,{email}]
    })

    if(existedUser){
        throw new ApiError(409 , "User with email or username already existed");
    }


})

export {registerUser}
