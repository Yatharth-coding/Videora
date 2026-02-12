import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String ,// cloudinary
        required:true
    },
    coverImage:{
        type:String ,// cloudinary
    },
    watchHistory:[
        {
            types: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true , "Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save", function(password){  // here we can not use the arrow function as we can not pass the refernce in it or we can say we can not use this keyword in it
    
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password , 10)
    next();
}) 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.method.genarteAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.method.refreshToken = function(){
    jwt.sign(
        {
        _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.module("User" , userSchema)