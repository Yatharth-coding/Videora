const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
    return Promise.resolve(requestHandler(req,res,next)).
    catch((err)=>next(err))
    }
}

export {asyncHandler}

// if i want to go by try and catch block
/*

const asyncHandler = (fn) => async (req,res,next) => {
    try{
        await fn(req,res,next);
    }
    catch(error){
        res.status(error.code || 500).json({
            success:false,
            message : err.message
        })
    }
}

*/
