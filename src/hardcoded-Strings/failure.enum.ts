export enum EnumFailure{
    InvalidPassword = 'Please enter your correct password',
    BadRequest = 'Something went wrong, Please try again later',
    UserNotFound = 'Please enter your correct username',
    statusFailed = 'failed',
    apiFailed = 'error'
}

export enum EnumFailureLoginApi{
    InvalidPassword = 'Please enter your correct password',
    BadRequest = 'Something went wrong, Please try again later',
    UserNotFound = 'Please enter your correct username',
    statusFailed = 'failed'
}

export enum EnumFailureRegisterationApi{
    enterUserName = 'Please enter username',
    title = 'Error',
    apiFailed = 'Something went wrong, Please try again later',
    alreadyExist = 'user already exist',
    validationError = 'All fields are mandatory'
}