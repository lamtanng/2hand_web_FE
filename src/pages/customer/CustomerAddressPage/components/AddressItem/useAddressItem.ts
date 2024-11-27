import { userAPIs } from '../../../../../apis/user.api';
import { AddressProps } from '../../../../../types/address.type';
import { AddressRequestProps, DeleteAddressRequest } from '../../../../../types/http/address.type';
import { UserProps } from '../../../../../types/user.type';
import { displaySuccess } from '../../../../../utils/displayToast';
import eventEmitter from '../../../../../utils/eventEmitter';
import { handleError } from '../../../../../utils/handleError';

const useAddressItem = (address: AddressProps, profile: UserProps | undefined) => {
  const handleDeleteAddress = async () => {
    try {
      const data: DeleteAddressRequest = {
        _id: profile?._id,
        addressID: address._id,
      };
      await userAPIs.deleteAddress(data);
      eventEmitter.emit('deleteAddress');
      displaySuccess('Deleted address successfully.');
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const handleSetDefault = async () => {
    try {
      const data: AddressRequestProps = {
        _id: profile?._id,
        address: {
          ...address,
          isDefault: true,
        },
      };
      await userAPIs.updateAddress(data);
      eventEmitter.emit('updateAddress');
      displaySuccess('Updated address successfully.');
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return { handleDeleteAddress, handleSetDefault };
};

export default useAddressItem;
