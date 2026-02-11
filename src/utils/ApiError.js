class ApiError extends Error{
    constructor(
        statusCode , 
        message ="Something went wrong" , 
        error=[] , 
        stack =""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null 
        this.message = message
        this.success = false
        this.errors = errors


        // if you can not understand stack part then ignore it without these also the code will run
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}