class ApiError extends Error {
    constructor(statusCode, message="something wrong",error=[],statck=""){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.statck = statck
        this.success=false
        if(statck) {
            this.statck = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}