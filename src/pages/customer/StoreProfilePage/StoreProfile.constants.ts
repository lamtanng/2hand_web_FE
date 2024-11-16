import * as yup from 'yup';

export interface StoreProfileProps{
    storeName?: string;
    detailAddress?: string
}

export const storeProfileSchema: yup.ObjectSchema<StoreProfileProps> = yup.object({
    storeName: yup.string(),
    detailAddress: yup.string()
});
