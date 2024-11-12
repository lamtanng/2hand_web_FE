import { userAPIs } from '../../../../../../apis/user.api';
import { AddressProps } from '../../../../../../types/address.type';
import { UserProps } from '../../../../../../types/user.type';
import { displaySuccess } from '../../../../../../utils/displayToast';
import eventEmitter from '../../../../../../utils/eventEmitter';
import { handleError } from '../../../../../../utils/handleError';

const useAddressItem = (address: AddressProps, profile: UserProps | undefined) => {
  const handleDeleteAddress = async () => {
    try {
      const data = {
        _id: profile?._id,
        addressID: address._id,
      }
      await userAPIs.deleteAddress(data);
      eventEmitter.emit('deleteAddress');
      displaySuccess('Deleted address successfully.');
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  return { handleDeleteAddress };
};

export default useAddressItem;
