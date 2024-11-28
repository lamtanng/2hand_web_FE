export interface PhoneOTPRequest {
    phoneNumber: string;
}

export interface PhoneVerifyRequest {
    _id: string | undefined,
    phoneNumber: string | undefined,
    otp: string | undefined
}