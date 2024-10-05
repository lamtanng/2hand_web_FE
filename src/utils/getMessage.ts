const SUCCESSFULLY = 'successfully';
export const getRequiredMsg = (name: string) => `${name} is required`;
export const getCreateSuccessMsg = (name: string) => `${name} created ${SUCCESSFULLY}`;
export const getUpdateSuccessMsg = (name: string) => `${name} updated ${SUCCESSFULLY}`;
export const getRemovedSuccessMsg = (name: string) => `${name} removed ${SUCCESSFULLY}`;
export const getMinImportMsg = (amount: number) => `Please import at least ${amount} item`;
export const getMaxImportMsg = (amount: number) => `Please import at most ${amount} item`;
