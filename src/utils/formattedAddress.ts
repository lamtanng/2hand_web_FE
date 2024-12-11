import { AddressProps } from "../types/address.type";

export const formattedAddress = (address: AddressProps | undefined) => {
    if(address) {
        return `${address?.address}, ${address?.ward?.WardName}, ${address?.district?.DistrictName}, ${address?.province?.ProvinceName}`
    }
    return 'No address to display.'
}