import * as yup from 'yup';

export interface ProfileProps{
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
}

export const profileSchema: yup.ObjectSchema<ProfileProps> = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    phoneNumber: yup.string().length(10),
    dateOfBirth: yup.date(),
});
