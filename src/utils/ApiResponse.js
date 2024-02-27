class ApiResponse{
    constructor(statusCode,value={},success){
        this.statusCode = statusCode;
        this.data = value;
        this.success = success;

    }
}

export { ApiResponse}