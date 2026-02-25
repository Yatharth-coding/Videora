import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

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

    const avatarFilePath = req.files?.avatar[0]?.path ;
    const coverImagePath = req.files?.coverImage[0]?.path ;

    if(!avatarFilePath){
        throw new ApiError(400 , "Avatar image recquired")
    }

    const avatar = await uploadOnCloudinary(avatarFilePath) ; 
    const coverImage = await uploadOnCloudinary(coverImagePath);

    if(!avatar){
        throw new ApiError(500 , "Due to server error avatar file lost please upload again");
    }

    const user = await User.create({
        fullname , 
        username : username.toLowerCase() ,
        email ,
        avatar : avatar.url ,
        coverImage : coverImage.url ,
        password ,

    })

    const createdUser = await User.findById(user._id)

    if(!createdUser){
        throw new ApiError(500 , "Data not inserted in database please try again")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered Successfully in database")
    )


})

export {registerUser}
