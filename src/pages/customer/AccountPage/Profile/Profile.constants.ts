import * as yup from 'yup';

export interface ProfileProps{
    firstName?: string;
    lastName?: string;
    email?:string;
    phoneNumber?: string;
}

export const profileSchema: yup.ObjectSchema<ProfileProps> = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup.string().length(10).required(),
});
