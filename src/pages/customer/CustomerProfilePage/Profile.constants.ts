import * as yup from 'yup';

export interface ProfileProps{
    firstName?: string;
    lastName?: string;
}

export const profileSchema: yup.ObjectSchema<ProfileProps> = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
});
